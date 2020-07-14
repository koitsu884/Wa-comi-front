import React, { Fragment, useEffect, useState } from 'react'
import { Container, Breadcrumbs, Link as MiLink, Typography, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import GroupPostEditForm from '../groupPosts/GroupPostEditForm';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateApiForm } from '../../hooks/useUpdateApiForm';
import { updateGroupPost, getGroupPostDetails } from '../../api/group';
import Alert from '../../utils/alert';
import { setLoading } from '../../actions/commonActions';
import history from '../../history';
import MultipleImageEditor from '../common/MultipleImageEditor';
import { GROUP_POST_PHOTO_SIZE, GROUP_PHOTO_LIMIT } from '../../constants/groups';

const GroupPostEdit = (props) => {
    const { slug, id } = props.match.params;
    const [groupPostDetails, setGroupPostDetails] = useState(null);
    const currentUser = useSelector(state => state.auth.user);
    const [submitFormData] = useUpdateApiForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        getGroupPostDetails(slug, id)
            .then(res => {
                setGroupPostDetails(res.data.data);
            })
            .catch(error => {
                Alert.error("活動記録の取得に失敗しました。<br/>時間を置いてから再度アクセスしてみてください。");
                history.push('/');
                console.log(error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            })
    }, [id, slug, dispatch])

    const handleSubmit = async submitedData => {
        if (!currentUser) {
            console.log("Current user must be set");
            return;
        }

        let result = await submitFormData(id, submitedData, (_id, fd) => updateGroupPost(slug, _id, fd));
        if (result) {
            Alert.success("更新しました");
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
                <Typography color="textPrimary">活動記録編集</Typography>
            </Breadcrumbs>
            <Container style={{ minHeight: '80vh' }}>
                <h1>活動記録編集</h1>
                <h2>画像編集</h2>
                <Box p={2} minWidth={400}>
                    <MultipleImageEditor
                        apiRoot={`/groups/${slug}/posts/${id}/images`}
                        limit={GROUP_PHOTO_LIMIT}
                        maxSize={GROUP_POST_PHOTO_SIZE}
                    />
                </Box>
                <h2>内容編集</h2>
                <GroupPostEditForm editMode={true} initialData={groupPostDetails} onSubmit={handleSubmit} />
            </Container>
        </Fragment>
    )
}

export default GroupPostEdit
