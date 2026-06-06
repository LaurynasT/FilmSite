import axios from "axios";

const BACKEND_BASE_URL = "https://filmsite-production-5017.up.railway.app/api";


let accessToken = null;
let refreshToken = null;

export const setTokens = (access, refresh) => {
    accessToken = access;
    refreshToken = refresh;
};
export const getToken = () => accessToken;
export const getRefreshToken = () => refreshToken;
export const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
};

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});


axiosInstance.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — auto refresh on 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(`${BACKEND_BASE_URL}/auth/token/refresh`, {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                });
                setTokens(response.data.accessToken, response.data.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch {
                clearTokens();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
export { BACKEND_BASE_URL };