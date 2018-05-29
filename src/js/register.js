import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from './actions'
import houseChainContract from './contract'
import AutoComplete from './maps/autocomplete'
import checkAddressMNID from '../utils/checkAddressMNID'
import waitForMined from '../utils/waitForMined'

import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';




// const config = {
//     bucketName: 'indiahousechain',
//     region: 'ap-south-1',
//     accessKeyId: 'AKIAJPKHODFSA4KCD7EA',
//     secretAccessKey: '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',
// }
  
const config = {
  apiKey: "AIzaSyBHmXtUdln-QFoAlTYoCAX8mRhfls-SbzM",
  authDomain: "india-housechain.firebaseapp.com",
  //databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "gs://india-housechain.appspot.com",
};


class Register extends Component {

  constructor (props) {
    super(props);
    console.log(this.props);


    firebase.initializeApp(config);

    
    this.addAddress = this.addAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);   
    this.contract = houseChainContract;
    this.state = {
      selectedFile: null
    };
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

  fileSelectedHandler = event => {
    //console.log(event.target.files[0]);
    this.setState({
      selectedFile : event.target.files[0]
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
    // uploadFile(this.state.selectedFile, config)
    // .then(data => console.log(data))
    // .catch(err => console.log(err));
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