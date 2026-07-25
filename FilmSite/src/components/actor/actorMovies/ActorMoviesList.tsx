import { PersonMovieCredits } from "../../../interfaces/credits/PersonMovieCredits";
import ActorMovieItem from "./ActorMoviesItem";
import "../../../styles/ActorPage.css";

type Props = {
  movies: PersonMovieCredits | null;
};

export default function AcotrMovieList({ movies }: Props) {
  return (
    <div className="known-for-grid">
      {movies?.cast.map((movie) => (
        <div key={movie.id}>
          <ActorMovieItem movie={movie} />
        </div>
      ))}
    </div>
  );
}
