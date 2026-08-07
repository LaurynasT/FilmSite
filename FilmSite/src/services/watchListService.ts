import { deleteData, fetchData, postData } from "../api/Api";
import type { UserMediaItem } from "../interfaces/UserMediaItem";

export async function getWatchList(mediaType?: "movie" | "tv") {
  return await fetchData<UserMediaItem[]>(
    "/WatchList",
    mediaType ? { mediaType } : undefined,
  );
}

export async function addToWatchList(
  mediaId: number,
  mediaType: "movie" | "tv",
  title: string,
  posterPath: string,
) {
  return await postData<UserMediaItem>(`/WatchList/add`, {
    mediaId,
    mediaType,
    title,
    posterPath,
  });
}

export async function removeFromWatchList(
  mediaId: number,
  mediaType: "movie" | "tv",
) {
  return await deleteData<void>(
    `/WatchList/remove?mediaId=${mediaId}&mediaType=${mediaType}`,
  );
}

export async function checkWatchList(
  mediaId: number,
  mediaType: "movie" | "tv",
): Promise<boolean> {
  const response = await fetchData<{ isInWatchList: boolean }>(
    `/WatchList/check?mediaId=${mediaId}&mediaType=${mediaType}`,
  );

  return response.isInWatchList;
}
