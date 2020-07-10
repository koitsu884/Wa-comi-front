import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, IconButton, Button, Box, colors } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import client from '../../utils/client';
import Alert from '../../utils/alert';
import { validateImage, resizeFile } from '../../utils/imageManager';
import Spinner from './Spinner';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    boxRoot: {
        margin: '1rem 2rem',
        minWidth: '20rem',
        minHeight: '20rem'
    },
    editImageBox: {
        padding: '1rem',
        backgroundColor: colors.teal[50],
        borderRadius: '5px',
    },
    mainImage: {
        border: 'solid 2px red',
    },
    addImageBox: {
        border: `dotted 3px ${theme.palette.primary.light}`,
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.6rem',
        '&:hover': {
            backgroundColor: colors.teal[50],
        }
    },
    imageContainer: {
        margin: '1rem',
        padding: '5px',
        width: '18rem',
        height: '18rem',
        borderRadius: '3px',
        backgroundColor: 'black',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        }
    },
}));

const MultipleImageEditor = ({
    apiRoot,
    maxSize = 800,
    limit = 5,
    onMainImageChange = () => { }
}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const classes = useStyle();
    const inputFile = useRef(null);

    useEffect(() => {
        //Get all photos relating the record
        setLoading(true);
        client.get(apiRoot)
            .then(res => {
                setImages(res.data.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [apiRoot])

    const handleDelete = id => {
        Alert.confirm("この画像を削除しますか？")
            .then(result => {
                if (result.value) {
                    setUpdating(true);
                    client.delete(apiRoot + '/' + id)
                        .then(res => {
                            setImages(images.filter(image => image.id !== id));
                            onMainImageChange();
                        })
                        .catch(error => {
                            console.log(error);
                            Alert.error(error.response.data);
                        })
                        .finally(() => {
                            setUpdating(false);
                        })
                }
            })
    }

    const handleAddImageClick = () => {
        inputFile.current.click();
    }

    const handleFileChange = async (e) => {
        let file = e.target.files[0];

        if (!validateImage(file)) {
            Alert.error("対応していないファイルタイプです");
            return;
        }

        let fd = new FormData();
        let resizedFile = await resizeFile(file, maxSize, file.name);
        fd.append('image', resizedFile, resizedFile.name);

        setUpdating(true);
        client.post(apiRoot, fd)
            .then(res => {
                setImages([...images, res.data.data]);
                onMainImageChange();
            })
            .catch(error => {
                console.log(error);
                Alert.error(error.response.data);
            })
            .finally(() => {
                setUpdating(false);
            })
    }

    const handleSetMainImage = (id) => {
        let fd = new FormData();
        fd.append('_method', 'PATCH');

        setUpdating(true);
        client.post(`${apiRoot}/${id}/setmain`, fd)
            .then(res => {
                let tempImages = [...images];
                tempImages.forEach(image => {
                    image.is_main = image.id === id;
                });
                setImages(tempImages);
                onMainImageChange();
            })
            .catch(error => {
                console.log(error);
                Alert.error(error.response.data);
            })
            .finally(() => {
                setUpdating(false);
            })
    }

    const renderImages = () => {
        return images.map((image) => {
            return (
                <div key={image.id} className={`${classes.boxRoot} ${classes.editImageBox} ${image.is_main ? classes.mainImage : ''}`} >
                    <div className={classes.imageContainer}>
                        <img src={image.url} alt={''} />
                    </div>
                    <Box textAlign='center'>
                        <Button onClick={() => handleSetMainImage(image.id)} variant="contained" color="primary" disabled={image.is_main ? true : false}>
                            メイン画像に設定
                        </Button>
                        <IconButton
                            onClick={() => handleDelete(image.id)}>
                            <Delete fontSize='large' color='error' />
                        </IconButton>
                    </Box>
                </div >
            )
        })
    }

    return (
        <div className={classes.root}>
            {
                loading
                    ? <div className={classes.boxRoot}><Spinner /></div>
                    : renderImages()
            }
            {
                updating ? <Spinner fixed={true} /> : null
            }
            {
                !loading && images.length < limit
                    ? <div className={`${classes.boxRoot} ${classes.addImageBox}`} onClick={handleAddImageClick}>
                        画像を追加
                        <input
                            type="file"
                            id="multiImageEditorInput"
                            ref={inputFile}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    : null
            }
        </div>
    )
}

export default MultipleImageEditor
