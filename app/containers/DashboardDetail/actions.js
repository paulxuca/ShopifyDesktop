import {
    LOAD_SINGLE_DATA,
    LOAD_SINGLE_DATA_SUCCESS,
    LOAD_SINGLE_DATA_ERROR
} from './constants';

import {
    selectSingleData
} from '../../utils/ShopifyView/display';

function loadSingleDataAction(dataString){
  return dispatch => {
    dispatch(loadSingleDataDispatch());
    selectSingleData(dataString)
    .then((data) => {
        dispatch((loadSingleDataDispatchSuccess(data)));
    })
    .catch((err) => {
        if(err) dispatch(loadSingleDataDispatchError(err));
    });
  }
}


function loadSingleDataDispatch(){
    return {
        type: LOAD_SINGLE_DATA
    };
}

function loadSingleDataDispatchSuccess(data){
    return {
        type: LOAD_SINGLE_DATA_SUCCESS,
        payload: data
    };
}

function loadSingleDataDispatchError(err){
    return {
        type: LOAD_SINGLE_DATA_ERROR,
        payload: err
    };
}

export default {
    loadSingleDataAction
}
