import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Alert } from 'react-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={process.env.DAPP_URL + "/"}>India-HouseChain</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={2} href={process.env.DAPP_URL + "/search"} >
              Search
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

ReactDOM.render(
  <NavBar/>,
  document.getElementById("navbar")
);