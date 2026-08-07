import { useNavigate } from "react-router-dom";
import { Movie } from "../../../../interfaces/Movie";
import { IMAGE_BASE_URL } from "../../../../api/Api";
import "../../../../styles/Moviedetail.css"

type Props = {
  movie: Movie;
};
export default function SimilarMoviesItem({ movie }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="similar-card"
      onClick={() => navigate(`/MovieDetails/${movie.id}`)}
    >
      <img
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/120"
        }
        alt={movie.title}
        className="similar-image"
      />
      <p style={{ color: "black" }}>{movie.title}</p>
    </div>
  );
}
