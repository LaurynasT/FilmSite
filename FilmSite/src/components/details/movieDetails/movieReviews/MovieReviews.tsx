import { useEffect, useState } from "react";
import { Data } from "../../../../interfaces/Data";
import { Reviews } from "../../../../interfaces/Reviews";
import MovieReviewList from "./MovieReviewsList";
import { fetchMovieReviews } from "../../../../services/tmdbMovieService";

type Props = {
  movieId: number;
};
export default function MovieReviews({ movieId }: Props) {
  const [movieReviews, setMovieReviews] = useState<Data<Reviews>>();
  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    setLoading(true);
    try {
      const response = await fetchMovieReviews(movieId);
      setMovieReviews(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, [movieId]);

  if (!movieReviews) return <p>No data Found</p>;
  if (loading) return <p>Loading</p>;
  return (
    <div>
      <h2>Comments</h2>
      <MovieReviewList reviews={movieReviews} />
    </div>
  );
}
