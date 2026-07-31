import { Genre } from "./Genre";
import { Networks } from "./Networks";
import { Production } from "./ProductionCompanies";

export interface MediaTv {
    id: number,
    name: string,
    vote_average: number,
    poster_path: string,
    overview: string,
    first_air_date:string,
}