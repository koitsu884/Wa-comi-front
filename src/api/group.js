import { getRequest, patchRequest, postRequest, deleteRequest } from './api';

//============== Group ==============
export const getGroupDetails = slug => {
    return getRequest(`/groups/${slug}`);
}

export const getGroupMembers = slug => {
    return getRequest(`/groups/${slug}/members`);
}

export const getGroupInvitations = slug => {
    return getRequest(`/groups/${slug}/invitations`);
}

export const getGroupPosts = slug => {
    return getRequest(`/groups/${slug}/posts`);
}

export const getGroupPostList = slug => {
    return getRequest(`/groups/${slug}/posts?list=true`);
}

export const getGroupPostDetails = (slug, id) => {
    return getRequest(`/groups/${slug}/posts/${id}`);
}

export const getLatestGroupPosts = slug => {
    return getRequest(`/groups/${slug}/posts?latest=true`);
}

export const updateGroup = (slug, fd) => {
    return patchRequest(`/groups/${slug}`, fd);
}

export const addGroupInvitation = (slug, invited_user_id, message = null) => {
    return postRequest(`/groups/${slug}/invitations`, { invited_user_id, message });
}

export const deleteGroupInvitation = (slug, id) => {
    return deleteRequest(`/groups/${slug}/invitations/${id}`);
}