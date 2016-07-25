import {
  NAVIGATE_TO
} from './constants';

import {
  dumpListData
} from '../Dashboard/actions'; //we're dumping the list data to prevent overwriting data



function navigateTo(location) {
  return dispatch => { // eslint-disable-line
    dispatch(dumpListData());
    return new Promise((resolve) => {
      resolve(dispatch(navigateToDispatch(location)));
    });
  };
}

function navigateToDispatch(location) {
  return {
    type: NAVIGATE_TO,
    payload: location
  };
}


export default {
  navigateTo
};

