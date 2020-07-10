import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { makeStyles, IconButton } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

import Alert from '../../utils/alert';

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    dropZone: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        height: '15rem',
        minHeight: '9rem',
        border: 'dashed 2px blue',
        backgroundColor: '#F5F5F5',

    },
    preview: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    previewItem: {
        overflow: 'hidden',
        width: '15rem',
        height: '15rem',
        margin: '1rem',
        position: 'relative',
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block'
        }
    },
    deleteButton: {
        position: 'absolute',
        width: '2rem',
        height: '2rem',
        right: '.5rem',
        top: '.5rem',
        backgroundColor: 'gainsboro',
        '&:hover': {
            backgroundColor: 'white',
        }
    }
});

function MultipleImageSelector(props) {
    const classes = useStyles();
    const [selectedFiles, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        // multiple: props.multiple,
        onDrop: acceptedFiles => {
            let maxNum = props.maxNum ? props.maxNum : 5;
            // let maxSize = props.maxSize ? props.maxSize : 800;
            if (acceptedFiles.length + selectedFiles.length > maxNum) {
                Alert.error(`アップロードできる画像は${maxNum}個までです`)
                return;
            }

            let newFiles = [];

            acceptedFiles.forEach(file => {
                newFiles.push({
                    data: file,
                    preview: URL.createObjectURL(file)
                });
            })

            newFiles = selectedFiles.concat(newFiles);

            newFiles.forEach((file, index) => {
                file.key = `photo_${index}.${file.data.name.substr(file.data.name.lastIndexOf('.') + 1)}`;
            })

            setFiles(newFiles);

            //Callback function
            props.onImagesSelected(newFiles.map(file => file.data));
        }
    });

    const removeFile = key => {
        let removingFile = selectedFiles.find(file => file.key === key);
        if (!removingFile) return;

        let updatedFiles = selectedFiles.filter(value => value.key !== key)
        setFiles(updatedFiles);
        props.onImagesSelected(updatedFiles.map(updateFile => updateFile.data));
        URL.revokeObjectURL(removingFile.preview);
    }

    const thumbs = selectedFiles.map((file) => (
        <div className={classes.previewItem} key={file.key}>
            <img
                src={file.preview}
                alt="preview"
            />
            <IconButton aria-label="キャンセル"
                className={classes.deleteButton}
                onClick={() => removeFile(file.key)}
            >
                <Cancel fontSize="large" />
            </IconButton>
        </div>
    ));

    useEffect(() => {
        return () => {
            selectedFiles.forEach(data => URL.revokeObjectURL(data.preview))
        }
    }, [selectedFiles])

    return (
        <div className={classes.root}>
            <div {...getRootProps({ className: classes.dropZone })}>
                <input {...getInputProps()} />
                <p>クリックして画像を選択<br />（あるいはここにファイルをドロップ）</p>
            </div>
            <aside className={classes.preview}>
                {thumbs}
            </aside>
        </div>
    );
}

MultipleImageSelector.propTypes = {
    onImagesSelected: PropTypes.func,
    maxNum: PropTypes.number
}

export default MultipleImageSelector;