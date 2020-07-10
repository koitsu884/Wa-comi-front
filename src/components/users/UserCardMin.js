import React from 'react'
import { Paper, Box } from '@material-ui/core'
import UserAvatar from '../common/UserAvatar'
import UserInfoBox from './UserInfoBox'

const UserCardMin = ({ user }) => {
    return (
        <Paper variant="outlined" display="inline-block">
            <UserInfoBox user={user} />
        </Paper>
    )
}

export default UserCardMin
