import { fromJS } from 'immutable';

import {
  NAVIGATE_TO
} from './constants';

const initialState = fromJS({
  view: 'orders'
});

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case NAVIGATE_TO:
      return state.set('view', fromJS(action.payload));
    default:
      return state;
  }
}
