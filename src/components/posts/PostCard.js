import React from 'react'
import { Card, makeStyles, CardMedia, CardContent, Avatar, Box, Chip } from '@material-ui/core';
import NoImage from '../../assets/img/noImage.jpg';
import UserAvatar from '../common/UserAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        fontSize: '1.6rem',
        textDecoration: 'none',
    },
    mainImage: {
        width: 150,
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const PostArea = ({ post }) => post.area ? <Chip color="primary" label={post.area.name} /> : null;
const PostCategory = ({ post }) => post.category ? <Chip color="secondary" label={post.category.name} /> : null;

const PostCard = ({ post }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.mainImage}
                image={post.main_image ? post.main_image.url : NoImage}
                title={post.title}
            />

            <CardContent>
                <h3 className={classes.title}>{post.title}</h3>
                <Box display={'flex'}>
                    <PostArea post={post} />
                    <PostCategory post={post} />
                    <div className={classes.userInfo}>
                        <UserAvatar user={post.user} />
                        <Box ml={2}>{post.user.name}</Box>
                    </div>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PostCard
