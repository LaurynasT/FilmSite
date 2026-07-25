import { fetchData } from "../api/Api";
import type { Genre } from "../interfaces/Genre";

export async function fetchGenresTv() {
    return fetchData<Genre>(`/genre/tv`,  {
        language: "en-US"
    })
}

export async function fetchGenresMovie() {
    return fetchData<Genre>(`/genre/movie`,  {
        language: "en-US"
    })
}