import { SET_POST_SEARCH_AREA, SET_POST_SEARCH_RESULT, SET_POST_SEARCH_CATEGORIES } from "../actions/types";

const INITIAL_STATE = {
    postList: [],
    total: 0,
    selectedArea: null,
    selectedCategories: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_POST_SEARCH_RESULT:
            return {
                ...state,
                postList: action.payload.result,
                total: action.payload.total,
            }
        case SET_POST_SEARCH_AREA:
            return {
                ...state,
                selectedArea: action.payload
            }
        case SET_POST_SEARCH_CATEGORIES:
            return {
                ...state,
                selectedCategories: action.payload
            }
        default:
            return state;
    }
}
