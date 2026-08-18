import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { httpErrorHandler } from "../composables/errorHandling";

const BACKEND_BASE_URL = "http://localhost:5135/api";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; 

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNetworkError(error: AxiosError): boolean {
  return (
    !error.response &&
    (error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      !error.code)
  );
}


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retryCount?: number;
    };

    if (!originalRequest || !isNetworkError(error)) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount ?? 0;

    if (originalRequest._retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    originalRequest._retryCount += 1;

    const delay = RETRY_DELAY_MS * 2 ** (originalRequest._retryCount - 1);
    await sleep(delay);

    return axiosInstance(originalRequest);
  }
);

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
          { withCredentials: true },
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    httpErrorHandler(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
export { BACKEND_BASE_URL };
