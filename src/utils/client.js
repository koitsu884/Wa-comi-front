import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_API_ROOT;

var axiosInstance = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

// axiosInstance.interceptors.request.use(function (config) {
//     let tokenExpires = localStorage.getItem(kTokenExpire);
//     console.log('checking token expire: ' + tokenExpires + ' ' + Date.now());
//     console.log(tokenExpires - Date.now());
//     if (tokenExpires - Date.now() < 60000) { //1min
//         console.log('Token expired!! sending refresh request');
//         return axios.get('/api/auth/refresh')
//             .then(res => {
//                 console.log('Refresh');
//                 console.log(res.data);
//                 return config;
//             })
//             .catch(error => {
//                 console.log(error);
//                 return config;
//             })
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        let originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.get('/auth/refresh', { withCredentials: true, baseURL: apiBaseURL })
                .then(res => {
                    return axiosInstance(originalRequest);
                })
                .catch(tokenError => {
                    return Promise.reject(tokenError);
                })
        }
        else {
            return Promise.reject(error);
        }
    }
)


export default axiosInstance;