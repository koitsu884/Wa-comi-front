import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostSearchArea, searchPosts } from '../../actions/postSearchActions';
import { Box, Hidden, Drawer, AppBar, Toolbar, IconButton, makeStyles, Fab, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import history from '../../history';

import AreaSelector from '../common/AreaSelector';
import PostFilter from './Post/PostFilter';
import PostSearchResults from './Post/PostSearchResults';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    faButton: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    }
}));

const PAGE_SIZE = 6;

const Post = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);
    const selectedArea = useSelector(state => state.postSearch.selectedArea);
    const selectedCategories = useSelector(state => state.postSearch.selectedCategories);

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        dispatch(searchPosts(PAGE_SIZE, 1, selectedArea, selectedCategories));
    }, [dispatch, selectedArea, selectedCategories])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAreaChange = (areaId) => {
        dispatch(setPostSearchArea(areaId));
    }

    const handlePageChange = page => {
        dispatch(searchPosts(PAGE_SIZE, page, selectedArea, selectedCategories));
    }

    const handleAddButtonClick = () => {
        history.push('/post/edit');
    }

    return (
        <div style={{ minHeight: '80vh' }}>
            <AppBar elevation={0} position="static">
                <Toolbar>
                    <Hidden smUp >
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <AreaSelector onChange={handleAreaChange} value={selectedArea ? selectedArea : ''} className={classes.formControl} emptyString={'-- エリア選択 --'} />
                    <Hidden xsDown>
                        {
                            currentUser
                                ? <Box ml={5}><Button variant="contained" color="secondary" onClick={handleAddButtonClick}>新規投稿</Button></Box>
                                : null
                        }
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Box display="flex" alignItems="stretch">
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        anchor='left'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <PostFilter />
                    </Drawer>
                </Hidden>
                <Hidden xsDown >
                    <PostFilter />
                </Hidden>
                <PostSearchResults pageSize={PAGE_SIZE} onPageChange={handlePageChange} />
                <Hidden smUp>
                    {
                        currentUser ?
                            <Fab color="secondary" className={classes.faButton} aria-label="add" onClick={handleAddButtonClick}>
                                <AddIcon />
                            </Fab>
                            : null
                    }
                </Hidden>
            </Box>
        </div>
    )
}

export default Post
