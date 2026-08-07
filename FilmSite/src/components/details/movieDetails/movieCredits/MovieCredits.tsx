import { useEffect, useState } from "react";
import { Credits } from "../../../../interfaces/credits/Credits";
import { fetchMovieCredits } from "../../../../services/tmdbMovieService";
import MovieCastList from "./MovieCastList";
import MovieCrewList from "./MovieCrewList";
import "../../../../styles/Moviedetail.css"

type Props = {
    movieId: number;
}
export default function MovieCredits({movieId}: Props) {
    const [movieCredits, setMovieCredits] = useState<Credits>();
    const [loading, setLoading] = useState(true)

    async function loadMovieCredits() {
        setLoading(true)
       try { 
        const response = await fetchMovieCredits(movieId)
        setMovieCredits(response);
    } finally {
        setLoading(false)
    }
    }

    useEffect(() => {
        loadMovieCredits();
    }, [movieId])
    if(loading) return <p> Loading ...</p>
    if(!movieCredits) return <p> No data found.</p>
    return(
        <div>
            <h2 className="h2">Cast</h2>
            <div className="cast-scroll-wrapper">
            <MovieCastList credits={movieCredits}/>
            </div>
            <h2 className="h2">Crew</h2>
            <div className="cast-scroll-wrapper">
            <MovieCrewList credits={movieCredits}/>
            </div>
        </div>
    )
}