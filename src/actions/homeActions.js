import { SET_LATEST_GROUP_LIST, SET_LATEST_POST_LIST } from "./types";
import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_API_ROOT;

const setLatestGroupList = (groupList) => dispatch => {
    dispatch({
        type: SET_LATEST_GROUP_LIST,
        payload: groupList
    });
}

const setLatestPostList = (postList) => dispatch => {
    dispatch({
        type: SET_LATEST_POST_LIST,
        payload: postList
    });
}

export const getLatestPostList = () => dispatch => {
    axios.get('/posts?per_page=6', { baseURL: apiBaseURL })
        .then(res => {
            dispatch(setLatestPostList(res.data.data));
        })
        .catch(error => {
            console.log(error);
        })
}

export const getLatestGroupList = () => dispatch => {
    axios.get('/groups?per_page=6', { baseURL: apiBaseURL })
        .then(res => {
            console.log(res.data);
            dispatch(setLatestGroupList(res.data.data));
        })
        .catch(error => {
            console.log(error);
        })
}