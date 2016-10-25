import React from 'react';

const App = React.createClass({
  getInitialState() {
    return {
      clicks: 0
    };
  },
  onClick() {
    this.setState({
      clicks: this.state.clicks + 1
    });
  },
  render() {
    return (
      <div>
        <h1>Click counter</h1>
        <p>Button clicked {this.state.clicks} times</p>
        <button onClick={this.onClick}>Click here</button>
      </div>
    )
  }
});

export default App;