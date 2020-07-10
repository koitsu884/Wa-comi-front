import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from './layouts/TopBar';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { teal, amber, lightBlue } from '@material-ui/core/colors';

import { getAreaList, getPostCategories, getGroupCategories } from '../actions/commonActions';
import { getCurrentUser } from '../actions/authActions';
import history from '../history';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Hidden, CssBaseline } from '@material-ui/core';
import BackToTop from './layouts/BackToTop';
import Post from './pages/Post';
import Group from './pages/Group';
import Event from './pages/Event';
import BottomNav from './layouts/BottomNav';
import Footer from './layouts/Footer';
import PostDetails from './pages/PostDetail/PostDetails';
import NotFound from './pages/NotFound';
import PostEdit from './pages/PostEdit';
import PrivateRoute from './PrivateRoute';
import MyAccount from './pages/MyAccount';
import MyPost from './pages/MyPost';
import Spinner from './common/Spinner';
import PostCreate from './pages/PostCreate';
import GroupCreate from './pages/GroupCreate';
import GroupDetails from './pages/GroupDetails';
import MyGroup from './pages/MyGroup';
import ManageGroup from './pages/ManageGroup/ManageGroup';
import ScrollToTop from './ScrollToTop';
import GroupPost from './pages/GroupPost/GroupPost';
import GroupPostCreate from './pages/GroupPostCreate';
import GroupPostEdit from './pages/GroupPostEdit';

const theme = createMuiTheme({
    typography: {
        // htmlFontSize: 10,

        // '@media (max-width:960px)': {
        //     htmlFontSize: 7,
        // },
        // '@media (max-width:600px)': {
        //     htmlFontSize: 5,
        // },

        fontSize: 14,

        fontFamily: [
            '"M PLUS Rounded 1c"',
            '"Kosugi Maru"',
            'Roboto',
            'sans-serif',
        ].join(','),
    },

    palette: {
        primary: {
            main: teal[300],
            contrastText: '#fff'
        },
        secondary: amber
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': '"M PLUS Rounded 1c"',
            },
        },
        MuiOutlinedInput: {
            root: {
                backgroundColor: '#fff',
                '&:focus': {
                    backgroundColor: '#fff',
                },
                marginTop: '10px',
            },
            input: {
                padding: '.5rem 1rem',
            },
        },
        MuiInputLabel: {
            outlined: {
                transform: 'translate(14px, 20px) scale(1)',
                '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -2px) scale(0.75)',
                }
            }
        },
        MuiFormHelperText: {
            root: {
                color: lightBlue[800],
            }
        }
    }
});

const App = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.common.loading);

    useEffect(() => {
        dispatch(getAreaList());
        dispatch(getGroupCategories());
        dispatch(getPostCategories());
        dispatch(getCurrentUser());
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                {
                    loading ? <Spinner fixed={true} /> : null
                }
                <Hidden xsDown>
                    <TopBar />
                </Hidden>
                <ScrollToTop />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <PrivateRoute path="/mypage/account" exact component={MyAccount} />
                    <PrivateRoute path="/mypage/post" exact component={MyPost} />
                    <Route path="/post" exact component={Post} />
                    <PrivateRoute path="/post/edit/:id" exact component={PostEdit} />
                    <PrivateRoute path="/post/edit" exact component={PostCreate} />
                    <Route path="/post/:id" exact component={PostDetails} />
                    <Route path="/group" exact component={Group} />
                    <PrivateRoute path="/mypage/group" exact component={MyGroup} />
                    <PrivateRoute path="/mypage/group/edit" exact component={GroupCreate} />
                    <PrivateRoute path="/mypage/group/:slug" exact component={ManageGroup} />
                    <PrivateRoute path="/mypage/group/:slug/editpost/:id" exact component={GroupPostEdit} />
                    <PrivateRoute path="/mypage/group/:slug/addpost" exact component={GroupPostCreate} />
                    <Route path="/group/:slug" exact component={GroupDetails} />
                    <Route path="/group/:slug/post/:id" exact component={GroupPost} />
                    <Route path="/group/:slug/post" exact component={GroupPost} />
                    <Route path="/event" exact component={Event} />
                    <Route path="/*" component={NotFound} />
                </Switch>
                <Hidden xsDown>
                    <BackToTop />
                </Hidden>
                <Hidden smUp>
                    <BottomNav />
                </Hidden>
                <Footer />
            </Router>
        </ThemeProvider>
    )
}

export default App
