import React, { Component } from 'react'
import { uport } from '../utils/uportSetup'

import { connect } from 'react-redux'

class CollectCredentials extends Component {

  constructor (props) {
    super(props)
    this.getCredentialName = this.getCredentialName.bind(this)
    this.getCredentialHome = this.getCredentialHome.bind(this)
  }

  getCredentialName () {
    uport.attestCredentials({
      sub: this.props.uport.address,
      claim: {name: this.props.uport.name},
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
      uriHandler: (log) => { console.log(log) }
    })
  }

  getCredentialHome () {
    uport.attestCredentials({
      sub: this.props.uport.address,
      claim: {home: "This is your home"},
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
      uriHandler: (log) => { console.log(log) }
    })
  }

  render (props) {
    return (
      <h1>Name: {this.props.uport.name}</h1>
      <button onClick={this.getCredentialHome}>Get Home</button>
    )
  }
}