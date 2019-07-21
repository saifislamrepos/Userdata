import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Newcomp from './components/newcomp/newcomp.js';
import Signin from './components/signin/signin.js';
import { HashRouter as Router, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import basecss from './css/index.scss';
window.store = store;
//store.subscribe(() => console.log('Look ma, Redux!!'))
ReactDOM.render((
   <Router>
      <Provider store={store}>
         <Route exact path = "/" component = {App}>
         </Route>
         <Route path = "/createcomponent" component = {Newcomp}>
         </Route>
         <Route path = "/signin" component = {Signin}>
         </Route>
      </Provider>
   </Router>
 ), document.getElementById('app'))

if (module.hot) {
module.hot.accept();
}