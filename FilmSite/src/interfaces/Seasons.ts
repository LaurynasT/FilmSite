export interface Episode {
    id: number,
    name: string,
    still_path: string,
    episode_number: number,
    vote_average: number
}

export interface Seasons {
    id: number,
    name: string,
    season_number: number,
    vote_average: number,
    episodes: Episode[]
}