import { useEffect, useState } from "react";
import { PersonMovieCredits } from "../../../interfaces/credits/PersonMovieCredits";
import { fetchActorMovieCredits } from "../../../services/tmdbActorService";
import AcotrMovieList from "./ActorMoviesList";

type Props = {
  actorId: number;
};
export default function ActorMovies({ actorId }: Props) {
  const [movieCredits, setMovieCredits] = useState<PersonMovieCredits | null>(
    null,
  );

  async function loadMovieCredits(actorId: number) {
    const response = await fetchActorMovieCredits(actorId);
    setMovieCredits(response);
  }
  useEffect(() => {
    loadMovieCredits(actorId);
  }, [actorId]);

  return (
    <div>
      <AcotrMovieList movies={movieCredits} />
    </div>
  );
}
