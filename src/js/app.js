import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'

class App extends React.Component {
  constructor (props) {
    super (props);

    console.log(this.props);

    if (typeof web3 == 'undefined') throw 'No web3 detected. Is Metamask/Mist being used?';
    web3 = new Web3(web3.currentProvider); // MetaMask injected Ethereum provider
    console.log("Using web3 version: " + Web3.version);


    const contractDataPromise = $.getJSON('HouseChain.json');
    const networkIdPromise = web3.eth.net.getId(); // resolves on the current network id
    const accountsPromise = web3.eth.getAccounts(); // resolves on an array of accounts
  
    this.refreshBalance = this.refreshBalance.bind (this);
    this.setData = this.setData.bind (this);

    this.state = {};

    Promise.all([contractDataPromise, networkIdPromise, accountsPromise])
      .then(function initApp(results) {
        const contractData = results[0]
        const networkId = results[1]
        const userAccount = results[2][0]

        
        if (!(networkId in contractData.networks)) {
          console.log(contractData.networks);
          throw new Error("Contract not found in selected Ethereum network on MetaMask.");
        }

        const contractAddress = contractData.networks[networkId].address;
        const contract = new web3.eth.Contract(contractData.abi, contractAddress);

        return {
          contractData: contractData,
          networkId: networkId, 
          userAccount: userAccount,
          contract: contract
        }
      })
      .then(this.setData)
      .then(this.refreshBalance)
      .catch(console.error);
  }

  setData(data) {
    this.props.actions.getUserAccount(data.userAccount);
    // this.props.actions.getContract(data.contract);
    this.state = data;
  }


  refreshBalance() { // Returns web3's PromiEvent
    // Calling the contract (try with/without declaring view)
    console.log("The user account is "+this.state.userAccount)
    console.log(this.state.contract)
    this.state.contract.methods.balanceOf(this.state.userAccount).call().then(function (balance) {
      $('#display').text(balance + " CDT");
      $("#loader").hide();
    });
  }


  render () {
    return (
      <div className='App'>
        <header className="App-header">
          <h1>Welcome to India HouseChain</h1>
          <h2 id="display"></h2>
        </header>
        <br />
        <button>
          <Link to={process.env.DAPP_URL + "/login"}>Login</Link>
        </button>
        <button>
          <Link to={process.env.DAPP_URL + "/house"}>Search</Link>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


