import { fetchData } from "../api/Api";
import type { Actor } from "../interfaces/Actor";
import { PersonMovieCredits } from "../interfaces/credits/PersonMovieCredits";
import { PersonTvCredits } from "../interfaces/credits/PersonTvCredits";

export async function fetchActorData(id: number) {
    return fetchData<Actor>(`/people/${id}`,  {
        language: "en-US"
    })
}

export async function fetchActorMovieCredits(id: number) {
    return fetchData<PersonMovieCredits>(`/people/${id}/movie_credits`,  {
        language: "en-US"
    });
}

export async function fetchActorTvCredits(id: number) {
    return fetchData<PersonTvCredits>(`/people/${id}/tv_credits`,  {
        language: "en-US"
    })
}