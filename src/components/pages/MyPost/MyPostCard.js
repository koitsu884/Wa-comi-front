import React from 'react'
import { Card, makeStyles, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core';
import NoImage from '../../../assets/img/noImage.jpg';
import { Visibility, Edit, Delete } from '@material-ui/icons';

import history from '../../../history';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        display: 'flex',
    },
    mainImage: {
        width: 150,
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const MyPostCard = ({
    post,
    onDelete
}) => {
    const classes = useStyles();

    const handleViewClick = () => {
        history.push('/post/' + post.id);
    }

    const handleEditClick = () => {
        history.push('/mypage/post/edit/' + post.id);
    }
    const handleDeleteClick = () => {
        onDelete();
    };


    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.mainImage}
                image={post.main_image ? post.main_image.url : NoImage}
                title={post.title}
            />
            <div>
                <CardContent>
                    <h3>{post.title}</h3>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="view" onClick={handleViewClick}>
                        <Visibility fontSize='large' color='secondary' />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={handleEditClick}>
                        <Edit fontSize='large' color='primary' />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDeleteClick} >
                        <Delete fontSize='large' color='error' />
                    </IconButton>
                </CardActions>
            </div>
        </Card>
    )
}

export default MyPostCard
