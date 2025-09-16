// import { API_URL, APP_VERSION } from "./app_constants";
// const apiUrl = API_URL;
// const appVersion = APP_VERSION;
// const apiRoute = "/api/";
// const baseURL = apiUrl + apiRoute + appVersion;

// async function get(path, headers) {
//     return await axios.get(baseURL + path, headers);
// }

// async function post(path, data) {
//     return await axios.post(baseURL + path, data);
// }

// //const put = (path, data) => axios.put(baseURL + path, data);

// async function getNoApi(path, headers) {
//     return await axios.get(apiUrl + path, headers);
// }

// export default {
//     get,
//     post,
//     getNoApi,
//     // put,
// };

// axios.js
import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `${window.location.origin}/api/v1`, // Laravel API base
    withCredentials: true, // needed if using Sanctum (cookies)
});

// Request interceptor: attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("🔒 Unauthorized! Logging out...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
