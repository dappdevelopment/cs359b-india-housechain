import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'

class House extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    this.contest = this.contest.bind(this);
    this.state = {};
  }

  contest () {
    alert('THIS IS MY HOME!')
    console.log('I WANT TO CONTEST');
  }

  render () {
    return (
      <div>
        <h4>Details</h4>
        <p><b>Owner: </b>{this.props.owner}</p>
        <p><b>Email: </b>{this.props.email}</p>
        <p><b>Phone: </b>{this.props.phone}</p>
        <button onClick={this.contest}>Contest!</button>
        <iframe
          width="600"
          height="450"
          frameborder="0" style={{border:"0"}}
          src={
            "https://www.google.com/maps/embed/v1/place?key=" +
             process.env.MAPS_APIKEY +
             "&q=" +
             this.props.address
          } allowfullscreen>
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

export default connect(mapStateToProps, mapDispatchToProps)(House)