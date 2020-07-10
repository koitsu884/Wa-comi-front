import { SET_ERRORS, CLEAR_ERRORS } from "./types";

export const clearFormErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    });
}

export const setFormErrors = (errors) => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: errors
    });
}