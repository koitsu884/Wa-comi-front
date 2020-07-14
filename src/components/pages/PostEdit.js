import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import history from '../../history';
import Alert from '../../utils/alert';
import PostEditForm from '../posts/PostEditForm';
import MultipleImageEditor from '../common/MultipleImageEditor';
import { POST_PHOTO_LIMIT, POST_PHOTO_SIZE } from '../../constants/posts';
import { setLoading } from '../../actions/commonActions';
import { getPostDetails, updatePost } from '../../api/post';
import { useUpdateApiForm } from '../../hooks/useUpdateApiForm';

const PostEdit = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const [postDetails, setDetails] = useState(null);
    const [submitFormData] = useUpdateApiForm();

    useEffect(() => {
        dispatch(setLoading(true));
        getPostDetails(id)
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
                dispatch(setLoading(false));
            })

    }, [id, dispatch, currentUser.id])

    const handleSubmit = async submitedData => {
        let result = await submitFormData(id, submitedData, updatePost);
        if (result) {
            Alert.success("更新しました");
        }
    }


    return (
        <Container style={{ minHeight: '80vh' }}>
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
