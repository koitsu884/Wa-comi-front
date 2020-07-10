import axios from 'axios';

import {
    SET_GROUP_SEARCH_AREA,
    SET_GROUP_SEARCH_CATEGORIES,
    SET_GROUP_SEARCH_RESULT,
} from "./types";
import { setLoading } from './commonActions';

const apiBaseURL = process.env.REACT_APP_API_ROOT;

export const setGroupSearchArea = (areaId) => dispatch => {
    dispatch({
        type: SET_GROUP_SEARCH_AREA,
        payload: areaId
    });
}

export const setGroupSearchCategories = (categories) => dispatch => {
    dispatch({
        type: SET_GROUP_SEARCH_CATEGORIES,
        payload: categories
    });
}

const setGroupSearchResult = (result, currentPage, nextPageLink, total) => dispatch => {
    dispatch({
        type: SET_GROUP_SEARCH_RESULT,
        payload: { result, currentPage, nextPageLink, total }
    });
}

export const searchGroups = (pageSize, page = 1, areaId = null, categories = []) => dispatch => {
    let params = [];
    if (areaId) {
        params.push('area=' + areaId);
    }
    categories.forEach(categoryId => {
        params.push('categories[]=' + categoryId);
    });

    let url = `${apiBaseURL}/groups?page=${page}&per_page=${pageSize}&` + params.join('&');
    console.log(url)

    dispatch(setLoading(true));

    axios.get(url)
        .then(res => {
            console.log(res.data);
            dispatch(setGroupSearchResult(res.data.data, res.data.meta.current_page, res.data.links.next, res.data.meta.total));
        })
        .catch(error => {
            console.log(error);
        })
        .then(() => {
            dispatch(setLoading(false));
        })
}

