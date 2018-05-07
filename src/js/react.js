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
  
    this.querySecret = this.querySecret.bind (this);
    this.addAddress = this.addAddress.bind (this);
    this.verifyAddress = this.verifyAddress.bind (this);
    this.refreshBalance = this.refreshBalance.bind (this);
    this.setData = this.setData.bind (this);

    this.login = this.login.bind(this);
    this.house = this.house.bind(this);

    this.data = {};

    Promise.all([contractDataPromise, networkIdPromise, accountsPromise])
      .then(function initApp(results) {
        const contractData = results[0]
        const networkId = results[1]
        const userAccount = results[2][0]
        
        // this.contractData = results[0];
        // this.networkId = results[1];
        // this.accounts = results[2];
        // this.userAccount = accounts[0];
        console.log(networkId);
        // console.log(accounts);
        console.log(userAccount);
  
        // (todo) Make sure the contract is deployed on the network to which our provider is connected
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
    this.data = data;
  }


  refreshBalance() { // Returns web3's PromiEvent
    // Calling the contract (try with/without declaring view)
    console.log("The user account is "+this.data.userAccount)
    console.log(this.data.contract)
    this.data.contract.methods.balances(this.data.userAccount).call().then(function (balance) {
      $('#display').text(balance + " CDT");
      $("#loader").hide();
    });
  }



  querySecret () {
    // const { getSecret } = this.networkId;

    // getSecret ((err, secret) => {
    //   if (err) console.error ('An error occured::::', err);
    //   console.log ('This is our contract\'s secret::::', secret);
    // })
    console.log(this.networkId);
  }

  addAddress (addr) {
    console.log("Adding an address of "+addr+" for userAccount "+this.data.userAccount)
    this.data.contract.methods.add_address(addr, String(this.data.userAccount))
      .send({from: this.data.userAccount}).then(function (name) {
      console.log("Name is "+name);
    });

  }

  verifyAddress (addr) {
    console.log("Reading an address of "+addr+" for userAccount "+this.data.userAccount)
    this.data.contract.methods.verify_address(addr).call().then(function (owner_name) {
      console.log("Owner name is "+owner_name);
    });

  }

  login(e) {
    e.preventDefault();
    this.props.history.push('/about');
  }

  house(e) {
    e.preventDefault();
    this.props.history.push('/about');
  }

  render () {
    return (
      <div className='App'>
        <header className="App-header">
          <h1>CardinalToken Wallet</h1>
          <h2 id="display"></h2>
          <img id="loader" src="https://loading.io/spinners/pacman/lg.eat-bean-pie-loading-gif.gif"></img>
          <label for="address" class="col-lg-2 control-label">Send to address</label>
          <input id="address" type="text"></input>
          <label for="amount" class="col-lg-2 control-label">Amount</label>
          <input id="amount" type="text"></input>
          <button id="button">Give'em</button>
          <label for="mint-amount" class="col-lg-2 control-label">Mint Amount</label>
          <input id="mint-amount" type="text"></input>     
          <button id="mint-button">Mint</button>

          <label for="add-address" class="col-lg-2 control-label">Add Address</label>
          <input ref="enterAddressTextBox" type="text"></input>     
          <button onClick= { (e) => this.addAddress(this.refs.enterAddressTextBox.value) } >Add Address</button>

          <label for="verify-address" class="col-lg-2 control-label">Verify Address</label>
          <input ref="verifyAddressTextBox" type="text"></input>     
          <button onClick= { (e) => this.verifyAddress(this.refs.verifyAddressTextBox.value) } >Verify Address</button>

        </header>

        <br />
        <br />
        <button onClick={ this.querySecret }> Start Experiment on Smart Contract </button>
        <br />
        <br />


        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/house">House</Link>
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

