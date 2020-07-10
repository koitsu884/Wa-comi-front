import React from 'react'
import { Avatar } from '@material-ui/core'

const UserAvatar = ({ user }) => {
    return user.avatar
        ? <Avatar src={user.avatar.url} />
        : <Avatar>{user.name.charAt(0)}</Avatar>
}

export default UserAvatar
