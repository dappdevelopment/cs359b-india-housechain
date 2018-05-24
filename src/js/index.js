import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'

import '../css/index.css'

import App from './app'
import Store from './store'
import Search from './search'
import AccountPage from './accountPage'

const Root = () => (
  <Router>
    <div>
      <Route exact path={process.env.DAPP_URL + "/"} component={App} />
      <Route path={process.env.DAPP_URL + "/search"} component={Search} />
      <Route path={process.env.DAPP_URL + "/account"} component={AccountPage} />
    </div>
  </Router>
);

const storeInstance = Store()


ReactDOM.render(
  <Provider store={storeInstance.Store}>
    <PersistGate loading={null} persistor={storeInstance.Persistor}>
      <Root />
    </PersistGate>  
  </Provider>,
  document.getElementById('root')
);
