import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uport } from '../utils/uportSetup'


class House extends Component {

  constructor (props) {
    super(props);
    this.connectUport = this.connectUport.bind(this);
  }

  connectUport () {

    // uport.requestCredentials(
    //   { requested: ['name', 'phone', 'country', 'avatar'],
    //     notifications: true }
    // ).then((credentials) => {
    //     console.log({credentials});
    //     this.props.actions.connectUport(credentials);
    // });
    uport.requestCredentials().then((credentials) => {
      console.log("Logging in!");
      console.log(credentials);
    });
  }

  render () {
    return (
      <div>
        <h4>Build a Better dApp</h4>

        <h1>Identity and transaction infrastructure for Ethereum</h1>
        <button
          onClick={this.connectUport}>
          Connect with uPort
        </button>
      </div>
    )
  }
}

export default House;
