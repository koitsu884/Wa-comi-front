import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, makeStyles, Chip, Box, colors, IconButton, Button } from '@material-ui/core';
import UserCard from '../users/UserCard';
import ImageSlider from '../common/ImageSlider';
import { Home, Facebook, Twitter, Instagram } from '@material-ui/icons';
import { getGroupRelatingData, clearGroupDetails } from '../../actions/groupDetailsActions';
import UserAvatar from '../common/UserAvatar';
import GroupPostCard from '../groups/GroupPostCard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        paddingTop: '56.25%',
        margin: '2rem 0',
        // minHeight: '20rem',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.light,
        position: "relative",
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        '& img': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            margin: 'auto',
            display: 'block',
            // maxHeight: '100vh',
            objectFit: 'contain'
        }
    },
    headerTitle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        '& h1': {
            borderRadius: '3rem',
            fontSize: '2rem',
            color: 'white',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0,0,0,.7)',
        }
    },
    headerInfo: {
        position: 'absolute',
        display: 'flex',
        bottom: '2rem',
        right: '3rem',
        backgroundColor: 'rgba(0,0,0,.7)',
        padding: '.4rem',
        borderRadius: '8px'
    },
    mainContent: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
    },
    memberInfo: {
        borderRadius: '10px',
        backgroundColor: colors.teal[50],
        padding: '1rem'
    },

    homepageIcon: {
        color: colors.orange
    }
}));

const GroupArea = ({ group }) => <Chip color="primary" label={group.area ? group.area.name : 'エリア未設定'} />;
const GroupCategory = ({ group }) => <Chip color="secondary" label={group.category ? group.category.name : 'その他'} />;
const HomePageLink = ({ url }) => (
    url ?
        <IconButton aria-label="ホームページ" component="a" href={url}>
            <Home style={{ color: colors.orange[500] }} fontSize="large" />
        </IconButton>
        : null
);

const FacebookLink = ({ url }) => (
    url ?
        <IconButton aria-label="Facebook" component="a" href={url}>
            <Facebook style={{ color: colors.indigo[600] }} fontSize="large" />
        </IconButton>
        : null
);

const TwitterLink = ({ url }) => (
    url ?
        <IconButton aria-label="ホームページ" component="a" href={url}>
            <Twitter style={{ color: colors.blue[500] }} fontSize="large" />
        </IconButton>
        : null
);

const InstagramLink = ({ url }) => (
    url ?
        <IconButton aria-label="ホームページ" component="a" href={url}>
            <Instagram style={{ color: colors.pink[600] }} fontSize="large" />
        </IconButton>
        : null
);

const GroupDetails = (props) => {
    const { slug } = props.match.params;
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    // const loading = useSelector(state => state.common.loading);
    const groupDetails = useSelector(state => state.gorupDetails.details);
    const groupMembers = useSelector(state => state.gorupDetails.memberList);
    const groupPosts = useSelector(state => state.gorupDetails.posts);

    useEffect(() => {
        if (slug) {
            dispatch(getGroupRelatingData(slug));
        }
        return function cleanup() {
            dispatch(clearGroupDetails());
        }
    }, [slug, dispatch])

    const renderGroupLinks = () => (
        <Box display={'flex'}>
            <HomePageLink url={groupDetails.homepage} />
            <FacebookLink url={groupDetails.facebook} />
            <TwitterLink url={groupDetails.twitter} />
            <InstagramLink url={groupDetails.instagram} />
        </Box>
    );

    const renderGroupImages = () => {
        if (!groupDetails.images || groupDetails.images.length === 0)
            return null;

        var imageUrls = groupDetails.images.map(image => image.url);
        return (
            <ImageSlider images={imageUrls} />
        )
    }

    const MemberList = () => {
        if (groupMembers.length === 0) return <Fragment />
        return (
            <Box>
                <h3>サポートメンバー</h3>
                <Box display="flex" flexWrap="wrap">
                    {
                        groupMembers.map(member => (
                            <Box key={member.id} m={1}>
                                <UserAvatar user={member} />
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        )
    }

    const GroupPostList = () => {
        return (
            <Box>
                <h3>活動記録</h3>
                {
                    groupPosts.length === 0
                        ? <div>まだ投稿がありません</div>
                        : <Box display="flex" flexWrap="wrap">
                            {
                                groupPosts.map(post => (
                                    <Box key={post.id} m={1}>
                                        <Link to={`/group/${groupDetails.slug}/post/${post.id}`} style={{ textDecoration: 'none' }}>
                                            <GroupPostCard groupPost={post} />
                                        </Link>
                                    </Box>
                                ))
                            }
                        </Box>
                }
            </Box>
        )
    }

    return (
        <Container>
            <section className={classes.header}>
                {
                    groupDetails.main_image ? <img src={groupDetails.main_image.url} alt={groupDetails.name} /> : null
                }
                <div className={classes.headerTitle}>
                    <h1>{groupDetails.name}</h1>
                </div>
                <div className={classes.headerInfo}>
                    <GroupArea group={groupDetails} />
                    <Box ml={1}>
                        <GroupCategory group={groupDetails} />
                    </Box>
                </div>
            </section>
            <Box className={classes.mainContent}>
                <Box component="section" m={1} flexGrow={1}>
                    <h2>グループ紹介</h2>
                    <Box whiteSpace={'pre-wrap'} >{groupDetails.description}</Box>
                    <Box m={2}>
                        {
                            renderGroupImages()
                        }
                    </Box>
                    {
                        renderGroupLinks()
                    }
                </Box>
                <Box className={classes.memberInfo} component="section" m={1}>
                    <h3>グループ運営者</h3>
                    <UserCard user={groupDetails.user} />
                    <MemberList />
                    <h3>フォロワー</h3>
                    {
                        currentUser ?
                            <Button variant="outlined" color="primary">フォローする</Button>
                            : null
                    }
                </Box>
            </Box>
            <section>
                <GroupPostList />
            </section>
        </Container>
    )
}

export default GroupDetails
