import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { makeStyles, InputLabel } from '@material-ui/core';
import PostCategorySelector from '../common/PostCategorySelector';
import Field from './Field';

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    select: {
        minWidth: 200,
    }
}))

const PostCategoryField = ({
    name,
    label,
    info,
    defaultValue
}) => {
    const { register, setValue, watch } = useFormContext();
    const classes = useStyle();
    const selectedValue = watch(name);

    useEffect(() => {
        register({ 'name': `${name}`, type: 'custom' });
    }, [register, name])

    const handleCategoryChange = (categoryId) => {
        setValue(name, categoryId);
    }

    return (
        <Field label={label} info={info} className={classes.formControl}>
            <InputLabel shrink={selectedValue ? true : false} className={classes.label}>{label}</InputLabel>
            <PostCategorySelector onChange={handleCategoryChange} defaultValue={defaultValue} value={selectedValue} />
        </Field>
    )
}

export default PostCategoryField
