import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import PostCard from '../../posts/PostCard';
import Pagination from '../../common/Pagination';

const PostSearchResults = ({ pageSize, onPageChange }) => {
    const searchResults = useSelector(state => state.postSearch.postList);
    const total = useSelector(state => state.postSearch.total);

    return (
        <Box flexGrow={1}>
            {
                searchResults.map(post => (
                    <Box m={1} key={post.id}>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                            <PostCard post={post} />
                        </Link>
                    </Box>
                ))
            }
            <div>

                {
                    total >= pageSize ? <Pagination pageSize={pageSize} itemCount={total} onPageChange={onPageChange} /> : null
                }
            </div>
        </Box>
    )
}

export default PostSearchResults
