import React, { useRef, Fragment } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { Delete, AddPhotoAlternateSharp, Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles';
import ImagePreview from './ImagePreview';
import { validateImage, resizeFile } from '../../utils/imageManager';
import Alert from '../../utils/alert';

const useStyles = makeStyles({
    root: {
        position: 'relative'
    },
    deleteButton: {
        position: 'absolute',
        left: '10rem',
        bottom: '0rem',
        fontSize: '4rem',
        backgroundColor: 'rgba(0,0,0,.7)',
        color: 'red',
        zIndex: 10,
    },
    editButton: {
        position: 'absolute',
        left: '4rem',
        bottom: '0rem',
        fontSize: '4rem',
        backgroundColor: 'rgba(0,0,0,.7)',
        color: 'lightblue',
        zIndex: 10,
    },
    uploadButton: {
        position: 'absolute',
        left: '7rem',
        top: '7rem',
        color: 'lightgreen',
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 10,
    }
});

const SingleImageUploader = ({ onFileChange, onDelete, maxSize = 800, initialImage = null }) => {
    const inputFile = useRef(null);
    const classes = useStyles();

    const handleFileChange = async (e) => {
        let file = e.target.files[0];

        if (!validateImage(file)) {
            Alert.error("対応していないファイルタイプです");
            // setPreviewUrl(null);
            return;
        }

        let fd = new FormData();
        let resizedFile = await resizeFile(file, maxSize, file.name);
        fd.append('image', resizedFile, resizedFile.name);

        onFileChange(fd);
    }

    const handleFileUpload = () => {
        inputFile.current.click();
    }

    const handleEdit = () => {
        inputFile.current.click();
    }

    const handleDelete = () => {
        onDelete()
    }

    const renderActionButton = () => {
        return initialImage
            ? (
                <Fragment >
                    <IconButton className={classes.editButton} onClick={handleEdit}><Edit /></IconButton>
                    <IconButton className={classes.deleteButton} onClick={handleDelete}><Delete /></IconButton>
                </Fragment>
            )
            :   <IconButton className={classes.uploadButton} onClick={handleFileUpload}><AddPhotoAlternateSharp style={{ fontSize: 40 }} /></IconButton>;
    }

    return (
        <Box className={classes.root}>
            {renderActionButton()}
            <ImagePreview previewUrl={initialImage ? initialImage.url : null} enableCancelButton={false} objectFit={'cover'}/>

            <input
                type="file"
                id="singleImageUploader"
                ref={inputFile}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </Box>
    )
}

export default SingleImageUploader
