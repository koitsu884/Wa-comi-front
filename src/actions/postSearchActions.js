import axios from 'axios';

import {
    SET_POST_SEARCH_AREA,
    SET_POST_SEARCH_CATEGORIES,
    SET_POST_SEARCH_RESULT,
} from "./types";
import { setLoading } from './commonActions';

const apiBaseURL = process.env.REACT_APP_API_ROOT;

export const setPostSearchArea = (areaId) => dispatch => {
    dispatch({
        type: SET_POST_SEARCH_AREA,
        payload: areaId
    });
}

export const setPostSearchCategories = (categories) => dispatch => {
    dispatch({
        type: SET_POST_SEARCH_CATEGORIES,
        payload: categories
    });
}

const setPostSearchResult = (result, currentPage, nextPageLink, total) => dispatch => {
    dispatch({
        type: SET_POST_SEARCH_RESULT,
        payload: { result, currentPage, nextPageLink, total }
    });
}

export const searchPosts = (pageSize, page = 1, areaId = null, categories = []) => dispatch => {
    let params = [];
    if (areaId) {
        params.push('area=' + areaId);
    }
    categories.forEach(categoryId => {
        params.push('categories[]=' + categoryId);
    });

    let url = `${apiBaseURL}/posts?page=${page}&per_page=${pageSize}&` + params.join('&');
    console.log(url)

    dispatch(setLoading(true));

    axios.get(url)
        .then(res => {
            console.log(res.data);
            dispatch(setPostSearchResult(res.data.data, res.data.meta.current_page, res.data.links.next, res.data.meta.total));
        })
        .catch(error => {
            console.log(error);
        })
        .then(() => {
            dispatch(setLoading(false));
        })
}

