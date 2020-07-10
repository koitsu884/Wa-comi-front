import React from 'react'
import PropTypes from 'prop-types'
import { CardContent, Typography, CardActions, Avatar, makeStyles, Card } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const SimplePostCard = ({ post }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h3">
                    {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Avatar alt={post.title} src={post.user.avatar} />

                <Typography variant="body2" component="p">
                    {post.user.name}
                </Typography>
            </CardActions>
        </Card>
    )
}

SimplePostCard.propTypes = {
    post: PropTypes.object
}

export default SimplePostCard
