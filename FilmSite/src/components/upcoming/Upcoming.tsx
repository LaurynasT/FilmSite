import { useState, useEffect } from "react";
import { fetchUpcomingMovies } from "../../services/tmdbMovieService";
import type { Data } from "../../interfaces/Data";
import type { Movie } from "../../interfaces/Movie";
import UpcomingList from "./UpcomingList";

export default function UpcomingMovies()  {
  const [upcoming, setUpcomingMovies] = useState<Data<Movie>>();
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true)
    try{
      const response = await fetchUpcomingMovies();
      setUpcomingMovies(response);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  if (loading || !upcoming) return <p>Loading movies...</p>;

  return (
    <div>
      <div className="relative flex items-center gap-4">
          <UpcomingList upcoming={upcoming} /> 
      </div>
    </div>
  );
};


