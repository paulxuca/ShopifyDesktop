import { fromJS } from 'immutable';

import {
    FETCH_QUERY,
    FETCH_QUERY_SUCCESS
} from './constants';

const initalState = fromJS({
  errors: '',
  queries: '',
  fetchingQueries: false
});

export default function searchReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_QUERY:
      return state.set('fetchingQueries', true);
    case FETCH_QUERY_SUCCESS:
      return state.set('fetchingQueries', false)
                  .set('queries', action.payload);
    default:
      return state;
  }
}
