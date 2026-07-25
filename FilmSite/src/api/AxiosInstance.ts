import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { httpErrorHandler } from "../composables/errorHandling";

const BACKEND_BASE_URL = "https://filmsite-production-5017.up.railway.app/api";

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (access: string, refresh: string): void => {
    accessToken = access;
    refreshToken = refresh;
};

export const getToken = (): string | null => accessToken;

export const getRefreshToken = (): string | null => refreshToken;

export const clearTokens = (): void => {
    accessToken = null;
    refreshToken = null;
};

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL,
});


axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            refreshToken
        ) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    `${BACKEND_BASE_URL}/auth/token/refresh`,
                    {
                        accessToken,
                        refreshToken,
                    }
                );

                setTokens(
                    response.data.accessToken,
                    response.data.refreshToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${response.data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch {
                clearTokens();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log("Axios error:", error);
        httpErrorHandler(error);
        return Promise.reject(error);
    }
);


export default axiosInstance;
export { BACKEND_BASE_URL };