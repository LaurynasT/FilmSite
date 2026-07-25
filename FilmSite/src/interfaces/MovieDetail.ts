import type { Genre } from "./Genre"
import { Production } from "./ProductionCompanies"
export interface MovieDetail {
    id: number,
    title: string,
    runtime: number,
    vote_average: number,
    overview: string,
    poster_path: string,
    realease_date: string,
    budget: number,
    revenue: number,
    status: string,
    homepage: string,
    genres: Genre[],
    production_companies: Production[],
    
}