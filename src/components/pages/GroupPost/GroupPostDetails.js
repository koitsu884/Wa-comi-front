import React, { useEffect, useState } from 'react'
import { Container, Box, makeStyles } from '@material-ui/core'
import ReactPlayer from 'react-player/youtube';
import { getGroupPostDetails } from '../../../api/group';
import Alert from '../../../utils/alert';
import ImageSlider from '../../common/ImageSlider';
import Spinner from '../../common/Spinner';
import UserCard from '../../users/UserCard';

const useStyles = makeStyles((theme) => ({
    player: {
        textAlign: 'center',
        maxWidth: '60rem',
        margin: '2rem auto',
        paddingTop: '56.25%',
        position: 'relative',
        '& .inner': {
            display: 'inline-block',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // margin: '2rem auto',
            padding: '1rem',
            borderRadius: '10px',
            backgroundColor: 'black',
        }
    },
    contentArea: {
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
            minWidth: '20rem',
            margin: '1rem',
        },
    },
}));



const GroupPostDetails = ({ slug, id }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [postDetails, setDetails] = useState({
        title: '',
        content: '',
        youtube: null,
        user: {
            name: '',
            introduction: ''
        }
    })

    useEffect(() => {
        if (id && slug) {
            setLoading(true);
            getGroupPostDetails(slug, id)
                .then(res => {
                    setDetails(res.data.data);
                })
                .catch(error => {
                    console.log(error);
                    Alert.error("投稿データの取得に失敗しました！<br />時間を置いて再度アクセスしてみてください。");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [id, slug])

    const GroupPostImages = () => {
        if (!postDetails.images || postDetails.images.length === 0)
            return null;

        var imageUrls = postDetails.images.map(image => image.url);
        return (
            <ImageSlider images={imageUrls} />
        )
    }

    const GroupPostVideo = () => {
        if (!postDetails.youtube) return null;
        return (
            <div className={classes.player}>
                <div className='inner'>
                    <ReactPlayer
                        url={postDetails.youtube}
                        width='100%'
                        height='100%'
                    />
                </div>
            </div>
        )
    }

    return (
        <Container>
            {loading ? <Spinner fixed={true} /> : null}
            <Box mt={2} mb={4}>
                <h1>{postDetails.title}</h1>
            </Box>
            <Box className={classes.contentArea}>
                <div className='content'>
                    <GroupPostImages />
                    <GroupPostVideo />
                    <div>
                        {postDetails.content}
                    </div>
                </div>
                <div className="userInfo">
                    <h3>投稿者</h3>
                    <UserCard user={postDetails.user} />
                </div>
            </Box>
            <Box>
                <h3>コメント</h3>

            </Box>
        </Container>
    )
}

export default GroupPostDetails
