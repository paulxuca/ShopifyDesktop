import storage from 'electron-json-storage';
import _ from 'lodash';

import {
  FETCH_QUERY,
  FETCH_QUERY_SUCCESS
} from './constants';

function fetchQueryAction(dataType) {
  return dispatch => {
    dispatch(fetchQueryDispatch());
    storage.get('queries', (err, data) => {
      if (err) console.log(err); // eslint-disable-line
      const picked = _.pickBy(data, (elem) => {
        return elem.dataType === dataType;
      });
      dispatch(fetchQueryDispatchSuccess(picked));
    });
  };
}

function fetchQueryDispatch() {
  return {
    type: FETCH_QUERY
  };
}

function fetchQueryDispatchSuccess(data) {
  return {
    type: FETCH_QUERY_SUCCESS,
    payload: data
  };
}

export default {
  fetchQueryAction
};
