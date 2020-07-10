import { SET_AREA_LIST, SET_POST_CATEGORIES, SET_GROUP_CATEGORIES, SET_LOADING } from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    areaList: [],
    postCategories: [],
    groupCategories: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_AREA_LIST:
            return {
                ...state,
                areaList: action.payload
            }
        case SET_POST_CATEGORIES:
            return {
                ...state,
                postCategories: action.payload
            }
        case SET_GROUP_CATEGORIES:
            return {
                ...state,
                groupCategories: action.payload
            }
        default:
            return state;
    }
}
