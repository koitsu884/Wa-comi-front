import React from 'react';
import { FormHelperText } from '@material-ui/core';

export const formErrorMessage = (error, customErrorMessage) => {
    let message;
    if (error.type === 'required')
        message = "必須項目です"
    else if (error.type === 'maxLength')
        message = "値が長すぎます"
    else if (error.type === 'minLength')
        message = "値が短すぎます"
    else
        message = customErrorMessage ? customErrorMessage : "不正な入力値です";

    return message;
};

export const FieldError = ({ error, customErrorMessage = null }) => {
    if (!error) return null;

    return (
        <FormHelperText>{formErrorMessage(error, customErrorMessage)}</FormHelperText>
    )
}
