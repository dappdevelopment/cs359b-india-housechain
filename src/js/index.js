import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../css/index.css';
import Login from './login.js';
import House from './house.js'


class Home extends React.Component {
  constructor (props) {
    super (props);

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
          <img id="loader" src="https://loading.io/spinners/pacman/lg.eat-bean-pie-loading-gif.gif"></img>

        </header>
        <br />
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
    )
  }
}


const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/house" component={House} />
    </div>
  </Router>
);


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

