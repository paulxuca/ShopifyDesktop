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

const initialState = {
  data: '',
  errors: '',
  isFetching: false,
};

export default function mainAppReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHECK:
      return {
        ...state,
        isFetching: true
      };
    case CREDENTIALS_CHECK_VALID:
      return {
        ...state,
        isFetching: false,
        errors: '',
        data: action.payload
      };
    case CREDENTIALS_CHECK_INVALID:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      };
    case LOGIN_SHOP:
      return {
        ...state,
        isFetching: true,
        errors: ''
      };
    case LOGIN_SHOP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        errors: ''
      };
    case LOGIN_SHOP_ERROR:
      return {
        ...state,
        isFetching: false,
        errors: action.payload
      };
    case FETCH_DATA:
      return {
        ...state,
        dataType: action.payload.dataType,
        isFetching: true,
        errors: ''
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        errors: '',
        isFetching: false
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        errors: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
}
