import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { makeStyles, InputLabel } from '@material-ui/core';
import Field from './Field';
import GroupCategorySelector from '../common/GroupCategorySelector';

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    select: {
        minWidth: 200,
    }
}))

const GroupCategoryField = ({
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
            <GroupCategorySelector onChange={handleCategoryChange} defaultValue={defaultValue} value={selectedValue} />
        </Field>
    )
}

export default GroupCategoryField
