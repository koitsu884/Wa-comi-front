
import {
    SET_GROUP_DETAILS,
    SET_GROUP_MEMBERS,
    SET_GROUP_FOLLOWERS,
    SET_GROUP_POSTS,
    CLEAR_GROUP_DETAILS
} from "./types";
import * as api from '../api/group';
import { setLoading } from './commonActions';
import Alert from "../utils/alert";


const setGroupDetails = (details) => dispatch => {
    dispatch({
        type: SET_GROUP_DETAILS,
        payload: details
    });
}

const setGroupMembers = (memberList) => dispatch => {
    dispatch({
        type: SET_GROUP_MEMBERS,
        payload: memberList
    });
}

const setGroupFollowers = (followerList) => dispatch => {
    dispatch({
        type: SET_GROUP_FOLLOWERS,
        payload: followerList
    });
}

export const clearGroupDetails = () => dispatch => {
    dispatch({
        type: CLEAR_GROUP_DETAILS,
    });
}

export const setGroupPosts = (posts) => dispatch => {
    dispatch({
        type: SET_GROUP_POSTS,
        payload: posts
    });
}

export const getGroupRelatingData = (slug) => dispatch => {
    dispatch(setLoading(true));
    Promise.all([
        api.getGroupDetails(slug),
        api.getGroupMembers(slug),
        //TODO:  api.getGroupFollowers(slug),
        api.getLatestGroupPosts(slug),
    ])
        .then(values => {
            dispatch(setGroupDetails(values[0].data.data));
            dispatch(setGroupMembers(values[1].data.data));
            dispatch(setGroupPosts(values[2].data.data));
        })
        .catch(error => {
            console.log(error);
            Alert.error("データの取得に失敗しました！<br/>時間を置いてから再度アクセスしてみてください。");
        })
        .finally(() => dispatch(setLoading(false)))
}

