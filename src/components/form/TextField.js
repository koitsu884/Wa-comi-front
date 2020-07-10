import React from 'react'
import Field from './Field';
import { TextField as MiTextField } from '@material-ui/core';

export const TextField = ({
    id,
    info,
    name,
    type,
    variant,
    margin,
    label,
    autoComplete,
    fullWidth,
    inputRef,
    defaultValue,
    required,
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
            <MiTextField
                label={label ? label : null}
                inputRef={inputRef}
                id={id}
                autoComplete={autoComplete}
                defaultValue={defaultValue}
                name={name}
                type={type}
                variant={variant}
                required={required}
                {...rest}
            />
        </Field>
    )
}
