import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import './style.css';

import reducer from './ducks/search';

/*
 * State handling
 */

const store = createStore(reducer);

/*
 * Initialize app
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
