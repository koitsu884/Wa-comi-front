import React from 'react'
import CommentBox from './CommentBox'
import { Box } from '@material-ui/core';

const CommentList = ({ commentList }) => {
    if (!commentList || commentList.length === 0) return <div>No data</div>;

    return (
        <div>
            {
                commentList.map(comment => <Box key={comment.id} m={2}><CommentBox comment={comment} /></Box>)
            }
        </div>
    )
}

export default CommentList
