import { getRequest, patchRequest, postRequest, deleteRequest } from './api';

//============== Group ==============
export const getPostDetails = id => {
    return getRequest(`/posts/${id}`);
}

export const addNewPost = (fd) => {
    return postRequest(`/posts`, fd);
}

export const updatePost = (id, fd) => {
    return patchRequest(`/posts/${id}`, fd);
}