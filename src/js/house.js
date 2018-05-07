import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from './actions.js'

class House extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.addAddress = this.addAddress.bind(this);
    this.verifyAddress = this.verifyAddress.bind(this);
  }

  addAddress (addr) {
    console.log("Adding an address of "+addr+" for userAccount "+this.props.userAccount)
    this.props.contract.methods.add_address(this.props.userAccount, addr)
    .send({from: this.props.userAccount})
    .then(function (name) {
      console.log("Address is "+name);
    });
  }

  verifyAddress (owner) {
    console.log("Reading an address for userAccount "+owner)
    this.props.contract.methods.verify_address(owner).call().then(function (addr) {
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

const mapStateToProps = (state, props) => {
  return {  
    userAccount: state.App.userAccount,
    contract: state.App.contract,
    uport: state.App.uport

  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(House)