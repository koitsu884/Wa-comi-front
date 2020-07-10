import React from 'react'
import { Card, CardMedia, CardContent, CardActions, IconButton, makeStyles, CardHeader } from '@material-ui/core'
import { Visibility, Edit, Delete } from '@material-ui/icons'

import NoImage from '../../../assets/img/noImage.jpg';
import history from '../../../history';
import UserInfoBox from '../../users/UserInfoBox';
import formatDate from '../../../utils/formatDate';

const useStyles = makeStyles({
    media: {
        paddingTop: '56.25%',
    }
})

const MyGroupPostCard = ({ groupPost, onViewClick, onEditClick, onDelete }) => {
    const classes = useStyles();

    const handleViewClick = () => {
        onViewClick()
    }

    const handleEditClick = () => {
        onEditClick()
    }
    const handleDeleteClick = () => {
        onDelete();
    };

    return (
        <Card>
            <CardMedia
                image={groupPost.main_image ? groupPost.main_image.url : NoImage}
                title={groupPost.title}
                className={classes.media}
            />
            <CardContent>
                <h3>{groupPost.title}</h3>
                <UserInfoBox user={groupPost.user} />
                <div>投稿日:{formatDate(groupPost.created_at)}</div>
                <div>更新日:{formatDate(groupPost.updated_at)}</div>
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

        </Card>
    )
}

export default MyGroupPostCard
