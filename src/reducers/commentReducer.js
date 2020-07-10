import { SET_COMMENT_LIST, SET_COMMENT_LOADING, CLEAR_COMMENT_LIST, LOAD_MORE_COMMENT } from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    commentList: [],
    commentTotal: 0,
    nextLink: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_COMMENT_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_COMMENT_LIST:
            return {
                ...state,
                commentList: action.payload.commentList,
                commentTotal: action.payload.commentTotal,
                nextLink: action.payload.nextLink
            }
        case LOAD_MORE_COMMENT:
            return {
                ...state,
                commentList: [...state.commentList].concat(action.payload.commentList),
                nextLink: action.payload.nextLink
            }
        case CLEAR_COMMENT_LIST:
            return {
                ...state,
                commentList: [],
                commentTotal: 0
            }
        default:
            return state;
    }
}
