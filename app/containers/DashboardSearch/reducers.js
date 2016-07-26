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

const initalState = {
  fields: '',
  queries: '',
  errors: '',
  fetchingFields: false,
  savingQuery: false
};

export default function searchReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_QUERY:
      return {
        ...state,
        fetchingFields: true
      };
    case FETCH_QUERY_SUCCESS:
      return {
        ...state,
        queries: action.payload
      };
    case SAVE_QUERY:
      return {
        ...state,
        savingQuery: true
      };
    case SAVE_QUERY_SUCCESS:
      return {
        ...state,
        savingQuery: false
      };
    case SAVE_QUERY_ERROR:
      return {
        ...state,
        savingQuery: false,
        errors: action.payload
      };
    case FETCH_AUTOFILL_FIELDS:
      return {
        ...state,
        fetchingFields: true
      };
    case FETCH_AUTOFILL_FIELDS_SUCCESS:
      return {
        fields: action.payload,
        fetchingFields: false,
        errors: ''
      };
    case FETCH_AUTOFILL_FIELDS_ERROR:
      return {
        fields: '',
        fetchingFields: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
