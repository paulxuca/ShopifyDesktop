import { fromJS } from 'immutable';

import {
    FETCH_AUTOFILL_FIELDS,
    FETCH_AUTOFILL_FIELDS_SUCCESS,
    FETCH_AUTOFILL_FIELDS_ERROR,
    SAVE_QUERY,
    SAVE_QUERY_SUCCESS,
    SAVE_QUERY_ERROR,
    FETCH_QUERY,
    FETCH_QUERY_SUCCESS
  } from './constants';

const initialState = fromJS({
  fields: '',
  queries: '',
  errors: '',
  fetchingFields: false,
  savingQuery: false
});

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUERY:
      return state.set('fetchingFields', true);
    case FETCH_QUERY_SUCCESS:
      return state.set('queries', fromJS(action.payload));
    case SAVE_QUERY:
      return state.set('savingQuery', true);
    case SAVE_QUERY_SUCCESS:
      return state.set('savingQuery', false);
    case SAVE_QUERY_ERROR:
      return state.set('savingQuery', false)
                  .set('errors', fromJS(action.payload));
    case FETCH_AUTOFILL_FIELDS:
      return state.set('fetchingFields', true);
    case FETCH_AUTOFILL_FIELDS_SUCCESS:
      return state.set('fields', fromJS(action.payload))
                  .set('fetchingFields', false)
                  .set('errors', '');
    case FETCH_AUTOFILL_FIELDS_ERROR:
      return state.set('fields', '')
                  .set('fetchingFields', false)
                  .set('errors', fromJS(action.payload));
    default:
      return state;
  }
}
