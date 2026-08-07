export interface UserMediaItem {
  id: number
  mediaId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string;
}