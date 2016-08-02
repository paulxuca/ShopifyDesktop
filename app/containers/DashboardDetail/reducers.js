import { fromJS } from 'immutable';

import {
  LOAD_SINGLE_DATA,
  LOAD_SINGLE_DATA_SUCCESS,
  LOAD_SINGLE_DATA_ERROR
} from './constants';

const initialState = fromJS({
  data: '',
  errors: '',
  isLoading: false
});

export default function dashboardDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SINGLE_DATA:
      return state.set('isFetching', true);
    case LOAD_SINGLE_DATA_SUCCESS:
      return state.set('isFetching', false)
                  .set('errors', '')
                  .set('data', action.payload);
    case LOAD_SINGLE_DATA_ERROR:
      return state.set('isFetching', false)
                  .set('errors', action.payload);
    default:
      return state;
  }
}
