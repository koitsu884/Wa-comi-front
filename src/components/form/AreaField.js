import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from './Field';
import AreaFieldSelector from './AreaFieldSelector';
import { InputLabel, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
    },
    select: {
        minWidth: 200,
    }
}))

const AreaField = ({
    name,
    label,
    info,
    defaultValue = ''
}) => {
    const { register, setValue, watch } = useFormContext();
    const selectedValue = watch(name);
    const classes = useStyle();

    useEffect(() => {
        register({ 'name': `${name}`, type: 'custom' });
    }, [register, name])

    const handleAreaChange = (areaId) => {
        setValue(name, areaId);
    }

    return (
        <Field label={label} info={info} className={classes.formControl}>
            <InputLabel shrink={selectedValue ? true : false} className={classes.label}>{label}</InputLabel>
            <AreaFieldSelector onChange={handleAreaChange} defaultValue={defaultValue} value={selectedValue} />
        </Field>
    )
}

export default AreaField
