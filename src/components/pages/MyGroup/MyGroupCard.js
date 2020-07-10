import React from 'react'
import { Card, CardMedia, CardContent, CardActions, IconButton, makeStyles, CardHeader } from '@material-ui/core'
import { Visibility, Edit, Delete } from '@material-ui/icons'

import NoImage from '../../../assets/img/noImage.jpg';
import history from '../../../history';

const useStyles = makeStyles({
    media: {
        paddingTop: '56.25%',
    }
})

const MyGroupCard = ({ group, onDelete }) => {
    const classes = useStyles();

    const handleViewClick = () => {
        history.push('/group/' + group.slug);
    }

    const handleEditClick = () => {
        history.push('/mypage/group/' + group.slug);
    }
    const handleDeleteClick = () => {
        onDelete();
    };

    return (
        <Card>
            <CardHeader title={group.name} />
            <CardMedia
                image={group.main_image ? group.main_image.url : NoImage}
                title={group.name}
                className={classes.media}
            />
            <CardContent>
                <div>{group.name}</div>
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

export default MyGroupCard
