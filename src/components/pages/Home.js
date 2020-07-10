import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLatestPostList, getLatestGroupList } from '../../actions/homeActions';
import { Container, Avatar, Grid, Box, GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';
import { pageStyles } from './style';
import TopBar from '../layouts/TopBar';
import SimplePostCard from '../posts/SimplePostCard';
import NoImage from '../../assets/img/noImage.jpg';

export const Home = () => {
    const classes = pageStyles();
    const dispatch = useDispatch();
    const latestPostList = useSelector(state => state.home.latestPostList);
    const latestGroupList = useSelector(state => state.home.latestGroupList);

    useEffect(() => {
        dispatch(getLatestPostList());
        dispatch(getLatestGroupList());
    }, [dispatch]);

    return (
        <div className={classes.home}>
            <section>
                <div className='top-image'>
                    <Container maxWidth="lg">
                        {/* <TopBar transparent={true} /> */}
                        <Box mt={10} mx='auto'>
                            <Grid container mt={100} spacing={6}>
                                <Grid item xs={12}>
                                    <Typography variant="h2" component="h2" className='top-title'>ニュージーランドで仲間探し</Typography>
                                    {/* <p className='top-description'>ニュージーランドでと</p> */}
                                </Grid>
                                {/* Sedond row */}
                                <Grid item xs={4}>
                                    <Avatar className='top-nav'>やっほい</Avatar>
                                </Grid>
                                <Grid item xs={4}>
                                    <Avatar className='top-nav'>やっほい</Avatar>
                                </Grid>
                                <Grid item xs={4}>
                                    <Avatar className='top-nav'>やっほい</Avatar>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </div>
            </section>
            <section>
                <Container>
                    <Box mt={10}>
                        <h1>イベント</h1>
                        <h2>近日開催予定のイベント</h2>

                    </Box>
                </Container>
            </section>
            <section>
                <Container>
                    <Box mt={10}>
                        <h1>グループ</h1>
                        <h2>新規グループ</h2>
                        <GridList cellHeight={180}>
                            {
                                latestGroupList ? latestGroupList.map(group => (
                                    <GridListTile key={group.id}>
                                        <img src={group.main_image ? group.main_image : NoImage} alt={group.name} />
                                        <GridListTileBar
                                            title={group.name}
                                            subtitle={group.user.name}
                                        />
                                    </GridListTile>
                                )) : <p>Loading...</p>
                            }
                        </GridList>
                        <h2>グループ活動</h2>
                    </Box>
                </Container>
            </section>
            <section>
                <Container>
                    <Box mt={10}>
                        <h1>友達募集</h1>
                        <h2>最近の投稿</h2>
                        <Grid container spacing={4}>
                            {
                                latestPostList
                                    ? latestPostList.map(post => <Grid item xs={6} key={post.id}><SimplePostCard post={post} /></Grid>)
                                    : <p>Loading...</p>
                            }
                        </Grid>
                    </Box>
                </Container>
            </section>
        </div>
    )
}
