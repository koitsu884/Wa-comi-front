import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Container, makeStyles, Box, Chip } from '@material-ui/core';
import Spinner from '../../common/Spinner';
import UserCard from '../../users/UserCard';
import ImageSlider from '../../common/ImageSlider';
import PostCommentList from './PostCommentList';

const apiBaseURL = process.env.REACT_APP_API_ROOT;

const useStyles = makeStyles((theme) => ({
    root: {
        '& h1': {
            textAlign: 'center'
        }
    },

    contentArea: {
        marginTop: '3rem',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .content': {
            flexGrow: 1,
            margin: '1rem',
            minWidth: 0, //To fix react-slick bug
            minHeight: 0,
            [theme.breakpoints.down('sm')]: {
                flexGrow: 0,
            },
        },
        '& .userInfo': {
            flexShrink: 0,
            minWidth: '30rem',
            margin: '1rem',
        },
    },
    commentArea: {
        marginTop: '3rem',
    }
}));

const PostDetails = (props) => {
    const { id } = props.match.params;
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [postDetails, setDetails] = useState({
        title: '',
        content: '',
        user: {
            name: '',
            introduction: ''
        }
    })

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get('/posts/' + id, { baseURL: apiBaseURL })
                .then(res => {
                    setDetails(res.data.data);
                    // dispatch(setLatestPostList(res.data.data));
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [id])

    const renderPostImages = () => {
        if (!postDetails.images || postDetails.images.length === 0)
            return null;

        var imageUrls = postDetails.images.map(image => image.url);
        return (
            <ImageSlider images={imageUrls} />
        )
    }

    return (
        <div style={{ minHeight: '70vh' }}>
            {
                loading ? <Spinner cover={true} /> : null
            }
            <Container className={classes.root}>
                <Box mt={2} mb={4}>
                    <h1>{postDetails.title}</h1>
                </Box>
                <div className={classes.contentArea}>
                    <div className='content'>
                        {
                            renderPostImages()
                        }
                        {
                            postDetails.category ? <Chip color="secondary" label={postDetails.category.name} /> : null
                        }
                        <div>
                            {postDetails.content}
                        </div>
                    </div>
                    <div className='userInfo'>
                        <UserCard user={postDetails.user} />
                    </div>
                </div>
                <div className={classes.commentArea}>
                    <h3>コメント</h3>
                    <PostCommentList postId={id} />
                </div>
            </Container>
        </div>
    )
}

export default PostDetails
