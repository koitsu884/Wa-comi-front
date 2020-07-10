import { combineReducers } from "redux";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";
import commonReducer from "./commonReducer";
import postSearchReducer from "./postSearchReducer";
import formErrorReducer from "./formErrorReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import groupSearchReducer from "./groupSearchReducer";
import manageGroupReducer from "./manageGroupReducer";
import groupDetailsReducer from "./groupDetailsReducer";


export default combineReducers({
    common: commonReducer,
    auth: authReducer,
    user: userReducer,
    home: homeReducer,
    postSearch: postSearchReducer,
    groupSearch: groupSearchReducer,
    gorupDetails: groupDetailsReducer,
    manageGroup: manageGroupReducer,
    comment: commentReducer,
    formError: formErrorReducer
});