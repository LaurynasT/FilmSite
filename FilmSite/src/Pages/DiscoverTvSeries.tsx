import { useState, useEffect } from "react";

import { fetchGenresTv } from "../services/tmdbGenreService";
import { Genre } from "../interfaces/Genre";
import { fetchDiscoverTv } from "../services/tmdbTvService";
import { Data } from "../interfaces/Data";
import { MediaTv } from "../interfaces/MediaTv";
import DiscoverSidebar from "../components/discover/discoverSidebar/DiscoverSidebar";
import DiscoverTvList from "../components/discover/discoverTv/DiscoverTvList";
import "../styles/DiscoverTv.css";

export default function DiscoverTVShowsPage() {
  const [shows, setShows] = useState<Data<MediaTv>>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [firstAirDate, setFirstAirDate] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingTv, setLoadingTv] = useState(true);

  async function loadGenres() {
    setLoadingGenres(true);
    try {
      const genresData = await fetchGenresTv();
      setGenres(genresData);
    } finally {
      setLoadingGenres(false);
    }
  }

  async function loadTvShows() {
    setLoadingTv(true);
    try {
      const response = await fetchDiscoverTv({
        page,
        sortBy,
        genres: selectedGenres.join(","),
        firstAirDate,
      });
      setShows(response);
    } finally {
      setLoadingTv(false);
    }
  }
  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    loadTvShows();
  }, [page, selectedGenres, firstAirDate, sortBy]);

  useEffect(() => {
  setPage(1);
}, [selectedGenres, firstAirDate, sortBy]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  if (loadingGenres) return <p>Loading...</p>;
  if (genres.length === 0) return <p>No genres</p>;
  if (!shows) return <p>Loading...</p>;
  return (
    <div className="discover-movies-page">
      <h2>Discover TV Shows</h2>

      <div className="content-container">
        <DiscoverSidebar
          genres={genres}
          selectedGenres={selectedGenres}
          releaseYear={firstAirDate}
          sortBy={sortBy}
          onToggleGenre={toggleGenre}
          onReleaseYearChange={setFirstAirDate}
          onSortByChange={setSortBy}
        />

        <div className="main-content">
          {loadingTv ? (
            <p>Loading TV shows...</p>
          ) : shows.results.length === 0 ? (
            <p>No TV shows found. Try changing your filters.</p>
          ) : (
            <DiscoverTvList shows={shows} />
          )}
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
