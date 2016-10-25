import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import './style.css';

/*
 * State handling
 */

const INITIAL_STATE = {
  clicks: 0
};

function reducer(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case 'CLICK':
      return {
        clicks: state.clicks + 1
      };
    default:
      return state;
  }
};

const store = createStore(reducer);


/*
 * Initialize app
 */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
