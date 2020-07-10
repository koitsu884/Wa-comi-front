import React, { useState, useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import client from '../../utils/client';
import Spinner from '../common/Spinner';
import ReplyBox from './ReplyBox';
import { Box, makeStyles, Collapse, Button } from '@material-ui/core';
import EditCommentField from './EditCommentField';

const useStyles = makeStyles({
    replyBoxes: {
        transition: '2s'
    }
});

const ReplyList = ({ commentId, replyCount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [replyList, setReplyList] = useState([]);
    const [nextLink, setNextLink] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const currentUser = useSelector(state => state.auth.user);
    const commentReplyUrl = `/comments/${commentId}/replies`;

    const getReplyList = () => {
        setLoading(true);
        client.get(commentReplyUrl)
            .then(res => {
                setReplyList(res.data.data);
                setNextLink(res.data.links.next);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleReplyAreaClick = () => {
        if (!isOpen && !loading) {
            setIsOpen(true);
            if (replyCount > 0)
                getReplyList();
        }
    }

    const renderReplyList = () => {
        return (
            <div className={classes.replyBoxes}>
                {
                    replyItems
                }
            </div>
        );
    }

    const handleReplySubmit = value => {
        setLoading(true);
        client.post(commentReplyUrl, { reply: value })
            .then(res => {
                getReplyList();
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }

    const handleLoadMore = () => {
        setLoading(true);
        client.get(nextLink)
            .then(res => {
                setReplyList(replyList.concat(res.data.data));
                setNextLink(res.data.links.next);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const replyItems = useMemo(
        () => {
            return replyList.map(reply => <ReplyBox key={reply.id} reply={reply} />);
        }
        , [replyList])

    const LoadMore = () => nextLink ? <Button onClick={handleLoadMore}>更に読み込む</Button> : null;

    return (
        <Box ml={5} onClick={handleReplyAreaClick}>
            <div>返信数： {replyCount}</div>
            <Collapse in={isOpen}>
                {
                    currentUser ?
                        <Fragment>
                            <h3>返信する</h3>
                            <EditCommentField onSubmit={handleReplySubmit} />
                        </Fragment>
                        : null
                }
                {renderReplyList()}
                {
                    loading ? <Spinner /> : <LoadMore />
                }
            </Collapse>
        </Box>
    )
}

export default ReplyList
