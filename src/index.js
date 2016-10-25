import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import './style.css';

import reducer from './ducks/search';

/*
 * State handling
 */

const store = createStore(reducer, applyMiddleware(thunk));

/*
 * Initialize app
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
