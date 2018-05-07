import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class House extends Component {

  constructor (props) {
    super(props);
    this.addAddress = this.addAddress.bind(this);
    this.verifyAddress = this.verifyAddress.bind(this);
    this.state = this.props.location.state;
  }

  addAddress (addr) {
    console.log("Adding an address of "+addr+" for userAccount "+this.state.userAccount)
    this.data.contract.methods.add_address(this.state.userAccount, addr)
    .send({from: this.state.userAccount})
    .then(function (name) {
      console.log("Address is "+name);
    });
  }

  verifyAddress (owner) {
    console.log("Reading an address for userAccount "+owner)
    this.data.contract.methods.verify_address(owner).call().then(function (addr) {
      console.log("Address is "+addr);
      $('#display').text("Address: " + addr);
    });
  }

  render () {
    return (
      <div>
        <h4>Add your address and verify your home address</h4>
        <label for="add-address" class="col-lg-2 control-label">Add Address</label>
        <input ref="enterAddressTextBox" type="text"></input>     
        <button onClick= { (e) => this.addAddress(this.refs.enterAddressTextBox.value) } >Add Address</button>

        <label for="verify-address" class="col-lg-2 control-label">Verify Address</label>
        <input ref="verifyAddressTextBox" type="text"></input>     
        <button onClick= { (e) => this.verifyAddress(this.refs.verifyAddressTextBox.value) } >Verify Address</button>
        <h2 id="display"></h2>
      </div>
    )
  }
}

export default House;
