import React from 'react'
import { Container, Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import MultipleImageEditor from '../../common/MultipleImageEditor'
import { GROUP_PHOTO_LIMIT, GROUP_PHOTO_SIZE } from '../../../constants/groups'
import GroupEditForm from '../../groups/GroupEditForm';
import { updateGroup } from '../../../actions/manageGroupActions'

const GroupEditPanel = () => {
    const dispatch = useDispatch();
    const groupDetails = useSelector(state => state.manageGroup.groupDetails);

    const handleSubmit = async submitedData => {
        dispatch(updateGroup(groupDetails.slug, submitedData));
    }

    const renderForms = () => (
        <Box>
            <Box p={2} minWidth={400}>
                <MultipleImageEditor
                    apiRoot={`/groups/${groupDetails.slug}/images`}
                    limit={GROUP_PHOTO_LIMIT}
                    maxSize={GROUP_PHOTO_SIZE}
                />
            </Box>
            <GroupEditForm editMode={true} initialData={groupDetails} onSubmit={handleSubmit} />
        </Box>
    );

    return (
        <Container style={{ minHeight: '80vh' }}>
            <h1>グループ情報編集</h1>
            {
                groupDetails ? renderForms() : <div>Loading...</div>
            }
        </Container>
    )
}

export default React.memo(GroupEditPanel)
