import React, { useState } from 'react'
import Alert from '../../../utils/alert';
import { useDispatch, useSelector } from 'react-redux';
import { addGroupInvitation } from '../../../actions/manageGroupActions';
import UserSearchBox from '../../common/UserSearchBox';
import { Box, Button } from '@material-ui/core';
import UserAvatar from '../../common/UserAvatar';

const InviteMember = () => {
    const dispatch = useDispatch();
    const [userList, setUserList] = useState(null);
    const groupDetails = useSelector(state => state.manageGroup.groupDetails);
    const supportMemberIds = useSelector(state => state.manageGroup.supportMembers)
        .map(member => member.id);
    const invitedUserIds = useSelector(state => state.manageGroup.groupInvitations)
        .map(invitation => invitation.invited_user_id);



    const handleSelectUser = user => {
        if (user) {
            Alert.confirm("このユーザーをグループに招待しますか？")
                .then(result => {
                    if (result.value) {
                        dispatch(addGroupInvitation(groupDetails.slug, user.id));
                        //console.log("ここでInvitation作成 for " + userFound.name);
                    }
                });
        }
    }

    const handleSearch = result => {
        setUserList(result);
    }

    const SearchResult = () => {
        if (!userList) return null;

        return (
            <Box borderRadius={5} display='flex' flexWrap='wrap' bgcolor="lightyellow" >
                {
                    userList.length === 0
                        ? <p>Not found</p>
                        : userList.map(user => {
                            let disabledText = null;
                            if (supportMemberIds.includes(user.id)) {
                                disabledText = '既存メンバーです';
                            }
                            else if (invitedUserIds.includes(user.id)) {
                                disabledText = '招待済みです';
                            }

                            return (
                                <Box key={user.id} m={1}>
                                    <Button
                                        key={user.id}
                                        onClick={() => handleSelectUser(user)}
                                        display='flex'
                                        disabled={disabledText !== null}
                                        m={1}
                                    >
                                        <UserAvatar user={user} /><Box ml={1}>{user.name}</Box>
                                    </Button>
                                    {
                                        disabledText !== null ? <Box color="error.main">{disabledText}</Box> : null
                                    }
                                </Box>
                            )
                        })
                }
            </Box>
        )
    }

    return (
        <div>
            <UserSearchBox onSearch={handleSearch} />
            <SearchResult />
        </div>
    )
}

export default InviteMember
