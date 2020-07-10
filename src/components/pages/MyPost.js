import React from 'react';
import { Container, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../actions/userActions';
import Alert from '../../utils/alert';
import MyPostCard from './MyPost/MyPostCard';

const MyPost = () => {
    const myPosts = useSelector(state => state.user.myPosts);
    const dispatch = useDispatch();

    const handleDelete = (postId) => {
        Alert.confirm("この投稿を削除しますか？")
            .then((result) => {
                if (result.value) {
                    dispatch(deletePost(postId));
                }
            })
    }

    return (
        <Container style={{ minHeight: '80vh' }}>
            <h2>友達募集　投稿リスト</h2>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">

                {
                    myPosts.length > 0
                        ? myPosts.map(post => (
                            <Box m={1} key={post.id}>
                                <MyPostCard post={post} onDelete={() => handleDelete(post.id)} />
                            </Box>
                        ))
                        : <div>投稿がありません</div>
                }
            </Box>
        </Container>
    )
}

export default MyPost
