import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../../api/Api";
import { Movie } from "../../../interfaces/Movie";
import "../../../styles/ActorPage.css";

type Props = {
  movie: Movie;
};

export default function ActorMovieItem({ movie }: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <div>
      <div
        className="movie-card"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}
