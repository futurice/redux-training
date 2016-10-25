import { searchWithTerm } from '../services/search';

const INITIAL_STATE = {
  searchResults: []
};

const SEARCH_COMPLETED = 'SEARCH_COMPLETED';

export function search(searchTerm) {
  return {
    type: SEARCH_COMPLETED,
    payload: searchWithTerm(searchTerm)
  };
}

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch(action.type) {
    case SEARCH_COMPLETED:
      return {
        searchResults: action.payload
      }
    default:
      return state;
  }
};
