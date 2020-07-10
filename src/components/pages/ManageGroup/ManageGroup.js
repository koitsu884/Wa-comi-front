import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Breadcrumbs, Link as MiLink, Typography } from '@material-ui/core'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ManageMember from './ManageMember';
import ManageGroupPost from './ManageGroupPost';
import Spinner from '../../common/Spinner';
import GroupEditPanel from './GroupEditPanel';
import { getGroupRelatingData, clearManageGroup } from '../../../actions/manageGroupActions';
import { Link } from 'react-router-dom';

const ManageGroup = (props) => {
    const slug = props.match.params.slug;
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.common.loading);
    const groupDetails = useSelector(state => state.manageGroup.groupDetails);

    useEffect(() => {
        dispatch(getGroupRelatingData(slug));
        return function cleanup() {
            dispatch(clearManageGroup());
        }
    }, [dispatch, slug])

    const isGroupOwner = currentUser && groupDetails && (currentUser.id === groupDetails.user_id);

    return (
        <Container>
            {loading ? <Spinner fixed={true} /> : null}
            <Breadcrumbs aria-label="breadcrumb">
                <MiLink component={Link} to={`/mypage/group`}>
                    グループ管理
                </MiLink>
                <Typography color="textPrimary">{groupDetails?.name} 編集</Typography>
            </Breadcrumbs>
            <Box p={5} mx="auto">
                <Tabs>
                    <TabList>
                        {
                            isGroupOwner ? <Tab>グループ編集</Tab> : null
                        }
                        <Tab>メンバー管理</Tab>
                        <Tab>活動記録管理</Tab>
                    </TabList>
                    {
                        isGroupOwner ?
                            <TabPanel>
                                <GroupEditPanel />
                            </TabPanel>
                            : null
                    }
                    <TabPanel>
                        <ManageMember />
                    </TabPanel>
                    <TabPanel>
                        <ManageGroupPost />
                    </TabPanel>
                </Tabs>
            </Box>
        </Container>
    )
}

export default ManageGroup
