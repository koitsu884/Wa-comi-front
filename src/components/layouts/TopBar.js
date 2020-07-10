import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import AuthMenu from './AuthMenu';
// import { appBarStyles } from './style';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .logo a': {
            color: 'white',
            fontWeight: 'bold',
        },
        '& .links': {
            flexGrow: 1,
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        }
    },
}));

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const TopBar = (props) => {
    const classes = useStyles();

    const matches = useMediaQuery('(max-width:600px)');


    const renderMobileToolBar = () => {
        return (
            <Toolbar>
                <IconButton edge="start" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">News</Typography>
                <AuthMenu />
            </Toolbar>
        )
    }

    const renderToolBar = () => {
        return (
            <Container>
                <Toolbar variant="dense">
                    <Typography className="logo" variant="h6" fontWeight={700}><Link to="/">Wa-コミ</Link></Typography>
                    <div className='links'>
                        <Link to="/group">グループ</Link>
                        <Link to="/event">イベント</Link>
                        <Link to="/post">友達募集</Link>
                    </div>
                    <AuthMenu />
                </Toolbar>
            </Container>
        )
    }

    return (
        <Fragment>
            <ElevationScroll {...props}>
                <AppBar className={classes.root}>
                    {matches ? renderMobileToolBar() : renderToolBar()}
                </AppBar>
            </ElevationScroll>
            <Toolbar variant="dense" />
        </Fragment>
    )
}

export default TopBar;
