import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Avatar, Button, Typography, IconButton, Box, Divider, List, ListItemIcon, ListItemText, ListItem, colors } from '@material-ui/core';
import { logout } from '../../actions/authActions';
import { makeStyles } from '@material-ui/styles';
import { Cancel, AccountCircle, InsertEmoticon, Group } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    menu: {
        '& .header': {
            width: '20rem',
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '& .title': {
                flexGrow: 1,
                fontWeight: 700,
                // fontWeight: 'bold',
                fontSize: '1.8rem'
            }
        },
        '& .content': {
            padding: '1rem',
            '& .userInfo': {
                padding: '1rem',
                borderRadius: '5px',
                backgroundColor: colors.yellow[50]
            }
        }
    },
}));

const AuthMenu = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector(state => state.auth.user);
    const avatar = useSelector(state => state.user.avatar);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = () => setMenuOpen(!menuOpen);
    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
    }


    if (user) {
        return (
            <div>
                {
                    avatar ? <Avatar alt="ユーザーメニュー" src={avatar.url} onClick={toggleDrawer} /> : <Avatar alt="ユーザーメニュー" onClick={toggleDrawer}>{user.name.charAt(0)}</Avatar>
                }
                <Drawer className={classes.menu} anchor={'right'} open={menuOpen} onClose={() => setMenuOpen(false)} >
                    <div className='header'>
                        <Box className='title'>メニュー</Box>
                        <IconButton onClick={toggleDrawer}>
                            <Cancel fontSize="large" />
                        </IconButton>
                    </div>
                    <div className='content'>
                        <div className='userInfo'>
                            <div>ユーザーID: <b>{user.id}</b></div>
                            <div>{user.name}</div>
                        </div>
                        <List>
                            <ListItem button to="/mypage/account" component={Link} onClick={toggleDrawer} >
                                <ListItemIcon><AccountCircle /></ListItemIcon>
                                <ListItemText primary={'プロフィール・アカウント編集'} />
                            </ListItem>
                            <ListItem button to="/mypage/post" component={Link} onClick={toggleDrawer} >
                                <ListItemIcon><InsertEmoticon /></ListItemIcon>
                                <ListItemText primary={'『友達募集』投稿編集'} />
                            </ListItem>
                            <ListItem button to="/mypage/group" component={Link} onClick={toggleDrawer} >
                                <ListItemIcon><Group /></ListItemIcon>
                                <ListItemText primary={'グループ管理'} />
                            </ListItem>
                        </List>
                        <Divider />
                        <Box mt={2} mx="auto" >
                            <Button variant="contained" color="secondary" onClick={handleLogout}>ログアウト</Button>
                        </Box>
                    </div>
                </Drawer>
            </div>
        )
    }

    return (
        <Fragment>
            <Button component={Link} to="/login" variant="contained" size="small" color="default" disableElevation>ログイン</Button>
            <Button component={Link} to="/register" variant="contained" size="small" color="secondary" disableElevation>新規登録</Button>
        </Fragment>
    );
}

export default AuthMenu
