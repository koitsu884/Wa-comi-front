import React from 'react'
import { Paper, makeStyles, Avatar, Box, colors } from '@material-ui/core';
import UserAvatar from '../common/UserAvatar';
import ReplyList from './ReplyList';

const useStyle = makeStyles({
    root: {
        padding: '.5rem',
        transition: '2s',
    },
    commentBox: {
        borderRadius: '10px',
        padding: '1rem',
        backgroundColor: colors.cyan[50],
    }
})

const CommentBox = ({ comment }) => {
    const classes = useStyle();

    return (
        <Paper className={classes.root} variant="outlined" >
            <Box display={'flex'} alignItems={'center'}>
                <UserAvatar user={comment.user} />
                <Box flexGrow={1} ml={1} padding={1}>
                    <div className={classes.commentBox}>{comment.comment}</div>
                </Box>
            </Box>
            <ReplyList commentId={comment.id} replyCount={comment.replies_count} />
        </Paper>
    )
}

export default CommentBox
