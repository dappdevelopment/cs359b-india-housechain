import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from './actions'
import houseChainContract from './contract'
import AutoComplete from './maps/autocomplete'
import checkAddressMNID from '../utils/checkAddressMNID'
import waitForMined from '../utils/waitForMined'

class House extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.addAddress = this.addAddress.bind(this);
    this.verifyAddress = this.verifyAddress.bind(this);
    // this.setContract = this.setContract.bind(this);
    
    this.contract = houseChainContract;
    this.state = {};
    console.log(this.contract);
  }

  addAddress (addr, name, email, phone) {
    const userAccount = checkAddressMNID(this.props.uport.address)

    console.log(web3.eth.defaultAccount);
    console.log("Adding an address of "+addr+" for userAccount "+userAccount)
    window.statusComponent.setStatus('warning', 'Adding address...');
    // try {
    //   // const success = await this.contract.addAddress(
    //   //   userAccount,
    //   //   addr,
    //   //   name,
    //   //   email,
    //   //   phone
    //   // );

    //   window.statusComponent.setStatus('success', "Address at " + addr + " was registered.");
    // } catch (error) {
    //   console.log(error);
    //   window.statusComponent.setStatus('danger', "Could not register your address. Check metamask.");
    // };
    // this.contract.add_address(addr, name, email, phone, (error, txHash) => {
    //   console.log('updateShares')
    //   if (error) { 
    //     console.log(error);
    //   }
    //   waitForMined(addr, txHash, { blockNumber: null },
    //     () => {
    //       window.statusComponent.setStatus('danger', "Could not register your address. Check metamask.");
    //     },
    //     (resp) => {
    //       console.log(resp);
    //       window.statusComponent.setStatus('success', "Address at " + addr + " was registered.");
    //     }
    //   )
    // })

    // this.contract.add_address(addr, name, email, phone, (error, resp) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(resp);
    //   }
    // })

    this.contract.addAddress(name, addr, email, phone, (error, txHash) => {
      if (error) { 
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

  verifyAddress (addr) {
    const userAccount = checkAddressMNID(this.props.uport.address);
    console.log("Verifying address of "+addr);
    window.statusComponent.setStatus('warning', 'Verifying address...');

    this.contract.verifyAddress(addr, (error, resp) => {
      if (error) {
        throw error;
      } else {
        const found = resp[0];
        const owner = resp[1];
        const email = resp[2];
        const phone = resp[3];
        if (!found) {
          console.log("No entry exists for this address");
          window.statusComponent.setStatus('danger', "No entry exists for this address.");
          $('#display').text("Address not registered");
        }
        else {
          console.log("Owner is "+owner+", email is "+email+", phone is "+phone);
          window.statusComponent.setStatus('success', 'Address verified.');
          $('#display').text("Owner: " + owner);
        }
      }
    })
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