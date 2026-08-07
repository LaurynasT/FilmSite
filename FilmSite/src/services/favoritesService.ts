import { deleteData, fetchData, postData } from "../api/Api";
import type { UserMediaItem } from "../interfaces/UserMediaItem";

export async function getFavorites(mediaType?: "movie" | "tv",) {
  return await fetchData<UserMediaItem[]>(
    "/favorites",
    mediaType ? { mediaType } : undefined
  );
}

export async function addFavorite(mediaId: number, mediaType: "movie" | "tv", title: string, posterPath: string) {
    return await postData<UserMediaItem>(`/favorites/add`, {
        mediaId, mediaType, title, posterPath
    })
}

export async function removeFavorite(mediaId: number, mediaType: "movie" | "tv",) {
    return await deleteData<void>(`/favorites/remove?mediaId=${mediaId}&mediaType=${mediaType}`)
}

export async function checkFavorite(
  mediaId: number,
  mediaType: "movie" | "tv",
): Promise<boolean> {
  const response = await fetchData<{ isFavorite: boolean }>(
    `/favorites/check?mediaId=${mediaId}&mediaType=${mediaType}`
  );

  return response.isFavorite;
}