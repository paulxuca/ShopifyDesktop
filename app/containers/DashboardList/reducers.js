import {
    FETCH_QUERY,
    FETCH_QUERY_SUCCESS
  } from './constants';

const initalState = {
  errors: '',
  queries: '',
  fetchingQueries: false
};

export default function searchReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_QUERY:
      return {
        ...state,
        fetchingQueries: true
      };
    case FETCH_QUERY_SUCCESS:
      return {
        ...state,
        fetchingQueries: false,
        queries: action.payload
      };
    default:
      return state;
  }
}
