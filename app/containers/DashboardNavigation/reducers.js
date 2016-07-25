import {
  NAVIGATE_TO
} from './constants';

const initialState = {
  view: 'orders'
};

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case NAVIGATE_TO:
      return {
        view: action.payload
      };
    default:
      return state;
  }
}
