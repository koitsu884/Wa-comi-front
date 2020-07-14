import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import { getMyPosts } from '../../actions/userActions';
import history from '../../history';
import Alert from '../../utils/alert';
import MultipleImageSelector from '../common/MultipleImageSelector';
import PostEditForm from '../posts/PostEditForm';
import { POST_PHOTO_SIZE } from '../../constants/posts';
import { addNewPost } from '../../api/post';
import { useSubmitFormWithImages } from '../../hooks/useSubmitFormWithImages';

const PostCreate = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const [selectedFiles, setFiles] = useState([]);
    const [uploadImages, submitFormData] = useSubmitFormWithImages();

    const handleImageSelect = selectedFiles => {
        setFiles(selectedFiles);
    }

    const handleSubmit = async submitedData => {
        if (!currentUser) {
            console.log("Current user must be set");
            return;
        }

        let result = await submitFormData(submitedData, addNewPost);

        if (result) {
            if (selectedFiles.length > 0) {
                var newPostId = result.data.data.id;
                let imageUploadUrl = `/posts/${newPostId}/images`;
                //File upload
                await uploadImages(imageUploadUrl, selectedFiles, POST_PHOTO_SIZE);
            }

            Alert.success("投稿しました");
            dispatch(getMyPosts(currentUser.id));
            history.push('/post');
        }
    }


    return (
        <Container style={{ minHeight: '80vh' }}>
            <h1>友達募集　新規投稿</h1>
            <Box>
                <Box p={2} minWidth={400}>
                    <MultipleImageSelector onImagesSelected={handleImageSelect} maxNum={5} />
                </Box>
                <PostEditForm editMode={false} onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default PostCreate
