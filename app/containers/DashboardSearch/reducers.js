import {
    FETCH_AUTOFILL_FIELDS,
    FETCH_AUTOFILL_FIELDS_SUCCESS,
    FETCH_AUTOFILL_FIELDS_ERROR
} from './constants';

const initalState = {
    fields: '',
    fetchingFields: false,
    errors: ''
}

export default function searchReducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_AUTOFILL_FIELDS:
            return {
                ...state,
                fetchingFields: true
            };
        case FETCH_AUTOFILL_FIELDS_SUCCESS:
            return {
                fields: action.payload,
                fetchingFields: false,
                errors: ''
            };
        case FETCH_AUTOFILL_FIELDS_ERROR:
            return {
                fields: '',
                fetchingFields: false,
                errors: action.payload
            };
        default:
            return state;
    }
}
