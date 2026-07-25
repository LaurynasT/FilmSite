import { fetchData } from "../api/Api";
import type { Data } from "../interfaces/Data";
import type { Trending } from "../interfaces/Trending";

export async function fetchTrending() {
    return fetchData<Data<Trending>>(`/trending`,  {
        language: "en-US"
    });
}