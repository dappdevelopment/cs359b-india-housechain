import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'
import houseChainContract from './contract'
import AutoComplete from './maps/autocomplete'
import checkAddressMNID from '../utils/checkAddressMNID'
import waitForMined from '../utils/waitForMined'

import House from './house'
import Register from './register'
import { uport } from '../utils/uportSetup'

class Search extends Component {

  constructor (props) {
    super(props);
    console.log('search');
    console.log(this.props);
    // pushToken and publicEnKey disappears when page refreshes. Manually set it from props.
    uport.pushToken = this.props.uport.pushToken;
    uport.publicEncKey = this.props.uport.publicEncKey;
    console.log(uport);

    this.verifyAddress = this.verifyAddress.bind(this);

    this.contract = houseChainContract;
    this.state = {};
    console.log(this.contract);
  }

  verifyAddress (addr) {
    const userAccount = checkAddressMNID(this.props.uport.address);
    console.log("Verifying address of "+addr);
    window.statusComponent.setStatus('warning', 'Checking if address has already been registered...');

    this.contract.verifyAddress(addr, (error, resp) => {
      if (error) {
        window.statusComponent.setStatus('danger', "Something went wrong...");
        throw error;
      } else {
        const found = resp[0];
        const owner = resp[1];
        const email = resp[2];
        const phone = resp[3];

        this.setState({
          address: addr,
          owner: owner,
          email: email,
          phone: phone,
          found: found,
          search: true,
        });

        if (!found) {
          console.log("No entry exists for this address");
          window.statusComponent.setStatus('success', "This address has not yet been registered.");
          // $('#display').text("Address not registered");
        }
        else {
          console.log("Owner is "+owner+", email is "+email+", phone is "+phone);
          window.statusComponent.setStatus('success', 'This address is taken by owner: ' + owner);
          // $('#display').text("Owner: " + owner);
        }
      }
    })
  }

  render () {
    return (
      <div>
        <h4>Search an available address</h4>
        <label for="add-address" class="col-lg-2 control-label">Add Address</label>
        <div id="locationField">
        <input id="autocomplete" ref="enterAddressTextBox" placeholder="Enter your address"
         type="text"></input>
        </div>
        <AutoComplete/>
        <button onClick={ (e) => this.verifyAddress(this.refs.enterAddressTextBox.value) }>
          Search
        </button>
        { this.state.search ? 
          (this.state.found ? <House location={this.props.location} history={this.props.history} {...this.state} /> : <Register {...this.state} />)
          : null 
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)