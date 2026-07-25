import { fetchData} from "../api/Api"
import type { Movie } from "../interfaces/Movie";
import { MovieDetail } from "../interfaces/MovieDetail";
import type { Data } from "../interfaces/Data";
import { Credits } from "../interfaces/credits/Credits";
import { MediaTrailer } from "../interfaces/MediaTrailer";
import { Reviews } from "../interfaces/Reviews";

export async function fetchPopularMovies() {
    return fetchData<Data<Movie>>("/movie/popular",  {
        language: "en-US"
    });
}

export async function fetchMovieDetail(id: number) {
    return fetchData<MovieDetail>(`/movie/${id}`,  {
        language: "en-US"
    });
}

export async function fetchUpcomingMovies() {
    return fetchData<Data<Movie>>("/movie/upcoming",  {
       language: "en-US"
    });
}

export async function fetchSimilarMovies(id: number) {
    return fetchData<Data<Movie>>(`/movie/${id}/similar`,  {
      language: "en-US"
    })
}

export async function fetchDiscoverMovie({
    page = 1,
    sortBy = "popularity.desc",
    genres = "",
    releaseYear = "",
}: {
    page?: number;
    sortBy?: string;
    genres?: string;
    releaseYear?: string;
} = {}): Promise<Data<Movie>> {
    return fetchData<Data<Movie>>("/movie/discover", {
        page,
        sortBy,
        genres,
        releaseYear,
    });
}

export async function fetchMovieCredits(id: number) {
    return fetchData<Credits>(`/movie/${id}/credits`,  {
        language: "en-US"
    })
}

export async function fetchMovieTrailer(id: number): Promise<string | null> {
    const data = await fetchData<MediaTrailer[]>(
        `/movie/${id}/trailer`
    );

    const officialTrailer = data.find(
        (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
    );

    return officialTrailer
        ? `https://www.youtube.com/embed/${officialTrailer.key}`
        : null;
}
export async function fetchMovieReviews(id: number) {
    return fetchData<Data<Reviews>>(`/movie/${id}/reviews`,  {
        language: "en-US"
    })
}
