import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from './actions.js'
import Contract from './contract.js'
import AutoComplete from './maps/autocomplete'

class House extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.addAddress = this.addAddress.bind(this);
    this.verifyAddress = this.verifyAddress.bind(this);
    this.setContract = this.setContract.bind(this);

    Contract().then(this.setContract).catch(console.error);
  }

  addAddress (addr, name, email, phone) {
    console.log("Adding an address of "+addr+" for userAccount "+this.props.userAccount)
    window.statusComponent.setStatus('warning', 'Adding address...');
    this.contract.methods.add_address(name, addr, email, phone)
    .send({from: this.props.userAccount})
    .then(function (success) {
      console.log("Success is "+success);
      window.statusComponent.setStatus('success', "Address at " + addr + " was registered.");
    })
    .catch(function () {
      window.statusComponent.setStatus('danger', "Could not register your address. Check metamask.");
    });
  }

  verifyAddress (addr) {
    console.log("Verifying address of "+addr);
    console.log(window.status)
    window.statusComponent.setStatus('warning', 'Verifying address...');
    this.contract.methods.verify_address(addr).call().then(function (ret) {
      var found = ret[0]
      var owner = ret[1];
      var email = ret[2];
      var phone = ret[3];
      if (!found) {
        console.log("No entry exists for this address");
        $('#display').text("Address not registered");
      }
      else {
        console.log("Owner is "+owner+", email is "+email+", phone is "+phone);
        window.statusComponent.setStatus('success', 'Address verified.');
        $('#display').text("Owner: " + owner);
      }
    })
    .catch(function () {
      window.statusComponent.setStatus('danger', "Could not verify your address. Check metamask.");
    });
  }


  setContract(contract) {
    this.contract = contract;
  }

  render () {
    return (
      <div>
        <h4>Add your address and verify your home address</h4>
        <label for="add-address" class="col-lg-2 control-label">Add Address</label>
        <div id="locationField">
        <input id="autocomplete" ref="enterAddressTextBox" placeholder="Enter your address"
         type="text"></input>
        </div>
        <AutoComplete/>
        <input id="autocomplete" ref="enterNameTextBox" placeholder="Enter your name"
         type="text"></input>
        <input id="autocomplete" ref="enterPhoneTextBox" placeholder="Enter your phone #"
         type="text"></input>
        <input id="autocomplete" ref="enterEmailTextBox" placeholder="Enter your email"
         type="text"></input>
        <button onClick= { (e) => this.addAddress(this.refs.enterAddressTextBox.value,
          this.refs.enterNameTextBox.value, this.refs.enterEmailTextBox.value,
          this.refs.enterPhoneTextBox.value) } >Add Address</button>
        <label for="verify-address" class="col-lg-2 control-label">Verify Address</label>
        <input ref="verifyAddressTextBox" type="text"></input>
        <button onClick= { (e) => this.verifyAddress(this.refs.verifyAddressTextBox.value) } >Verify Address</button>
        <h2 id="display"></h2>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {  
    userAccount: state.App.userAccount,
    uport: state.App.uport

  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)