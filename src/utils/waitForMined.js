import { web3 } from './uportSetup'

const pollingLoop = (txHash, response, pendingCB, successCB) => {
  setTimeout(function () {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
      if (response === null) {
        response = { blockNumber: null }
      } // Some nodes do not return pending tx
      waitForMined(txHash, response, pendingCB, successCB)
    })
  }, 1000) // check again in one sec.
}

function waitForMined (txHash, response, pendingCB, successCB) {
  if (response.blockNumber) {
    successCB()
  } else {
    pendingCB()
    pollingLoop(txHash, response, pendingCB, successCB)
  }
}

export default waitForMined