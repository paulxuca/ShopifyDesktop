import {
FETCH_AUTOFILL_FIELDS,
FETCH_AUTOFILL_FIELDS_SUCCESS,
FETCH_AUTOFILL_FIELDS_ERROR,
SAVE_QUERY,
SAVE_QUERY_SUCCESS,
SAVE_QUERY_ERROR
} from './constants';
import { mergeObjects } from '../../utils/Shopify/helpers';
import { getAutofillFields } from '../../utils/ShopifyView/autofill';

function saveQueryAction(query, dataType, name) {
  return dispatch => {
    dispatch(saveQueryDispatch());
    const newKey = {};
    newKey[`${dataType}_${name.replace(/ /g, '')}`] = {
      name,
      dataType,
      query
    };
    mergeObjects('queries', newKey)
    .then(() => {
      dispatch(saveQuerySuccessDispatch());
    })
    .catch((err) => {
      if (err) dispatch(saveQueryErrorDispatch(err));
    });
    ;
  };
}


function saveQueryDispatch() {
  return {
    type: SAVE_QUERY
  };
}

function saveQuerySuccessDispatch() {
  return {
    type: SAVE_QUERY_SUCCESS
  };
}

function saveQueryErrorDispatch(err) {
  return {
    type: SAVE_QUERY_ERROR,
    payload: err
  };
}

function getAutofillFieldsAction(dataType) {
  return dispatch => {
    dispatch(getAutofillFieldsDispatch());
    getAutofillFields(dataType)
    .then((res) => {
      dispatch(getAutofillFieldsSuccessDispatch(res));
    })
    .catch((err) => {
      dispatch(getAutofillFieldsErrorDispatch(err));
    });
  };
}

function getAutofillFieldsDispatch() {
  return {
    type: FETCH_AUTOFILL_FIELDS
  };
}

function getAutofillFieldsSuccessDispatch(data) {
  return {
    type: FETCH_AUTOFILL_FIELDS_SUCCESS,
    payload: data
  };
}

function getAutofillFieldsErrorDispatch(errors) {
  return {
    type: FETCH_AUTOFILL_FIELDS_ERROR,
    payload: errors
  };
}

export default {
  getAutofillFieldsAction,
  saveQueryAction
};
