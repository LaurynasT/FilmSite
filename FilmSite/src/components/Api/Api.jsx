import axiosInstance, { setTokens, clearTokens, BACKEND_BASE_URL } from "./axiosInstance";
import axios from "axios";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const fetchMovieDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};

export const fetchMovieTrailer = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}/trailer`);
    const videos = response.data.results;
    const officialTrailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    return officialTrailer
      ? `https://www.youtube.com/embed/${officialTrailer.key}`
      : null;
  } catch (error) {
    console.error("Failed to fetch trailer:", error);
    throw error;
  }
};

export const fetchMovieCredits = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}/credits`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie credits:", error);
    throw error;
  }
};

export const fetchPopularTvSeries = async () => {
  try {
    const response = await axiosInstance.get(`/tv/popular`);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular Tv Series", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axiosInstance.get(`/movie/popular`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular movies", error);
    throw error;
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await axiosInstance.get(`/movie/upcoming`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch upcoming movies", error);
    throw error;
  }
};

export const fetchTvSeriesDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/tv/${id}`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Tv Series details:", error);
    throw error;
  }
};

export const fetchTvSeriesCredits = async (id) => {
  try {
    const response = await axiosInstance.get(`/tv/${id}/credits`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TV credits:", error);
    throw error;
  }
};

export const fetchTvSeasons = async (id, seasonNumber) => {
  try {
    const response = await axiosInstance.get(`/tv/${id}/seasons/`, {
      params: { language: "en-US", seasonNumber: seasonNumber },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Seasons", error);
    throw error;
  }
};

export const fetchTvTrailer = async (id) => {
  try {
    const response = await axiosInstance.get(`/tv/${id}/trailer`, {
      params: { language: "en-US" },
    });
    const videos = response.data.results;
    const officialTrailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    return officialTrailer
      ? `https://www.youtube.com/embed/${officialTrailer.key}`
      : null;
  } catch (error) {
    console.error("Failed to fetch trailer:", error);
    throw error;
  }
};

export const fetchCompanyDetail = async (companyId) => {
  try {
    const response = await axiosInstance.get(`/company/${companyId}`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch company details", error);
    throw error;
  }
};

export const fetchSimilar = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}/similar`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch similar movies", error);
    throw error;
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}/reviews`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movie reviews", error);
    throw error;
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    // Use plain axios here since we don't have a token yet
    const response = await axios.post(`${BACKEND_BASE_URL}/auth/login`, {
      Username: username,
      Password: password,
    });
    setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/auth/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post(`/auth/token/revoke`);
    clearTokens();
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const updateUsername = async (newName) => {
  try {
    const response = await axiosInstance.put(`/auth/updatename`, {
      NewName: newName,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get(`/auth/getuser`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

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

export const fetchActorData = async (id) => {
  try {
    const response = await axiosInstance.get(`/people/${id}`, {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch actor data:", error);
    throw error;
  }
};

export const fetchActorMovieCredits = async (id) => {
  try {
    const response = await axiosInstance.get(`/people/${id}/movie_credits`, {
      params: { language: "en-US" },
    });
    return response.data.cast;
  } catch (error) {
    console.error("Failed to fetch movie credits:", error);
    throw error;
  }
};

export const fetchActorTvCredits = async (id) => {
  try {
    const response = await axiosInstance.get(`/people/${id}/tv_credits`, {
      params: { language: "en-US" },
    });
    return response.data.cast;
  } catch (error) {
    console.error("Failed to fetch TV credits:", error);
    throw error;
  }
};

export const fetchSimilarTvSeries = async (id) => {
  try {
    const response = await axiosInstance.get(`/tv/${id}/similar`, {
      params: { language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch similar tv series", error);
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

export const fetchTrending = async (timeWindow) => {
  try {
    const response = await axiosInstance.get(`/trending`, {
      params: { timeWindow, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch trending media:", error);
    throw error;
  }
};

export const fetchDiscoverMovie = async ({
  page = 1,
  sortBy = "popularity.desc",
  genres = "",
  releaseYear = "",
} = {}) => {
  try {
    const response = await axiosInstance.get(`/movie/discover`, {
      params: { page, sortBy, genres, releaseYear },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch discover movies:", error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get(`/genre/movie`, {
      params: { language: "en-US" },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    throw error;
  }
};

export const fetchGenresTV = async () => {
  try {
    const response = await axiosInstance.get(`/genre/tv`, {
      params: { language: "en-US" },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    throw error;
  }
};

export const fetchDiscoverTV = async ({
  page = 1,
  sortBy = "popularity.desc",
  genres = "",
  firstAirDate = "",
} = {}) => {
  try {
    const response = await axiosInstance.get(`/tv/discover`, {
      params: { page, sortBy, genres, firstAirDate },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch discover movies:", error);
    throw error;
  }
};

export { IMAGE_BASE_URL };