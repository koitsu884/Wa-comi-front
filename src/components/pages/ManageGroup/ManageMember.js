import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '../../../utils/alert';
import UserCardMin from '../../users/UserCardMin';
import { Box, Paper, IconButton } from '@material-ui/core';
import UserCard from '../../users/UserCard';
import UserInfoBox from '../../users/UserInfoBox';
import getInvitationStatusStr from '../../../utils/getInvitationStatusStr';
import { Delete } from '@material-ui/icons';
import { deleteGroupInvitation } from '../../../actions/manageGroupActions';
import InviteMember from './InviteMember';

const ManageMember = () => {
    const dispatch = useDispatch();
    const groupDetails = useSelector(state => state.manageGroup.groupDetails);
    const supportMembers = useSelector(state => state.manageGroup.supportMembers);
    const invitations = useSelector(state => state.manageGroup.groupInvitations);

    const handleDeleteInvitation = id => {
        Alert.confirm("このユーザーへの招待をキャンセルしますか？")
            .then(result => {
                if (result.value) {
                    dispatch(deleteGroupInvitation(groupDetails.slug, id));
                }
            });
    }

    const InvitedMemberList = () => {
        if (!invitations || invitations.length === 0)
            return <Fragment />;

        return (
            <Box display="flex" flexWrap="wrap">
                {
                    invitations.map(invitation => (
                        <Box key={invitation.id} m={1} p={1}>
                            <Paper variant="outlined" display="inline-block">
                                <UserInfoBox user={invitation.invited_user} />
                                <Box p={1}>
                                    <div>状態: {getInvitationStatusStr(invitation.status)} </div>
                                    <div>招待したユーザー: {invitation.user ? invitation.user.name : "削除されたユーザー"}</div>
                                    <div>招待日: {invitation.created_at}</div>
                                    <IconButton onClick={() => handleDeleteInvitation(invitation.id)}><Delete /></IconButton>
                                </Box>
                            </Paper>
                        </Box>
                    ))
                }
            </Box>
        );
    }

    return (
        <div>
            <h1>メンバー管理</h1>
            <section>

                <h2>管理者</h2>
                {
                    groupDetails ? <UserCard user={groupDetails.user} /> : null
                }
            </section>
            <section>

                <h2>サポートメンバー</h2>
                {
                    supportMembers.map(member => (
                        <Box key={member.id} display="flex" flexWrap="wrap">
                            <Box m={1}>
                                <UserCardMin user={member} />
                            </Box>
                        </Box>
                    ))
                }
                <h4>招待中のメンバー</h4>
                <InvitedMemberList />
                <h4>メンバーを招待する</h4>
                <InviteMember />

            </section>
        </div>
    )
}

export default ManageMember
