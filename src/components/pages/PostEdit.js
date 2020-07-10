import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import client from '../../utils/client';
import { Container, Box } from '@material-ui/core';
import history from '../../history';
import Alert from '../../utils/alert';
import Spinner from '../common/Spinner';
import { SET_ERRORS, CLEAR_ERRORS } from '../../actions/types';
import PostEditForm from '../posts/PostEditForm';
import MultipleImageEditor from '../common/MultipleImageEditor';
import { POST_PHOTO_LIMIT, POST_PHOTO_SIZE } from '../../constants/posts';

const PostEdit = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [postDetails, setDetails] = useState(null);

    useEffect(() => {
        if (!id) {
            console.log("ID must be set");
            history.push('/');
            return;
        }

        setLoading(true);
        client.get('/posts/' + id)
            .then(res => {
                let postData = res.data.data;

                if (postData.user_id !== currentUser.id) {
                    history.push('/');
                    Alert.error("投稿を編集する権限がありません");
                    return;
                }
                setDetails(postData);
            })
            .catch(error => {
                Alert.error("投稿データの取得に失敗しました");
                history.push('/');
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [id, currentUser.id])

    const handleSubmit = async submitedData => {
        console.log(submitedData);

        setLoading(true);

        let fd = new FormData();

        fd.append('_method', 'PATCH');
        for (var dataKey in submitedData) {
            let data = submitedData[dataKey];
            switch (dataKey) {
                default:
                    fd.append(dataKey, data ? data : '');
            }
        }

        try {
            let url = `/posts/${id}`;
            await client.post(url, fd);
            Alert.success("更新しました");
            setLoading(false);
            dispatch({
                type: CLEAR_ERRORS,
            })
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
            return;
        }

        //history.push('/post');
    }


    return (
        <Container style={{ minHeight: '80vh' }}>
            {
                loading ? <Spinner cover={true} /> : null
            }

            <h1>友達募集　編集</h1>
            <Box>
                <h2>画像編集</h2>
                <Box p={2} minWidth={400}>
                    <MultipleImageEditor
                        apiRoot={`/posts/${id}/images`}
                        limit={POST_PHOTO_LIMIT}
                        maxSize={POST_PHOTO_SIZE}
                    />
                </Box>
                <h2>内容編集</h2>
                <PostEditForm editMode={true} initialData={postDetails} onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default PostEdit
