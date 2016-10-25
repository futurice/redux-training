import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { install } from 'redux-loop';

import App from './App';
import './style.css';

import reducer from './ducks/search';

/*
 * State handling
 */

const store = createStore(reducer, install());

/*
 * Initialize app
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
