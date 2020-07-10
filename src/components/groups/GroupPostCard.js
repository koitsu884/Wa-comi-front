import React from 'react'
import { Card, CardMedia, CardContent, makeStyles, Typography, Box } from '@material-ui/core'
import NoImage from '../../assets/img/noImage.jpg';
import UserAvatar from '../common/UserAvatar';
import formatDate from '../../utils/formatDate';

const useStyles = makeStyles({
    root: {
        minWidth: '15rem',
    },
    media: {
        paddingTop: '56.25%',
    },
});

const GroupPostCard = ({ groupPost }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={groupPost.main_image ? groupPost.main_image.url : NoImage}
                title={groupPost.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {groupPost.title}
                </Typography>
                <Box display="flex" alignItems="center">
                    <UserAvatar user={groupPost.user} />
                    <Box ml={1}>
                        投稿日:{formatDate(groupPost.created_at)}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default GroupPostCard
