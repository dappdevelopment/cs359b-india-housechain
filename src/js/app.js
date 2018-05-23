import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { uport } from '../utils/uportSetup'
import * as AppActions from './actions'

class App extends React.Component {
  constructor (props) {
    super (props);

    this.connectUport = this.connectUport.bind(this);
    this.toSearchPage = this.toSearchPage.bind(this);
    this.state = {};
  }

  connectUport () {
    uport.requestCredentials(
      { requested: ['name', 'phone', 'country', 'avatar', 'email'],
        notifications: true
      }).then((credentials) => {
      console.log(credentials);
      this.props.actions.connectUport(credentials);
      this.props.actions.isLoggedIn(true);
      this.toSearchPage();
    });
  }

  toSearchPage() {
    this.props.history.push({
      pathname: process.env.DAPP_URL + "/search",
      state: this.props.location.state
    });
  }

  render () {
    return (
      <div className='App'>
        <header className="App-header">
          <h1>Welcome to India HouseChain!</h1>
          <h4>A place to register and verify ownership of your home directly on the blockchain</h4>
        </header>
        <br />
        <button onClick={this.connectUport}>
          Login
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


