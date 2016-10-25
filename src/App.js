import React from 'react';
import { connect } from 'react-redux';
import { search } from './ducks/search';

const App = React.createClass({
  onSearch(event) {
    this.props.dispatch(search(event.target.value));
  },
  render() {
    return (
      <div>
        <h2>Search</h2>

        <input type="text" onChange={this.onSearch} />

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