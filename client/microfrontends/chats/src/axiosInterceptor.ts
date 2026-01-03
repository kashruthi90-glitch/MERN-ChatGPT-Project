import axios from 'axios';

// if token is set as http-only cookie, then tell axios to include cookies in the request
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

// if token is stored in localstorage
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

export default api;