import React from 'react'
import { Box } from '@material-ui/core'
import UserAvatar from '../common/UserAvatar'

const UserInfoBox = ({ user }) => {
    return (
        <Box display="flex" p={2} alignItems="center">
            <UserAvatar user={user} />
            <Box ml={1}>{user.name}</Box>
        </Box>
    )
}

export default UserInfoBox
