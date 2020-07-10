import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import { clearFormErrors } from '../../actions/formActions';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '2px solid red',
        borderRadius: '5px',
        color: 'red',
        padding: '.5rem 1rem',
        margin: '1rem'
    }
}));

const FormErrors = () => {
    const formErrors = useSelector(state => state.formError);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        //Clear form errors when destroyed
        return () => {
            dispatch(clearFormErrors());
        };
    }, [dispatch])

    if (!formErrors) return null;
    let errors = [];

    for (let [key, value] of Object.entries(formErrors)) {
        let innerErrors = value.join(' , ');
        errors.push(`${key} - ${innerErrors}`);
    }

    return (
        <Box className={classes.root}>
            {
                errors.map((error, index) => {
                    return <p key={index}>{error}</p>
                })
            }
        </Box>
    )
}

export default FormErrors
