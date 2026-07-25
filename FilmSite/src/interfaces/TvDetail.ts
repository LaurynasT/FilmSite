import { Genre } from "./Genre";
import { Networks } from "./Networks";
import { Production } from "./ProductionCompanies";

export interface TvDetail {
    id: number,
    name: string,
    first_air_date: string,
    vote_average: number,
    number_of_seasons: number,
    number_of_episodes: number,
    overview: string,
    poster_path: string,
    realease_date: string,
    budget: number,
    revenue: number,
    status: string,
    homepage: string,
    genres: Genre[],
    production_companies: Production[],
    networks: Networks[],
}