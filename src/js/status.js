import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Alert } from 'react-bootstrap';

class Status extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);
    // this.setStatus = this.setStatus.bind(this);

    this.state = {
      show: false,
      style: 'success',
      message: '',
      spinner: false,
    };
  }

  setStatus(style, message) {
    this.setState({
        style: style,
        message: message,
        show: true,
    });
    if (style == 'warning') {
      this.setState({
        spinner: true,
      });    
    } else {
      this.setState({
        spinner: false,
      });
    }
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle={this.state.style} onDismiss={this.handleDismiss}>
          {this.state.spinner ? <i class="fa fa-spinner fa-spin"></i> : null}
          <span class="pad-left">
            {this.state.message}
          </span>
        </Alert>
      );
    } else {
      return <div></div>;
    }
  }
}

ReactDOM.render(
  <Status ref={(status) => {window.statusComponent = status}} />,
  document.getElementById("status")
);
