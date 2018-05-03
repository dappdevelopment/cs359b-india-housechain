// const path = require('path')
// module.exports = {
//    entry: path.join(__dirname, 'src/js', 'index.js'), // Our frontend will be inside the src folder
//    output: {
//       path: path.join(__dirname, 'src'),
//       filename: 'build.js' // The final file will be created in dist/build.js
//    },
//    module: {
//       rules: [{
//          test: /\.css$/, // To load the css in react
//          use: ['style-loader', 'css-loader'],
//          include: /src/
//       }, {
//          test: /\.jsx?$/, // To load the js and jsx files
//          loader: 'babel-loader',
//          exclude: /node_modules/,
//          query: {
//             presets: ['es2015', 'react', 'stage-2']
//          }
//       }, {
//          test: /\.json$/, // To load the json files
//          loader: 'json-loader'
//       }]
//    }
// }
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/js/react.js",

    output: {
        filename: "build.js",
        path: __dirname + "/src",
    },

    resolve: {
        extensions: ['.js', '.tsx']
    },

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
               beautify: true
             }
           },
           sourceMap: true,

         })
      ]
   }
};