import { SET_CURRENT_USER } from "./types";
// import axios from 'axios';
import client from '../utils/client';
import history from '../history';
import Alert from '../utils/alert';
import { getAvatar, getMyPosts, getMyGroups, getSupportGroups, clearUserData } from "./userActions";

const baseUrl = process.env.REACT_APP_API_ROOT + '/auth/';

const setCurrentUser = (user) => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    });
}

const getUserRelatingRecords = (userId) => dispatch => {
    dispatch(getAvatar(userId));
    dispatch(getMyPosts(userId));
    dispatch(getMyGroups(userId));
    dispatch(getSupportGroups(userId));
}

export const register = fd => dispatch => {
    client.post('register', fd, { baseURL: baseUrl }).then(res => {
        console.log(res);
        dispatch(signin(fd));
    }).catch(error => {
        console.log(error.response);
        let { message, errors } = error.response.data;

        if (errors.email) {
            Alert.error(errors.email);
        }
    })
}

export const signin = fd => dispatch => {
    client.post('login', fd, { baseURL: baseUrl }).then(res => {
        dispatch(setCurrentUser(res.data.user));
        dispatch(getUserRelatingRecords(res.data.user.id));
        history.push('/');
    }).catch(error => {
        console.log(error);
    })
}

export const getCurrentUser = () => dispatch => {
    client.get('me', { baseURL: baseUrl })
        .then(res => {
            var user = res.data.data;
            dispatch(setCurrentUser(user));
            dispatch(getUserRelatingRecords(user.id));
        })
        .catch(error => {
            console.log(error);
        })
}

export const logout = () => dispatch => {
    client.get('logout', { baseURL: baseUrl })
        .then(res => {
            dispatch(setCurrentUser(null));
            dispatch(clearUserData());
            history.push('/');
            Alert.success("ログアウトしました");
        })
        .catch(error => {
            console.log(error);
        })
}