import { Data } from "../../../interfaces/Data"
import { Movie } from "../../../interfaces/Movie"
import "../../../styles/DiscoverMovie.css"
import DiscoverMovieItem from "./discoverMovieItem"

type Props = {
    movies: Data<Movie>
}
export default function DiscoverMovieList({movies}: Props ) {
    return(
        <div className="movies-list">
            {movies.results.map((movie) => (
                <DiscoverMovieItem key={movie.id} movie={movie}/>
            ))}
        </div>
    )
}