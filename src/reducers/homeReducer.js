import { SET_CURRENT_USER, SET_LATEST_POST_LIST, SET_LATEST_GROUP_LIST } from "../actions/types";

const INITIAL_STATE = {
    latestGroupList: null,
    latestPostList: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_LATEST_POST_LIST:
            return {
                ...state,
                latestPostList: action.payload
            }
        case SET_LATEST_GROUP_LIST:
            return {
                ...state,
                latestGroupList: action.payload
            }
        default:
            return state;
    }
}
