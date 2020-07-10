import React from 'react'
import { TextField } from '@material-ui/core';
import Field from './Field';

const TextAreaField = ({
    id,
    info,
    name,
    variant,
    margin,
    label,
    autoComplete,
    fullWidth,
    inputRef,
    required,
    rows = 5,
    customErrorMessage,
    ...rest
}) => {
    return (
        <Field
            fullWidth={fullWidth}
            margin={margin}
            name={name}
            info={info}
            customErrorMessage={customErrorMessage}
        >
            <TextField
                label={label ? label : null}
                multiline
                rows={rows}
                inputRef={inputRef}
                name={name}
                variant={variant}
                required={required}
                {...rest}
            />
        </Field>
    )
}

export default TextAreaField
