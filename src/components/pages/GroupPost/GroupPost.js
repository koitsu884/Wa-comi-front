import React, { useState, Fragment } from 'react'
import { Container, Box } from '@material-ui/core'
import GroupPostList from './GroupPostList'
import GroupPostDetails from './GroupPostDetails';
import { Link } from 'react-router-dom';

const GroupPost = (props) => {
    const { slug, id } = props.match.params;
    const [selectedPostId, setPostId] = useState(id);

    const handlePostChange = id => {
        setPostId(id);
    }

    return (
        <Fragment>
            <Box p={2}>
                <Link to={`/group/${slug}`}>グループ詳細画面に戻る</Link>
                <h3>活動記録</h3>
            </Box>
            <GroupPostList slug={slug} onClickItem={handlePostChange} />
            <Container>
                <GroupPostDetails slug={slug} id={selectedPostId} />
            </Container>
        </Fragment>
    )
}

export default GroupPost
