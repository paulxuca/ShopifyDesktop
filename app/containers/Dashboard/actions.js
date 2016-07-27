import { selectData } from '../../utils/ShopifyView/display';

import {
  DISPLAY_DATA,
  DISPLAY_DATA_ERROR,
  DISPLAY_DATA_SUCCESS,
  DUMP_LIST
} from './constants';

function displayDataDispatch(dataType) {
  return {
    type: DISPLAY_DATA,
    payload: dataType
  };
}

function displayDataDispatchSuccess(data, newParams) {
  return {
    type: DISPLAY_DATA_SUCCESS,
    payload: {
      dataFetched: data,
      params: newParams
    }
  };
}

function displayDataDispatchError(errors) {
  return {
    type: DISPLAY_DATA_ERROR,
    payload: errors
  };
}

function displayDataAction(view, params, action, query) {
  return dispatch => {
    dispatch(displayDataDispatch(params.dataType));
    dispatch(dumpListData());
    selectData(view, params, action, query)
    .then((data) => {
      dispatch(displayDataDispatchSuccess(data.res, data.params));
    })
    .catch((viewError) => {
      dispatch(displayDataDispatchError(viewError));
    });
  };
}

function dumpListData() {
  return {
    type: DUMP_LIST
  };
}


export default {
  displayDataAction,
  dumpListData
};
