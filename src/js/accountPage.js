import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'

class AccountPage extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h4>Personal Info</h4>
        <p><b>Owner: </b>{this.props.uport.name}</p>
        <p><b>Email: </b>{this.props.uport.email}</p>
        <p><b>Phone: </b>{this.props.uport.phone}</p>
        <p><b>Country: </b>{this.props.uport.country}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)