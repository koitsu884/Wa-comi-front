import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import MyGroupPostCard from './MyGroupPostCard';
import history from '../../../history';
import { Link } from 'react-router-dom';

const ManageGroupPost = () => {
    const dispatch = useDispatch();
    const groupDetails = useSelector(state => state.manageGroup.groupDetails);
    const groupPosts = useSelector(state => state.manageGroup.groupPosts);

    const handleView = id => {
        history.push(`/group/${groupDetails.slug}/post/${id}`);
    }

    const handleEdit = id => {
        history.push(`/mypage/group/${groupDetails.slug}/editpost/${id}`);
    }

    const handleDelete = id => {
        console.log('deleting ' + id);
    }

    const GroupPostList = () => (
        <Box display="flex" flexWrap="wrap" justifyContent="space-around">
            {
                groupPosts.map(post => (
                    <Box key={post.id} m={2} width="20rem">
                        <MyGroupPostCard
                            groupPost={post}
                            onDelete={() => handleDelete(post.id)}
                            onViewClick={() => handleView(post.id)}
                            onEditClick={() => handleEdit(post.id)}
                        />
                    </Box>
                ))
            }
        </Box>
    );

    return (
        <div>
            <h1>活動記録管理</h1>
            <Button size="large" component={Link} to={`/mypage/group/${groupDetails.slug}/addpost`}>新規投稿</Button>
            <GroupPostList />
        </div>
    )
}

export default ManageGroupPost
