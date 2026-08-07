import { fetchData } from "../api/Api";
import type { Genre } from "../interfaces/Genre";

export async function fetchGenresTv(): Promise<Genre[]> {
  const response = await fetchData<{ genres: Genre[] }>("/genre/tv");

  return response.genres;
}

export async function fetchGenresMovie(): Promise<Genre[]> {
  const response = await fetchData<{ genres: Genre[] }>("/genre/movie");

  return response.genres;
}
