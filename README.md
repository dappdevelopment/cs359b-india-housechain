# CS359B Project India HouseChain

India HouseChain is a public registry for verifying home ownership in India. Currently, there is no de-facto, user-facing method of verifying home ownership in India; we hope to solve that by providing a decentralized web app by which users can verify who lives at certain addresses.

## Technologies used

* solidity
* react
* uport

## Installation intructions

### Development setup (one-time only)
If you have npm installed,


```
npm install --save-dev webpack
npm install --save-dev lite-server
npm install -D react react-dom react-redux redux react-router-dom uport-connect
npm install -D babel-core babel-loader babel-preset-react babel-preset-env css-loader style-loader json-loader web3
```

### uPort

We use uPort to register your own identity on Ethereum. You will need to download the uPort app from the app store.

### Export migrations

```
truffle compile
truffle migrate
```

### Run locally

We build our app using webpack to minimize all js files into one build.js file. We run locally using lite-server.

Note: Make sure to open ganache and log into Metamask prior to running the following commands.
```
npm run build
npm run server
```

