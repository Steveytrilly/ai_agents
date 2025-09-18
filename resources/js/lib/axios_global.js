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
