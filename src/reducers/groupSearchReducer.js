import { SET_GROUP_SEARCH_AREA, SET_GROUP_SEARCH_RESULT, SET_GROUP_SEARCH_CATEGORIES } from "../actions/types";

const INITIAL_STATE = {
    groupList: [],
    total: 0,
    selectedArea: null,
    selectedCategories: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GROUP_SEARCH_RESULT:
            return {
                ...state,
                groupList: action.payload.result,
                total: action.payload.total,
            }
        case SET_GROUP_SEARCH_AREA:
            return {
                ...state,
                selectedArea: action.payload
            }
        case SET_GROUP_SEARCH_CATEGORIES:
            return {
                ...state,
                selectedCategories: action.payload
            }
        default:
            return state;
    }
}
