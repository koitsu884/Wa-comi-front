import React, { useEffect } from 'react';
import { Container, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { deleteGroup, getMyGroups } from '../../actions/userActions';
import Alert from '../../utils/alert';
import MyGroupCard from './MyGroup/MyGroupCard';
import SupportGroupCard from './MyGroup/SupportGroupCard';

const MyGroup = () => {
    const currentUser = useSelector(state => state.auth.user);
    const myGroups = useSelector(state => state.user.myGroups);
    const supportGroups = useSelector(state => state.user.supportGroups);
    const followGroups = useSelector(state => state.user.followGroups);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getMyGroups(currentUser.id));
        }
    }, [dispatch, currentUser])

    const handleDelete = (slug) => {
        Alert.confirm("このグループを削除しますか？")
            .then((result) => {
                if (result.value) {
                    dispatch(deleteGroup(slug));
                }
            })
    }

    return (
        <Container style={{ minHeight: '80vh' }}>
            <h2>管理グループ</h2>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">

                {
                    myGroups.length > 0
                        ? myGroups.map(group => (
                            <Box m={1} key={group.slug}>
                                <MyGroupCard group={group} onDelete={() => handleDelete(group.slug)} />
                            </Box>
                        ))
                        : <div>投稿がありません</div>
                }
            </Box>
            <h2>サポートグループ</h2>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {
                    supportGroups.length > 0
                        ? supportGroups.map(group => (
                            <Box m={1} key={group.slug}>
                                <SupportGroupCard group={group} />
                            </Box>
                        ))
                        : <div>投稿がありません</div>
                }
            </Box>
            <h2>フォロー中のグループ</h2>
        </Container>
    )
}

export default MyGroup
