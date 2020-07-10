import {
    SET_AVATAR,
    SET_MYPOSTS,
    DELETE_USER_POST,
    SET_MYGROUPS,
    DELETE_USER_GROUP,
    SET_SUPPORT_GROUPS,
    CLEAR_USER_DATA
} from "../actions/types";

const INITIAL_STATE = {
    avatar: null,
    myPosts: [],
    myGroups: [],
    supportGroups: [],
    followGroups: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }
        case SET_MYPOSTS:
            return {
                ...state,
                myPosts: action.payload
            }
        case SET_SUPPORT_GROUPS:
            return {
                ...state,
                supportGroups: action.payload
            }
        case SET_MYGROUPS:
            return {
                ...state,
                myGroups: action.payload
            }
        case DELETE_USER_POST:
            return {
                ...state,
                myPosts: state.myPosts.filter(post => post.id !== action.payload)
            }
        case DELETE_USER_GROUP:
            return {
                ...state,
                myGroups: state.myGroups.filter(group => group.id !== action.payload)
            }
        case CLEAR_USER_DATA:
            return INITIAL_STATE
        default:
            return state;
    }
}
