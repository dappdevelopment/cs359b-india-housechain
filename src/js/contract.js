export default () => {

  if (typeof web3 == 'undefined') throw 'No web3 detected. Is Metamask/Mist being used?';
  web3 = new Web3(web3.currentProvider); // MetaMask injected Ethereum provider
  console.log("Using web3 version: " + Web3.version);
  
  const contractDataPromise = $.getJSON('HouseChain.json');
  const networkIdPromise = web3.eth.net.getId(); // resolves on the current network id

  return Promise.all([contractDataPromise, networkIdPromise])
    .then(function initApp(results) {
      const contractData = results[0]
      const networkId = results[1]
      
      if (!(networkId in contractData.networks)) {
        console.log(contractData.networks);
        throw new Error("Contract not found in selected Ethereum network on MetaMask.");
      }

      const contractAddress = contractData.networks[networkId].address;
      const contract = new web3.eth.Contract(contractData.abi, contractAddress);

      return contract;
    })
}
