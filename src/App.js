import React from 'react';
import { connect } from 'react-redux';

const App = React.createClass({
  onClick() {
    this.props.dispatch({type: 'CLICK'});
  },
  render() {
    return (
      <div>
        <h1>Click counter</h1>
        <p>Button clicked {this.props.clicks} times</p>
        <button onClick={this.onClick}>Click here</button>
      </div>
    )
  }
});

function storeStateToProps(state) {
  return {
    clicks: state.clicks
  };
}

export default connect(storeStateToProps)(App);