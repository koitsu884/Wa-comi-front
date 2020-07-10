import React from 'react';
import { Box, makeStyles, colors } from '@material-ui/core'
import UserAvatar from '../common/UserAvatar'


const useStyle = makeStyles({
    commentBox: {
        borderRadius: '10px',
        padding: '1rem',
        backgroundColor: colors.lightGreen[50],
    }
})
const ReplyBox = ({ reply }) => {
    const classes = useStyle();

    return (
        <Box display={'flex'} alignItems={'center'}>
            <UserAvatar user={reply.user} />
            <Box flexGrow={1} ml={1} padding={1}>
                <div className={classes.commentBox}>{reply.reply}</div>
            </Box>
        </Box>
    )
}

export default ReplyBox
