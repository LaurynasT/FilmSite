export interface Trending {
    id: number,
    title: string,
    vote_average: number,
    poster_path: string,
    backdrop_path: string,
    overview: string,
    release_date:string,
    genre_ids: number[],
    media_type:string,
    original_title:string,
}