import {
    FETCH_AUTOFILL_FIELDS,
    FETCH_AUTOFILL_FIELDS_SUCCESS,
    FETCH_AUTOFILL_FIELDS_ERROR
} from './constants';

import { getAutofillFields } from '../../utils/ShopifyView/autofill';


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
    }

}

function getAutofillFieldsDispatch(){
	return {
		type: FETCH_AUTOFILL_FIELDS
	}
}

function getAutofillFieldsSuccessDispatch(data){
	return {
		type: FETCH_AUTOFILL_FIELDS_SUCCESS,
		payload: data
	}
}

function getAutofillFieldsErrorDispatch(errors){
	return {
		type: FETCH_AUTOFILL_FIELDS_ERROR,
		payload: errors
	}
}

export default {
	getAutofillFieldsAction
};
