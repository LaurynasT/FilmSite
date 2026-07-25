import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../../api/Api";
import { Movie } from "../../../interfaces/Movie";
import MovieCard from "../../Compound/ItemCard";

type Props = {
  movie: Movie;
};

export default function PopularMoviesItem({ movie }: Props) {
  const navigate = useNavigate();

  const goToMovieDetail = (id: number) => {
    navigate(`MovieDetail/${id}`);
  };
  return (
    <div>
      <MovieCard onClick={() => goToMovieDetail(movie.id)}>
        <MovieCard.Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
        >
          <MovieCard.Badge>⭐ {movie.vote_average.toFixed(1)}</MovieCard.Badge>
        </MovieCard.Image>
      </MovieCard>
    </div>
  );
}
