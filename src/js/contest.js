import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'
import houseChainContract from './contract'
import AutoComplete from './maps/autocomplete'
import checkAddressMNID from '../utils/checkAddressMNID'
import waitForMined from '../utils/waitForMined'

import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';


const styles = {
  progressWrapper: {
    height: '10px',
    marginTop: '10px',
    width: '400px',
    float:'left',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)'
  },
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#5cb85c',
    WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease'
  },
  cancelButton: {
    marginTop: '5px',
    WebkitAppearance: 'none',
    padding: 0,
    cursor: 'pointer',
    background: '0 0',
    border: 0,
    float: 'left',
    fontSize: '21px',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
    textShadow: '0 1px 0 #fff',
    filter: 'alpha(opacity=20)',
    opacity: '.2'
  }
}
  
const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "india-housechain.firebaseapp.com",
  //databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "gs://india-housechain.appspot.com",
};


class Contest extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);
    window.statusComponent.setState({show: false});

    firebase.initializeApp(config);

    
    this.addAddress = this.addAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);

    this.contract = houseChainContract;

    this.state = {
      username: this.props.uport.name,
      email: this.props.uport.email,
      phone: this.props.uport.phone,
      filename: '',
      isUploading: false,
      progress: 0,
      fileURL: '',
      submit: false,
    };


    console.log(this.contract);
  }

  handleChangeUsername = (event) => this.setState({username: event.target.value});

  handleChangeEmail = (event) => this.setState({email: event.target.value});

  handleChangePhone = (event) => this.setState({phone: event.target.value});

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});

  handleUploadError = (error) => {
    this.setState({message: "Error uploading file"});
    console.error(error);
  }

  handleUploadSuccess = (filename) => {
    this.setState({filename: filename, progress: 100});
    firebase.storage().ref().child(filename).getDownloadURL().then(url => this.setState({fileURL: url}));
  };


  handleProgress(progress) {
    if (progress > -1 ) {
      let barStyle = Object.assign({}, styles.progressBar);
      barStyle.width = progress + '%';

      let message = (<span>{barStyle.width}</span>);

      if (progress === 100){
        message = (<span >Successfully Uploaded</span>);
      }
      this.setState({
        barStyle: barStyle,
        message: message
      });
    }
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
          window.statusComponent.setStatus('warning', "Adding your address on the blockchain...");
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
    window.statusComponent.setStatus('warning', "Submitting your dispute...");
    setTimeout(function() { this.setState({submit: true}); }.bind(this), 2000);
    window.statusComponent.setStatus('success', "An email has been sent to the Government of India.")
  }


  render () {
    return (
      <div>
        <h4>Contest Form</h4>
        <p>Contesting for the address at <b>{this.props.currentAddress}</b></p>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Name:
            <input
              ref="enterNameTextBox"
              type="text"
              value={this.state.username}
              onChange={this.handleChangeUsername}/>
          </label>
          <br />
          <label>
            Email:
            <input
              ref="enterEmailTextBox"
              type="text"
              value={this.state.email}
              onChange={this.handleChangeEmail}/>
          </label>
          <br />
          <label>
            Phone:
            <input
              ref="enterPhoneTextBox"
              type="text"
              value={this.state.phone}
              onChange={this.handleChangePhone}/>
          </label>
          <br />
          <label>
          <textarea placeholder="Explain why you are contesting"></textarea>
          </label>
          <br />
          <label>
            Upload Proof Of Address:

            <FileUploader
              accept=".pdf"
              name="avatar"
              filename={this.props.address+"_proof_of_ownership"}
              storageRef={firebase.storage().ref()}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />

            {this.state.isUploading &&
              <div>
                <div style={styles.progressWrapper}>
                  <div style={this.state.barStyle}></div>
                </div>
                <div style={{'clear':'left'}}>
                  {this.state.message}
                </div>
              </div>
            }

            {this.state.fileURL &&
              <a href={this.state.fileURL} target="_blank">{this.state.filename}</a>
            }
          </label>

          <input type="submit" value="Submit" />

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {  
    uport: state.App.uport,
    currentAddress: state.App.currentAddress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contest)