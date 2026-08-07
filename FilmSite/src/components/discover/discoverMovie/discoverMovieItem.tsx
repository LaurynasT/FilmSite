import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../../api/Api";
import { Movie } from "../../../interfaces/Movie";
import "../../../styles/DiscoverMovie.css"

type Props = {
  movie: Movie;
};
export default function DiscoverMovieItem({ movie }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/MovieDetail/${movie.id}`)}
    >
      <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.overview && movie.overview.substring(0, 150)}...</p>
      </div>
    </div>
  );
}
