import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { httpErrorHandler } from "../composables/errorHandling";

const BACKEND_BASE_URL = "http://localhost:5135/api";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
    withCredentials: true, 
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(
                    `${BACKEND_BASE_URL}/auth/token/refresh`,
                    {},
                    { withCredentials: true }
                );

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        httpErrorHandler(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
export { BACKEND_BASE_URL };