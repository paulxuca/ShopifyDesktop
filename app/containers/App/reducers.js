import {
  LOGIN_SHOP,
  LOGIN_SHOP_SUCCESS,
  LOGIN_SHOP_ERROR,
  CREDENTIALS_CHECK,
  CREDENTIALS_CHECK_VALID,
  CREDENTIALS_CHECK_INVALID
} from './constants';

const initialState = {
  data: '',
  errors: '',
  isAuthing: false
};

export default function mainAppReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHECK:
      return {
        ...state,
        isAuthing: true
      };
    case CREDENTIALS_CHECK_VALID:
      return {
        ...state,
        isAuthing: false,
        errors: '',
        data: action.payload
      };
    case CREDENTIALS_CHECK_INVALID:
      return {
        ...state,
        isAuthing: false,
        errors: action.payload
      };
    case LOGIN_SHOP:
      return {
        ...state,
        isAuthing: true,
        errors: ''
      };
    case LOGIN_SHOP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isAuthing: false,
        errors: ''
      };
    case LOGIN_SHOP_ERROR:
      return {
        ...state,
        isAuthing: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
