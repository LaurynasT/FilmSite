import { Genre } from "../../../interfaces/Genre";
import "../../../styles/DiscoverMovie.css"

type Props = {
  genres: Genre[];
  selectedGenres: number[];
  releaseYear: string;
  sortBy: string;
  onToggleGenre: (genre: number) => void;
  onReleaseYearChange: (releaseYear: string) => void;
  onSortByChange: (sortBy: string) => void;
};
export default function DiscoverSidebar({
  genres,
  selectedGenres,
  releaseYear,
  sortBy,
  onToggleGenre,
  onReleaseYearChange,
  onSortByChange,
}: Props) {
  
  return (
    <div className="sidebar">
      <input
        type="number"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => onReleaseYearChange(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Top Rated</option>
        <option value="release_date.desc">Newest</option>
      </select>

      <div className="genre-filter">
        <h3>Genres</h3>
        <div className="genre-options">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onToggleGenre(genre.id)}
              className={`genre-button ${selectedGenres.includes(genre.id) ? "selected" : ""}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {selectedGenres.length > 0 && (
        <div className="selected-genres-box">
          <h3>Selected Genres:</h3>
          <ul>
            {selectedGenres.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              return genre ? <li key={genre.id}>{genre.name}</li> : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
