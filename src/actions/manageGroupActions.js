import {
    SET_MANAGE_GROUP_DETAILS,
    SET_MANAGE_GROUP_SUPPORT_MEMBERS,
    SET_MANAGE_GROUP_FOLLOWERS,
    SET_MANAGE_GROUP_POSTS,
    SET_MANAGE_GROUP_HAS_ERRORS,
    SET_MANAGE_GROUP_INVITATIONS,
    CLEAR_MANAGE_GROUP,
} from "./types";
import Alert from '../utils/alert';
import { clearFormErrors, setFormErrors } from "./formActions";
import { setLoading } from '../actions/commonActions';
import * as api from '../api/group';


const setManageGroupPosts = (groupPostList) => dispatch => {
    dispatch({
        type: SET_MANAGE_GROUP_POSTS,
        payload: groupPostList
    });
}

const setManageGroupDetails = (groupDetails) => dispatch => {
    dispatch({
        type: SET_MANAGE_GROUP_DETAILS,
        payload: groupDetails
    })
}

const setManageGroupSupportMembers = (members) => dispatch => {
    dispatch({
        type: SET_MANAGE_GROUP_SUPPORT_MEMBERS,
        payload: members
    });
}

const setManageGroupInvitations = (invitations) => dispatch => {
    dispatch({
        type: SET_MANAGE_GROUP_INVITATIONS,
        payload: invitations
    });
}

const setManageGroupFollowers = (followers) => dispatch => {
    dispatch({
        type: SET_MANAGE_GROUP_FOLLOWERS,
        payload: followers
    });
}

export const clearManageGroup = () => dispatch => {
    dispatch({
        type: CLEAR_MANAGE_GROUP
    })
}

export const setManageGroupHasErrors = flag => dispatch => {
    dispatch({
        type: SET_MANAGE_GROUP_HAS_ERRORS,
        payload: flag
    })
}

export const getGroupRelatingData = (slug) => dispatch => {
    dispatch(setManageGroupHasErrors(false));
    dispatch(setLoading(true));
    Promise.all([
        api.getGroupDetails(slug),
        api.getGroupMembers(slug),
        api.getGroupInvitations(slug),
        api.getGroupPosts(slug),
    ])
        .then(values => {
            dispatch(setManageGroupDetails(values[0].data.data));
            dispatch(setManageGroupSupportMembers(values[1].data.data));
            dispatch(setManageGroupInvitations(values[2].data.data));
            dispatch(setManageGroupPosts(values[3].data.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(setManageGroupHasErrors(true));
        })
        .finally(() => dispatch(setLoading(false)))
}


export const getGroupPosts = (slug) => dispatch => {
    //TODO 
    // client.get(`/groups/${slug}/posts`)
    //     .then(res => {
    //         dispatch(setManageGroupSupportMembers(res.data.data));
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         dispatch(setManageGroupHasErrors(true));
    //     })
    //     .finally(() => {
    //         dispatch(setLoading(false));
    //     })
}

export const getGroupInvitations = slug => dispatch => {
    api.getGroupInvitations(slug)
        .then(res => {
            dispatch(setManageGroupInvitations(res.data.data));
        })
        .catch(error => console.log(error))
}

export const updateGroup = (slug, submitedData) => dispatch => {
    dispatch(setLoading(true));
    dispatch(clearFormErrors());

    let fd = new FormData();

    for (var dataKey in submitedData) {
        let data = submitedData[dataKey];
        fd.append(dataKey, data ? data : '');
    }

    api.updateGroup(slug, fd)
        .then(res => {
            Alert.success("更新しました");
            dispatch(setManageGroupDetails(res.data.data));
        })
        .catch(error => {
            console.log(error);
            let formErrors = error.response.data.errors;
            if (formErrors) {
                dispatch(setFormErrors(formErrors));
            }
            else {
                Alert.error("グループ情報の更新に失敗しました");
            }
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
}

export const addGroupInvitation = (slug, userId, message = null) => dispatch => {
    dispatch(setLoading(true));
    api.addGroupInvitation(slug, userId, message)
        .then(res => {
            dispatch(getGroupInvitations(slug));
        })
        .catch(error => {
            console.log(error);
            Alert.error("招待できませんでした");
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
}

export const deleteGroupInvitation = (slug, id) => dispatch => {
    dispatch(setLoading(true));
    api.deleteGroupInvitation(slug, id)
        .then(res => {
            dispatch(getGroupInvitations(slug));
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setLoading(false));
        })
}

