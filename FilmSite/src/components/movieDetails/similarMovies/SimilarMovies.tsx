import { useEffect, useState } from "react";
import { Data } from "../../../interfaces/Data";
import { Movie } from "../../../interfaces/Movie";
import { fetchSimilarMovies } from "../../../services/tmdbMovieService";
import SimilarMoviesList from "./SimilarMoviesList";
import "../../../styles/Moviedetail.css"

type Props = {
    movieId: number;
}
export default function SimilarMovies({movieId}: Props) {
    const [similarMovies, setSimilarMovies] = useState<Data<Movie>>()
    const [loading, setLoading] = useState(true)

    async function loadSimilarMovies() {
        setLoading(true)
        try{
        const response = await fetchSimilarMovies(movieId)
        setSimilarMovies(response);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadSimilarMovies();
    }, [movieId])
    if(loading) return <p>Loading ...</p>
    if(!similarMovies) return <p>No data found</p>
    return(
        <div className="similar-scroll-wrapper">
            <SimilarMoviesList similar={similarMovies} />
        </div>
    )
}