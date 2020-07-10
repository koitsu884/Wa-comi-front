import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentList, clearCommentList, addComment, loadMoreComments } from '../../../actions/commentActions';
import Spinner from '../../common/Spinner';
import CommentList from '../../comments/CommentList';
import EditCommentField from '../../comments/EditCommentField';
import { Button } from '@material-ui/core';

const PostCommentList = ({ postId }) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.comment.loading);
    const commentList = useSelector(state => state.comment.commentList);
    const nextLink = useSelector(state => state.comment.nextLink);
    const currentUser = useSelector(state => state.auth.user);
    const postCommentUrl = `/posts/${postId}/comments`;

    useEffect(() => {
        dispatch(getCommentList(postCommentUrl));
        return () => {
            dispatch(clearCommentList());
        }
    }, [postCommentUrl, dispatch])

    const handleCommentSubmit = (value) => {
        if (value) {
            dispatch(addComment(postCommentUrl, value));
        }
    }

    const handleLoadMore = () => {
        dispatch(loadMoreComments(nextLink));
    }

    return (
        <div>
            {
                currentUser ? <Fragment>
                    <h3>コメントを追加する</h3>
                    <EditCommentField onSubmit={handleCommentSubmit} /><hr />
                </Fragment> : null
            }
            {
                loading ? <Spinner cover={true} /> : null
            }
            <CommentList commentList={commentList} />
            {
                nextLink ? <Button onClick={handleLoadMore}>さらに読み込む</Button> : null
            }
        </div>
    )
}

export default PostCommentList
