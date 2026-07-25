import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../../services/tmdbMovieService";
import type { Movie } from "../../../interfaces/Movie";
import type { Data } from "../../../interfaces/Data";
import PopularMoviesList from "./PopularMoviesList";

export default function PopularMovies() {
  const [movies, setMovies] = useState<Data<Movie> | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    try {
      const response = await fetchPopularMovies();
      setMovies(response);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  if (loading || !movies) return <p>Loading movies...</p>;

  return (
    <div>
      <div className="relative flex items-center gap-4">
        <PopularMoviesList popular={movies} />
      </div>
    </div>
  );
}
