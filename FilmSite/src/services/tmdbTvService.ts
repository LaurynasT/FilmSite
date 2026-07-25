import { fetchData } from "../api/Api";
import { Credits } from "../interfaces/credits/Credits";
import { Data } from "../interfaces/Data";
import { MediaTrailer } from "../interfaces/MediaTrailer";
import { MediaTv } from "../interfaces/MediaTv";
import { Seasons } from "../interfaces/Seasons";
import { TvDetail } from "../interfaces/TvDetail";

export async function fetchPopularTv() {
    return fetchData<Data<MediaTv>>("/tv/popular",  {
        language: "en-US"
    });
}

export async function fetchTvDetail(id: number) {
    return fetchData<TvDetail>(`/tv/${id}`,  {
        language: "en-US"
    });
}

export async function fetchTvCredits(id: number) {
    return fetchData<Credits>(`/tv/${id}/credits`,  {
        language: "en-US"
    })
}

export async function fetchDiscoverTv({
    page = 1,
    sortBy = "popularity.desc",
    genres = "",
    firstAirDate = "",
}: {
    page?: number;
    sortBy?: string;
    genres?: string;
    firstAirDate?: string;
} = {}): Promise<Data<MediaTv>> {
    return await fetchData<Data<MediaTv>>("/tv/discover",  {
        page,
        sortBy,
        genres,
        firstAirDate,
    });
}

export async function fetchSimilarTv(id: number) {
    return fetchData<Data<MediaTv>>(`/tv/${id}/similar`,  {
      language: "en-US"
    })
}

export async function fetchTvTrailer(id: number): Promise<string | null> {
    const data = await fetchData<MediaTrailer[]>(
        `/tv/${id}/trailer`
    );

    const officialTrailer = data[0];

    return officialTrailer
        ? `https://www.youtube.com/embed/${officialTrailer.key}`
        : null;
}

export async function fetchTvSeasons(id: number, seasonNumber: number){
    return fetchData<Seasons>(`/tv/${id}/seasons`, {
        language: "en-US",
        seasonNumber: seasonNumber,
    })
}