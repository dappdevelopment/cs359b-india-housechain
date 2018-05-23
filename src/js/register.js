import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'
import houseChainContract from './contract'
import AutoComplete from './maps/autocomplete'
import checkAddressMNID from '../utils/checkAddressMNID'
import waitForMined from '../utils/waitForMined'

class Register extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.addAddress = this.addAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.contract = houseChainContract;
    this.state = {};
    console.log(this.contract);
  }

  addAddress (addr, name, email, phone) {
    const userAccount = checkAddressMNID(this.props.uport.address)

    console.log(web3.eth.defaultAccount);
    console.log("Adding an address of "+addr+" for userAccount "+userAccount)
    window.statusComponent.setStatus('warning', 'Adding address...');


    this.contract.addAddress(name, addr, email, phone, (error, txHash) => {
      if (error) { 
        window.statusComponent.setStatus('danger', 'Something went wrong...');
        throw error;
      }
      waitForMined(txHash, { blockNumber: null },
        () => {
          window.statusComponent.setStatus('warning', "Mining...Adding your address on the blockchain");
        },
        () => {
          window.statusComponent.setStatus('success', "Address at " + addr + " was registered.");
        }
      )
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.refs);
    this.addAddress(
            this.props.address,
            this.refs.enterNameTextBox.value, 
            this.refs.enterEmailTextBox.value,
            this.refs.enterPhoneTextBox.value
    );
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  render () {
    return (
      <div>
        <h4>Register your home</h4>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Name:
            <input
              ref="enterNameTextBox"
              type="text"
              value={this.props.uport.name}/>
          </label>
          <br />
          <label>
            Email:
            <input
              ref="enterEmailTextBox"
              type="text"
              value={this.props.uport.email}/>
          </label>
          <br />
          <label>
            Phone:
            <input
              ref="enterPhoneTextBox"
              type="text"
              value={this.props.uport.phone}/>
          </label>
          <br />
          <label>
            Additional Info:
            <textarea
              ref="enterTextArea"
              type="text"
              placeholder="enter proof of address"/>
          </label>
          <input type="submit" value="Register" />
        </form>

        <iframe
          width="600"
          height="450"
          frameborder="0" style={{border:"0"}}
          src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyAtTxv3TgcEDW-tS_WzTbuwHr7PNCDme2A&q=" + 
          this.props.address} allowfullscreen>
        </iframe>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {  
    uport: state.App.uport
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)