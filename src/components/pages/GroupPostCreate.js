import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Breadcrumbs, Link as MiLink, Typography, Box, } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSubmitFormWithImages } from '../../hooks/useSubmitFormWithImages';
import { addGroupPost } from '../../api/group';
import Alert from '../../utils/alert';
import history from '../../history';
import { GROUP_POST_PHOTO_SIZE } from '../../constants/groups';
import MultipleImageSelector from '../common/MultipleImageSelector';
import GroupPostEditForm from '../groupPosts/GroupPostEditForm';
import { getGroupPosts } from '../../actions/manageGroupActions';

const GroupPostCreate = (props) => {
    const { slug } = props.match.params;
    const currentUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
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

        let result = await submitFormData(submitedData, (fd) => addGroupPost(slug, fd));

        if (result) {
            if (selectedFiles.length > 0) {
                var newPostId = result.data.data.id;
                let imageUploadUrl = `/groups/${slug}/posts/${newPostId}/images`;
                //File upload
                await uploadImages(imageUploadUrl, selectedFiles, GROUP_POST_PHOTO_SIZE);
            }

            Alert.success("投稿しました");
            dispatch(getGroupPosts(slug));
            history.push(`/mypage/group/${slug}`);
        }
    }

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <MiLink component={Link} to={`/mypage/group`}>
                    グループ管理
                </MiLink>
                <MiLink component={Link} to={`/mypage/group/${slug}`}>
                    {slug} 編集
                </MiLink>
                <Typography color="textPrimary">活動記録投稿</Typography>
            </Breadcrumbs>
            <Container style={{ minHeight: '80vh' }}>
                <h1>活動記録新規投稿</h1>
                <Box p={2} minWidth={400}>
                    <MultipleImageSelector onImagesSelected={handleImageSelect} maxNum={5} />
                </Box>
                <GroupPostEditForm onSubmit={handleSubmit} />
            </Container>
        </Fragment>
    )
}

export default GroupPostCreate
