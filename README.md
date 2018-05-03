# CS359B Project India HouseChain

India HouseChain is a public registry for verifying home ownership in India. Currently, there is no de-facto, user-facing method of verifying home ownership in India; we hope to solve that by providing a decentralized web app by which users can verify who lives at certain addresses.

## Technologies used

* solidity
* react

## Installation intructions

### Development setup (one-time only)
If you have npm installed,


```
npm install --save-dev webpack
npm install --save-dev lite-server
npm install -D react react-dom react-redux redux react-router-dom uport-connect
npm install -D babel-core babel-loader babel-preset-react babel-preset-env css-loader style-loader json-loader web3
```

### Export migrations

```
truffle compile
truffle migrate
```

### Run locally
```
npm run wp
npm run start
```

