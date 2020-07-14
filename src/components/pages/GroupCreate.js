import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box } from '@material-ui/core';
import { getMyGroups } from '../../actions/userActions';
import history from '../../history';
import Alert from '../../utils/alert';
import MultipleImageSelector from '../common/MultipleImageSelector';
import { GROUP_PHOTO_SIZE } from '../../constants/groups';
import GroupEditForm from '../groups/GroupEditForm';
import { useSubmitFormWithImages } from '../../hooks/useSubmitFormWithImages';
import { addNewGroup } from '../../api/group';

const GroupCreate = (props) => {
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

        let result = await submitFormData(submitedData, addNewGroup);

        if (result) {
            if (selectedFiles.length > 0) {
                var newGroupSlug = result.data.data.slug;
                let imageUploadUrl = `/groups/${newGroupSlug}/images`;
                //File upload
                await uploadImages(imageUploadUrl, selectedFiles, GROUP_PHOTO_SIZE);
            }

            Alert.success("投稿しました");
            dispatch(getMyGroups(currentUser.id));
            history.push('/group');
        }
    }


    return (
        <Container style={{ minHeight: '80vh' }}>
            <h1>新規グループ投稿</h1>
            <Box>
                <Box p={2} minWidth={400}>
                    <MultipleImageSelector onImagesSelected={handleImageSelect} maxNum={5} />
                </Box>
                <GroupEditForm editMode={false} onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default GroupCreate
