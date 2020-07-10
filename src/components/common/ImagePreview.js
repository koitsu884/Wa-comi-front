import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import NoImage from '../../assets/img/noImage.jpg';

const useStyles = makeStyles({
    imagePreview: props => ({
        width: props.width,
        height: props.height,
        position: 'relative',
        margin: '1rem 0',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: props.objectFit
        }
    }),
    clearButton: {
        position: 'absolute',
        width: 30,
        height: 30,
        top: 2,
        right: 2
    },
});

const ImagePreview = ({
    width = 300,
    height = 300,
    objectFit = 'contain',
    previewUrl,
    handleCancel,
    enableCancelButton = false

}) => {
    const classes = useStyles({
        width: width,
        height: height,
        objectFit: objectFit,
    });

    console.log(classes);

    return (
        <div className={classes.imagePreview}>
            {
                enableCancelButton
                    ? <IconButton aria-label="キャンセル" className={classes.clearButton} onClick={handleCancel}>
                        <Cancel fontSize="large" />
                    </IconButton>
                    : null
            }
            <img src={previewUrl ? previewUrl : NoImage} />
        </div>
    )
}

export default ImagePreview
