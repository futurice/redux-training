import React from 'react';
import { connect } from 'react-redux';

const App = React.createClass({
  render() {
    return (
      <div>
        <h2>Search</h2>

        <input type="text" />

        <ul>
          {
            this.props.searchResults.map((result) =>
              <li key={result}>
                {result}
              </li>
            )
          }
        </ul>
      </div>
    )
  }
});

function storeStateToProps(state) {
  return {
    searchResults: state.searchResults
  };
}

export default connect(storeStateToProps)(App);