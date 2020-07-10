import React, { useEffect, useState, Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import Field from './Field';
import { Input, Box, IconButton } from '@material-ui/core';
import ImagePreview from '../common/ImagePreview';
import { validateImage } from '../../utils/imageManager';
import { Alert } from '../../utils/alert';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    deleteButton: {
        position: 'absolute',
        left: '7rem',
        top: '7rem',
        backgroundColor: 'rgba(0,0,0,.5)',
        color: 'red',
        zIndex: 10,
    }
});

const SelectImageField = ({
    id,
    name,
    margin,
    fullWidth,
    inputRef,
    initialImageUrl,
    customErrorMessage,
    onDelete,
    ...rest
}) => {
    const { register, setValue } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState(initialImageUrl);
    const [selected, setSelected] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        register({ 'name': `${name}`, type: 'custom' });
    }, [register, name])

    const displayImagePreview = (file) => {
        let reader = new FileReader();

        reader.onloadend = () => {
            setPreviewUrl(reader.result)
        }

        reader.readAsDataURL(file);
    }

    const handleFileChange = e => {
        let file = e.target.files[0];

        if (!validateImage(file)) {
            Alert.error("対応していないファイルタイプです");
            setPreviewUrl(null);
            return;
        }
        displayImagePreview(file);
        setValue(name, file);
        setSelected(true);
    }

    const handleImageClear = () => {
        setPreviewUrl(initialImageUrl);
        setValue(name, null);
        setSelected(false);

        document.getElementsByName(name)[0].value = "";
    }

    return (
        <Box className={classes.root}>
            {
                !selected && previewUrl
                    ? <IconButton className={classes.deleteButton} onClick={onDelete}><Delete style={{ fontSize: 40 }} /></IconButton>
                    : null

            }
            <ImagePreview previewUrl={previewUrl} handleCancel={handleImageClear} enableCancelButton={selected} />
            <Field
                fullWidth={fullWidth}
                margin={margin}
                name={name}
                customErrorMessage={customErrorMessage}
            >
                <Input
                    type="file"
                    id={id}
                    name={name}
                    accept="image/*"
                    inputRef={inputRef}
                    onChange={handleFileChange}
                    {...rest}
                />
            </Field>
        </Box>
    )
}

export default SelectImageField
