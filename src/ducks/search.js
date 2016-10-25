import { loop, Effects } from 'redux-loop';
import { searchWithTerm } from '../services/search';

const INITIAL_STATE = {
  searchResults: []
};

const SEARCH = 'SEARCH';
const SEARCH_COMPLETED = 'SEARCH_COMPLETED';

function searchEffect(searchTerm) {
  return searchWithTerm(searchTerm).then((results) => ({
    type: SEARCH_COMPLETED,
    payload: results
  }));
}


export function search(searchTerm) {
  return {
    type: SEARCH,
    payload: searchTerm
  };
}

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case SEARCH:
      return loop(state, Effects.promise(searchEffect, action.payload));

    case SEARCH_COMPLETED:
      return {
        searchResults: action.payload
      };

    default:
      return state;
  }
};
