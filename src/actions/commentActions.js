import {
    SET_COMMENT_LOADING,
    CLEAR_COMMENT_LIST,
    SET_COMMENT_LIST,
    LOAD_MORE_COMMENT
} from "./types";
import client from '../utils/client';

const setCommentList = (commentList, commentTotal, nextLink) => dispatch => {
    dispatch({
        type: SET_COMMENT_LIST,
        payload: { commentList, commentTotal, nextLink }
    });
}

const addMoreComment = (commentList, nextLink) => dispatch => {
    dispatch({
        type: LOAD_MORE_COMMENT,
        payload: { commentList, nextLink }
    })
}

export const setCommentLoading = (loading) => dispatch => {
    dispatch({
        type: SET_COMMENT_LOADING,
        payload: loading
    });
}

export const clearCommentList = () => dispatch => {
    dispatch({
        type: CLEAR_COMMENT_LIST,
    });
}

export const getCommentList = (apiUrl) => dispatch => {
    dispatch(setCommentLoading(true));
    client.get(apiUrl)
        .then(res => {
            dispatch(setCommentList(res.data.data, res.data.meta.total, res.data.links.next));
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setCommentLoading(false));
        })
}

export const loadMoreComments = (nextUrl) => dispatch => {
    dispatch(setCommentLoading(true));
    client.get(nextUrl)
        .then(res => {
            console.log(res);
            dispatch(addMoreComment(res.data.data, res.data.links.next));
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setCommentLoading(false));
        })
}

export const addComment = (apiUrl, comment) => dispatch => {
    dispatch(setCommentLoading(true));
    client.post(apiUrl, { comment: comment })
        .then(res => {
            dispatch(getCommentList(apiUrl));
        })
        .catch(error => {
            console.log(error);
            dispatch(setCommentLoading(false));
        })
}