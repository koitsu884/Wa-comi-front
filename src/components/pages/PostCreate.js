import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import client from '../../utils/client';
import { Container, Box } from '@material-ui/core';
import { getMyPosts } from '../../actions/userActions';
import history from '../../history';
import Alert from '../../utils/alert';
import Spinner from '../common/Spinner';
import { resizeFile } from '../../utils/imageManager';
import { SET_ERRORS } from '../../actions/types';
import MultipleImageSelector from '../common/MultipleImageSelector';
import ModalMessage from '../common/ModalMessage';
import PostEditForm from '../posts/PostEditForm';
import { POST_PHOTO_SIZE } from '../../constants/posts';

const PostCreate = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);
    const [selectedFiles, setFiles] = useState([]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            client.get('/posts/' + id)
                .then(res => {
                    let postData = res.data.data;

                    if (postData.user_id !== currentUser.id) {
                        history.push('/');
                        Alert.error("投稿を編集する権限がありません");
                        return;
                    }
                    //  setDetails(postData);
                })
                .catch(error => {
                    // Alert.error("投稿データの取得に失敗しました");
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [id, currentUser.id])

    const handleImageSelect = selectedFiles => {
        setFiles(selectedFiles);
    }

    const updatePost = async (url, fd) => {
        await client.put(url, fd, {
            headers: { 'content-type': 'multipart/form-data' }
        });
        Alert.success("更新しました");
    }

    const uploadImages = async (url, files) => {
        for (var file of files) {
            let fd = new FormData();
            let resizedFile;
            try {
                resizedFile = await resizeFile(file, POST_PHOTO_SIZE, file.name);
                fd.append('image', resizedFile, resizedFile.name);
                await client.post(url, fd);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const addNewPost = async (url, fd) => {
        var result = await client.post(url, fd, {
            headers: { 'content-type': 'multipart/form-data' }
        });

        if (selectedFiles.length > 0) {
            setModalMessage("画像をアップロード中です");
            var newPostId = result.data.data.id;
            let imageUploadUrl = `/posts/${newPostId}/images`;
            //File upload
            await uploadImages(imageUploadUrl, selectedFiles);
        }

        Alert.success("投稿しました");
        dispatch(getMyPosts(currentUser.id));
    }

    const handleSubmit = async submitedData => {
        console.log(submitedData);

        if (!currentUser) {
            console.log("Current user must be set");
            return;
        }

        setLoading(true);
        setModalMessage("投稿内容をアップロード中です");

        let fd = new FormData();

        for (var dataKey in submitedData) {
            let data = submitedData[dataKey];
            switch (dataKey) {
                default:
                    fd.append(dataKey, data ? data : '');
            }
        }

        try {
            if (id) {
                let url = `/posts/${id}`;
                await updatePost(url, fd);
            }
            else {
                let url = '/posts';
                await addNewPost(url, fd);
            }

            setLoading(false);
            setModalMessage(null);
        }
        catch (error) {
            let formErrors = error.response.data.errors;
            if (formErrors) {
                // console.log(formErrors);
                dispatch({
                    type: SET_ERRORS,
                    payload: formErrors
                })
            }
            setLoading(false);
            setModalMessage(null);
            return;
        }

        history.push('/post');
    }


    return (
        <Container style={{ minHeight: '80vh' }}>
            {
                loading ? <Spinner cover={true} /> : null
            }
            <ModalMessage
                open={modalMessage !== null}
                message={modalMessage}
            />

            <h1>友達募集　新規投稿</h1>
            <Box>
                <Box p={2} minWidth={400}>
                    {
                        id ?
                            null :
                            <MultipleImageSelector onImagesSelected={handleImageSelect} maxNum={5} />
                    }
                </Box>
                <PostEditForm editMode={false} onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default PostCreate
