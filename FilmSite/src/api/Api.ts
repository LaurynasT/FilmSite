import axiosInstance, { setTokens, clearTokens, BACKEND_BASE_URL } from "./AxiosInstance"
import axios from "axios";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchData = async <T>(
    endpoint: string,
    queryParams?: Record<string, any>
) : Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint, {params: queryParams})
    return response.data;
}

export const deleteData = async <T>(
    endpoint: string,
) : Promise<T> => {
    const url =  `${endpoint}`
    const response = await axiosInstance.delete<T>(url)
    return response.data;
}
export const putData = async <T>(endpoint: string, params: object): Promise<T> => {
  const response = await axiosInstance.put<T>(endpoint, params)
  return response.data
}

export const postData = async <T>(endpoint: string, params: object): Promise<T> => {
  const response = await axiosInstance.post<T>(endpoint, params)
  return response.data
}


export const getFavorites = async (mediaType = null) => {
  try {
    const response = await axiosInstance.get(`/favorites`, {
      params: mediaType ? { mediaType } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addFavorite = async (mediaId, mediaType, title, posterPath) => {
  try {
    const response = await axiosInstance.post(`/favorites/add`, {
      mediaId, mediaType, title, posterPath,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (mediaId, mediaType) => {
  try {
    const response = await axiosInstance.delete(
      `/favorites/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const checkFavorite = async (mediaId, mediaType) => {
  try {
    const response = await axiosInstance.get(
      `/favorites/check?mediaId=${mediaId}&mediaType=${mediaType}`,
    );
    return response.data.isFavorite;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

export const checkWatchList = async (mediaId, mediaType) => {
  try {
    const response = await axiosInstance.get(
      `/WatchList/check?mediaId=${mediaId}&mediaType=${mediaType}`,
    );
    return response.data.isInWatchList;
  } catch (error) {
    console.error("Error checking watch list status:", error);
    return false;
  }
};

export const addToWatchList = async (mediaId, mediaType, title, posterPath) => {
  try {
    const response = await axiosInstance.post(`/WatchList/add`, {
      mediaId, mediaType, title, posterPath,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watch list:", error);
    throw error;
  }
};

export const removeFromWatchList = async (mediaId, mediaType) => {
  try {
    const response = await axiosInstance.delete(
      `/WatchList/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error removing from watch list:", error);
    throw error;
  }
};

export const getWatchList = async (mediaType = null) => {
  try {
    const response = await axiosInstance.get(`/WatchList`, {
      params: mediaType ? { mediaType } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching watch list:", error);
    throw error;
  }
};

export const searchMulti = async (query) => {
  try {
    const response = await axiosInstance.get(`/search`, {
      params: { query, language: "en-US", include_adult: false },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export { IMAGE_BASE_URL };