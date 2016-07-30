import { fromJS } from 'immutable';

import {
  DISPLAY_DATA,
  DISPLAY_DATA_SUCCESS,
  DISPLAY_DATA_ERROR,
  DUMP_LIST
} from './constants';

const initialState = fromJS({
  dataFetched: '',
  dataType: 'orders',
  params: '',
  errors: '',
  isFetching: false,
})

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_DATA:
      return state.set('dataType', fromJS(action.payload))
                  .set('isFetching', true);
    case DISPLAY_DATA_SUCCESS:
      return state.set('dataFetched', fromJS(action.payload.dataFetched))
                  .set('params', action.payload)
                  .set('isFetching', false);
    case DISPLAY_DATA_ERROR:
      return state.set('errors', fromJS(action.payload))
                  .set('isFetching', false);
    case DUMP_LIST:
      return state.set('dataFetched', null);
    default:
      return state;
  }
}

