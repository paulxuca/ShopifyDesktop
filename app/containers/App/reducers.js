import { Map, fromJS } from 'immutable';

import {
  LOGIN_SHOP,
  LOGIN_SHOP_SUCCESS,
  LOGIN_SHOP_ERROR,
  CREDENTIALS_CHECK,
  CREDENTIALS_CHECK_VALID,
  CREDENTIALS_CHECK_INVALID,
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR
} from './constants';

const initialState = Map({
  data: '',
  errors: '',
  isFetching: false
});

export default function mainAppReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHECK:
      return state.set('isFetching', true);
    case CREDENTIALS_CHECK_VALID:
      return state.set('isFetching', false)
                  .set('errors', '')
                  .set('data', fromJS(action.payload));
    case CREDENTIALS_CHECK_INVALID:
      return state.set('isFetching', false)
                  .set('errors', fromJS(action.payload));
    case LOGIN_SHOP:
      return state.set('isFetching', true)
                  .set('errors', '');
    case LOGIN_SHOP_SUCCESS:
      return state.set('data', fromJS(action.payload))
                  .set('isFetching', false)
                  .set('errors', '');
    case LOGIN_SHOP_ERROR:
      return state.set('isFetching', false)
                  .set('errors', fromJS(action.payload));
    case FETCH_DATA:
      return state.set('isFetching', true)
                  .set('errors', '');
    case FETCH_DATA_SUCCESS:
      return state.set('isFetching', false)
                  .set('errors', '');
    case FETCH_DATA_ERROR:
      return state.set('isFetching', false)
                  .set('errors', fromJS(action.payload));
    default:
      return state;
  }
}
