import React from 'react'
import { Card, CardHeader, CardMedia, makeStyles, CardContent, Chip } from '@material-ui/core'
import NoImage from '../../assets/img/noImage.jpg';

const useStyles = makeStyles({
    root: {
        minWidth: '15rem',
    },
    media: {
        paddingTop: '56.25%',
    },
});

const GroupArea = ({ group }) => <Chip color="primary" label={group.area ? group.area.name : 'エリア未設定'} />;
const GroupCategory = ({ group }) => <Chip color="secondary" label={group.category ? group.category.name : 'その他'} />;


const GroupCard = ({ group }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader title={group.name} />
            <CardMedia
                className={classes.media}
                image={group.main_image ? group.main_image.url : NoImage}
                title={group.name}
            />
            <CardContent>
                <GroupArea group={group} />
                <GroupCategory group={group} />
            </CardContent>
        </Card>
    )
}

export default GroupCard
