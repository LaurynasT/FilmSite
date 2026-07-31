import { fetchData } from "../api/Api";
import { Data } from "../interfaces/Data";
import { SearchResult } from "../interfaces/search/SearchResults";

export async function fetchSearchMulti(query: string): Promise<Data<SearchResult>>{
    return fetchData<Data<SearchResult>>("/search", {query, language: "en-US", include_adult: false})
}