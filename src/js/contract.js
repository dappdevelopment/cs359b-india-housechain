// THE COMMENTED OUT SECTION IS FOR VERSION USING WEB3 AND METAMASK

// import { createContract, getAccount } from '../utils/web3';

// class HouseChainContract {
//   constructor(contract) {
//     this.contract = contract;
//   }

//   addAddress = async (account, addr, name, email, phone) => {
//     return this.contract.methods.add_address(name, addr, email, phone).send({from: account});
//   }

//   verifyAddress = async (addr) => {
//     return this.contract.methods.verify_address(addr).call();
//   }
// }


// export default async function createHouseChainContract() {
//   const contract = await createContract(houseChainMetadata);
//   return new HouseChainContract(contract);
// }

import { web3 } from '../utils/uportSetup'
const houseChainMetadata = require('../HouseChain.json');

class HouseChainContract {
  constructor(contract) {
    this.contract = contract;
  }

  addAddress = (name, addr, email, phone, callback) => {
    return this.contract.add_address.sendTransaction(name, addr, email, phone, callback);
  }

  verifyAddress = (addr, callback) => {
    return this.contract.verify_address.call(addr, callback);
  }
}

function HouseChainContractSetup () {
  let houseChainABI = web3.eth.contract(houseChainMetadata.abi);
  // hardcoded to 5777 which is the network id of my local contract
  // change to 4 when it is on rinkeby
  let address = houseChainMetadata.networks[5777].address;
  // need a contract that was deployed in rinkeby
  let contract = houseChainABI.at('0x8fec59a9fe0c898435163763586aee0ee3900634');
  // let contract = houseChainABI.at(address);
  // return contract;
  return new HouseChainContract(contract);
}

const houseChainContract = HouseChainContractSetup()

export default houseChainContract
