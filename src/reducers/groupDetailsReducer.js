import {
    SET_GROUP_DETAILS,
    SET_GROUP_MEMBERS,
    SET_GROUP_FOLLOWERS,
    SET_GROUP_POSTS,
    CLEAR_GROUP_DETAILS
} from "../actions/types";

const INITIAL_STATE = {
    details: {
        name: '',
        description: '',
        user: {
            name: '',
            introduction: ''
        }
    },
    memberList: [],
    followerList: [],
    posts: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GROUP_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case SET_GROUP_MEMBERS:
            return {
                ...state,
                memberList: action.payload
            }
        case SET_GROUP_FOLLOWERS:
            return {
                ...state,
                followerList: action.payload
            }
        case SET_GROUP_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case CLEAR_GROUP_DETAILS:
            return INITIAL_STATE
        default:
            return state;
    }
}
