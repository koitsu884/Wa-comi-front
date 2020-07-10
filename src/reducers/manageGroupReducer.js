import {
    SET_MANAGE_GROUP_DETAILS,
    SET_MANAGE_GROUP_SUPPORT_MEMBERS,
    SET_MANAGE_GROUP_INVITATIONS,
    SET_MANAGE_GROUP_FOLLOWERS,
    SET_MANAGE_GROUP_POSTS,
    SET_MANAGE_GROUP_HAS_ERRORS,
    CLEAR_MANAGE_GROUP,
} from "../actions/types";

const INITIAL_STATE = {
    groupDetails: null,
    supportMembers: [],
    groupInvitations: [],
    followers: [],
    groupPosts: [],
    hasErrors: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MANAGE_GROUP_DETAILS:
            return {
                ...state,
                groupDetails: action.payload
            }
        case SET_MANAGE_GROUP_SUPPORT_MEMBERS:
            return {
                ...state,
                supportMembers: action.payload
            }
        case SET_MANAGE_GROUP_INVITATIONS:
            return {
                ...state,
                groupInvitations: action.payload
            }
        case SET_MANAGE_GROUP_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case SET_MANAGE_GROUP_POSTS:
            return {
                ...state,
                groupPosts: action.payload
            }
        case SET_MANAGE_GROUP_HAS_ERRORS:
            return {
                ...state,
                hasErrors: action.payload
            }
        case CLEAR_MANAGE_GROUP:
            return INITIAL_STATE;
        default:
            return state;
    }
}
