import React from 'react'
import { Card, CardMedia, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Twitter, Facebook, Instagram } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20rem',
    },
    media: {
        backgroundColor: 'black',
        height: '15rem',
    }
}))

const UserCard = ({ user }) => {
    const classes = useStyles();

    const renderLinks = () => {
        if (user.twitter || user.facebook || user.instagram)
            return (
                <CardContent>
                    {
                        user.twitter ? <IconButton><Twitter /></IconButton> : null
                    }
                    {
                        user.facebook ? <IconButton><Facebook /></IconButton> : null
                    }
                    {
                        user.instagram ? <IconButton><Instagram /></IconButton> : null
                    }
                </CardContent>
            )
    }

    return (
        <Card className={classes.root}>
            {user.avatar ?
                <CardMedia
                    className={classes.media}
                    image={user.avatar.url}
                    title="User avatar"
                />
                : null
            }
            <CardHeader title={user.name} />
            <CardContent>
                {user.introduction}
            </CardContent>
            {renderLinks()}
        </Card>
    )
}

export default UserCard
