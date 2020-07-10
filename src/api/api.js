import client from '../utils/client';

export const getRequest = (url, params = null) => {
    return client.get(url, { params: params });
}

export const postRequest = (url, data = null) => {
    return client.post(url, data);
}

export const patchRequest = (url, fd) => {
    fd.append('_method', 'PATCH');
    return client.post(url, fd);
}

export const deleteRequest = (url) => {
    return client.delete(url);
}
