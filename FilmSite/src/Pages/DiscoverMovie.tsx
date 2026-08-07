import { useState, useEffect } from "react";
import "../styles/DiscoverMovie.css";
import DiscoverSidebar from "../components/discover/discoverSidebar/DiscoverSidebar";
import { fetchGenresMovie } from "../services/tmdbGenreService";
import { Genre } from "../interfaces/Genre";
import { fetchDiscoverMovie } from "../services/tmdbMovieService";
import { Movie } from "../interfaces/Movie";
import { Data } from "../interfaces/Data";
import DiscoverMovieList from "../components/discover/discoverMovie/discoverMovieList";

export default function DiscoverMoviesPage() {
  const [movies, setMovies] = useState<Data<Movie>>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);

  async function loadGenres() {
    setLoadingGenres(true);
    try {
      const response = await fetchGenresMovie();
      setGenres(response);
    } finally {
      setLoadingGenres(false);
    }
  }

  async function loadMovies() {
    setLoadingMovies(true);
    try {
      const response = await fetchDiscoverMovie({
        page,
        sortBy,
        genres: selectedGenres.join(","),
        releaseYear,
      });
      setMovies(response);
    } finally {
      setLoadingMovies(false);
    }
  }
  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
  setPage(1);
}, [selectedGenres, releaseYear, sortBy]);

  useEffect(() => {
    loadMovies();
  }, [page, selectedGenres, releaseYear, sortBy]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId],
    );
  };

  if (loadingGenres) return <p>Loading...</p>;
  if (genres.length === 0) return <p>No genres</p>;
  if (!movies) return <p>Loading...</p>;

  return (
    <div className="discover-movies-page">
      <div className="content-container">
        <DiscoverSidebar
          genres={genres}
          selectedGenres={selectedGenres}
          releaseYear={releaseYear}
          sortBy={sortBy}
          onToggleGenre={toggleGenre}
          onReleaseYearChange={setReleaseYear}
          onSortByChange={setSortBy}
        />

        <div className="main-content">
          {loadingMovies ? (
            <p>Loading Movies...</p>
          ) : movies.results.length === 0 ? (
            <p>No TV shows found. Try changing your filters.</p>
          ) : (
            <DiscoverMovieList movies={movies} />
          )}
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
              Previous
            </button>
            <span style={{ marginTop: 9 }}>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
