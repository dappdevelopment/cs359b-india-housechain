import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'

import '../css/index.css'

import App from './app.js'
import Store from './store.js'
import Login from './login.js'
import House from './house.js'

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/house" component={House} />
    </div>
  </Router>
);

ReactDOM.render(
  <Provider store={Store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);