import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { uport } from '../utils/uportSetup'
import * as AppActions from './actions.js'

class Login extends Component {

  constructor (props) {
    super(props);
    this.connectUport = this.connectUport.bind(this);
    this.housePage = this.housePage.bind(this);
    console.log(props);
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
      console.log(credentials);
      this.props.actions.connectUport(credentials)
      this.housePage();
    });
  }


  housePage() {
    this.props.history.push({
      pathname: '/house',
      state: this.props.location.state
    });
  }

  render () {
    return (
      <div>
        <h1>Login to India HouseChain</h1>

        <h4>Scan the QR Code with your uPort mobile app</h4>
        <button
          onClick={this.connectUport}>
          Connect with uPort
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
        userAccount: state.App.userAccount,
    contract: state.App.contract,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)