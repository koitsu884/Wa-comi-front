import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchGroups, setGroupSearchArea } from '../../actions/groupSearchActions';
import { AppBar, Toolbar, Hidden, IconButton, Box, Drawer, Fab, makeStyles, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import AreaSelector from '../common/AreaSelector';
import GroupFilter from './Group/GroupFilter';
import GroupSearchResults from './Group/GroupSearchResults';
import history from '../../history';

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

const Group = () => {
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const currentUser = useSelector(state => state.auth.user);
    const selectedArea = useSelector(state => state.groupSearch.selectedArea);
    const selectedCategories = useSelector(state => state.groupSearch.selectedCategories);

    const PAGE_SIZE = 6;

    useEffect(() => {
        dispatch(searchGroups(PAGE_SIZE, 1, selectedArea, selectedCategories));
    }, [dispatch, selectedArea, selectedCategories])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAreaChange = areaId => {
        dispatch(setGroupSearchArea(areaId));
    }

    const handlePageChange = page => {
        dispatch(searchGroups(PAGE_SIZE, page, selectedArea, selectedCategories));
    }

    const handleAddButtonClick = () => {
        history.push('/mypage/group/create');
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
                    <AreaSelector onChange={handleAreaChange} value={selectedArea ? selectedArea : ''} emptyString={'-- エリア選択 --'} />
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
                        <GroupFilter />
                    </Drawer>
                </Hidden>
                <Hidden xsDown >
                    <GroupFilter />
                </Hidden>
                <GroupSearchResults pageSize={PAGE_SIZE} onPageChange={handlePageChange} />
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

export default Group
