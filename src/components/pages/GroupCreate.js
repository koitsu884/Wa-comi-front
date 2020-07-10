import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import client from '../../utils/client';
import { Container, Box } from '@material-ui/core';
import { getMyGroups } from '../../actions/userActions';
import history from '../../history';
import Alert from '../../utils/alert';
import Spinner from '../common/Spinner';
import { resizeFile } from '../../utils/imageManager';
import MultipleImageSelector from '../common/MultipleImageSelector';
import ModalMessage from '../common/ModalMessage';
import { GROUP_PHOTO_SIZE } from '../../constants/groups';
import GroupEditForm from '../groups/GroupEditForm';
import { setFormErrors, clearFormErrors } from '../../actions/formActions';

const GroupCreate = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);
    const [selectedFiles, setFiles] = useState([]);

    useEffect(() => {
        return function cleanup() {
            dispatch(clearFormErrors());
        }
    }, [dispatch])

    const handleImageSelect = selectedFiles => {
        setFiles(selectedFiles);
    }

    const updateGroup = async (url, fd) => {
        await client.put(url, fd, {
            headers: { 'content-type': 'multipart/form-data' }
        });
        Alert.success("更新しました");
    }

    const uploadImages = async (url, files) => {
        let cnt = 1;
        for (var file of files) {
            let fd = new FormData();
            let resizedFile;
            try {
                setModalMessage(`${cnt++}つ目の画像をアップロード中です`);
                resizedFile = await resizeFile(file, GROUP_PHOTO_SIZE, file.name);
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
            var newGroupSlug = result.data.data.slug;
            let imageUploadUrl = `/groups/${newGroupSlug}/images`;
            //File upload
            await uploadImages(imageUploadUrl, selectedFiles);
        }

        Alert.success("投稿しました");
        dispatch(getMyGroups(currentUser.id));
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
            fd.append(dataKey, data ? data : '');
        }

        try {
            if (id) {
                let url = `/groups/${id}`;
                await updateGroup(url, fd);
            }
            else {
                let url = '/groups';
                await addNewPost(url, fd);
            }

            setLoading(false);
            setModalMessage(null);
        }
        catch (error) {
            let formErrors = error.response.data.errors;
            if (formErrors) {
                // console.log(formErrors);
                dispatch(setFormErrors(formErrors))
            }
            setLoading(false);
            setModalMessage(null);
            return;
        }

        history.push('/group');
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

            <h1>新規グループ投稿</h1>
            <Box>
                <Box p={2} minWidth={400}>
                    {
                        id ?
                            null :
                            <MultipleImageSelector onImagesSelected={handleImageSelect} maxNum={5} />
                    }
                </Box>
                <GroupEditForm editMode={false} onSubmit={handleSubmit} />
            </Box>
        </Container>
    )
}

export default GroupCreate
