import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  DISPLAY_DATA,
  DISPLAY_DATA_SUCCESS,
  DISPLAY_DATA_ERROR,
  DUMP_LIST
} from './constants';

const initialState = {
  dataFetched: '',
  dataType: 'orders',
  params: '',
  errors: '',
  isFetching: false,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
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
    case DISPLAY_DATA:
      return {
        ...state,
        dataType: action.payload,
        isFetching: true
      };
    case DISPLAY_DATA_SUCCESS:
      return {
        ...state,
        dataFetched: action.payload.dataFetched,
        params: action.payload.params,
        isFetching: false
      };
    case DISPLAY_DATA_ERROR:
      return {
        ...state,
        errors: action.payload,
        isFetching: false
      };
    case DUMP_LIST:
      return{
        ...state,
        dataFetched: null
      }
    default:
      return state;
  }
}

