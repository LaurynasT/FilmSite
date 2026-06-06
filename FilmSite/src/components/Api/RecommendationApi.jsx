import axiosInstance from "./AxiosInstance";

export const getRecommendationsFromFavorites = async (mediaType) => {
  try {
    const response = await axiosInstance.get(`/recommendations`, {
      params: { mediaType },
    });
    if (response.data.recommendations?.length > 0) {
      const hasIds = response.data.recommendations.some((rec) => rec.id);
      if (!hasIds) console.warn("Recommendations do not have IDs.");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error.response?.data || error.message || "Failed to get recommendations";
  }
};

export const getUserFavorites = async (mediaType) => {
  try {
    const response = await axiosInstance.get(`/favorites`, {
      params: { mediaType },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error.response?.data || error.message || "Failed to get favorites";
  }
};

export const getRecommendationsFromText = async (prompt, mediaType) => {
  try {
    if (!prompt || prompt.trim() === "") throw new Error("Prompt is required");

    const payload = { prompt, mediaType: mediaType || null };
    const response = await axiosInstance.post(`/recommendations/text`, payload);

    if (response.data.recommendations?.length > 0) {
      const hasIds = response.data.recommendations.some((rec) => rec.id);
      if (!hasIds) console.warn("Recommendations do not have IDs.");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching text recommendations:", error);
    throw error.response?.data || error.message || "Failed to get recommendations";
  }
};

export const getMediaDetailsUrl = (mediaId, mediaType) => {
  if (!mediaId) return null;
  if (mediaType === "movie") return `/movie/${mediaId}`;
  if (mediaType === "tv") return `/tv/${mediaId}`;
  return `/media/${mediaId}`;
};

export const RecommendationService = {
  getRecommendationsFromFavorites,
  getUserFavorites,
  getRecommendationsFromText,
  getMediaDetailsUrl,
};

export default RecommendationService;