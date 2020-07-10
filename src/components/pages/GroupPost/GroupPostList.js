import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import UserAvatar from '../../common/UserAvatar'
import formatDate from '../../../utils/formatDate'
import { getGroupPostList } from '../../../api/group';
import Spinner from '../../common/Spinner';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'scroll'
    },
    list: {
        display: 'flex',
        overflow: 'scroll-x'
    },
    listItem: {
        margin: '3px',
        minWidth: '12rem',
        display: 'inline-flex',
        borderRadius: '5px',
        border: `1px solid ${theme.palette.secondary.light}`
    }
}))

const GroupPostList = ({ slug, onClickItem, initialSelectedId = null }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState([]);
    const [selectedId, setSelectedId] = useState(initialSelectedId);

    useEffect(() => {
        setLoading(true);
        getGroupPostList(slug)
            .then(res => {
                setPostList(res.data.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [slug, setLoading])

    const handleClickItem = postId => {
        setSelectedId(postId);
        onClickItem(postId);
    }

    return (
        <div className={classes.root}>


            <List className={classes.list}>
                {
                    loading
                        ? <Spinner />
                        : postList.map(post =>
                            <ListItem
                                key={post.id}
                                className={classes.listItem}
                                onClick={() => handleClickItem(post.id)}
                                selected={selectedId === post.id}
                            >
                                <ListItemAvatar>
                                    <UserAvatar user={post.user} />
                                </ListItemAvatar>
                                <ListItemText primary={post.title} secondary={formatDate(post.created_at)} />
                            </ListItem>
                        )
                }
            </List>
        </div>
    )
}

export default GroupPostList
