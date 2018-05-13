const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    "./src/js/index.js", 
    "./src/js/status.js",
    "./src/js/navbar.js",
  ],

  output: {
      filename: "build.js",
      path: __dirname + "/src",
  },

  resolve: {
      extensions: ['.js', '.tsx']
  },

  plugins: [
    new dotenv({
      path: './.env',
    })
  ],

  module: {
      rules: [{
         test: /\.css$/, // To load the css in react
         use: ['style-loader', 'css-loader'],
         include: /src/
      }, {
         test: /\.jsx?$/, // To load the js and jsx files
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
            presets: ['es2015', 'react', 'stage-2']
         }
      }]
  },

  optimization: {
      minimizer: [
         // we specify a custom UglifyJsPlugin here to get source maps in production
         new UglifyJsPlugin({
           cache: true,
           parallel: true,
           uglifyOptions: {
             compress: false,
             ecma: 6,
             mangle: false,
             output: {
               beautify: process.env.dev
             }
           },
           sourceMap: true,

         })
      ]
   }
};