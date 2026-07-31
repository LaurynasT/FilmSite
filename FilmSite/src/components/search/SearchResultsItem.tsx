import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../api/Api";
import { SearchResult } from "../../interfaces/search/SearchResults";
import "../../styles/SearchResults.css"

type Props = {
  result: SearchResult;
};
export default function SearchResultsItem({ result }: Props) {
  const getLinkPath = (result: SearchResult) => {
    if (result.media_type === "movie") return `/MovieDetail/${result.id}`;
    if (result.media_type === "tv") return `/TvSeriesDetail/${result.id}`;
    if (result.media_type === "person") return `/ActorDetail/${result.id}`;
    return "#";
  };
  return (
    <div>
      <Link to={getLinkPath(result)} className="result-card">
        <img
          src={
            result.poster_path || result.profile_path
              ? `${IMAGE_BASE_URL}${result.poster_path || result.profile_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={result.title || result.name}
        />
        <div className="result-info">
          <h3>{result.title || result.name}</h3>
          <p>
            {result.overview
              ? result.overview.slice(0, 100) + "..."
              : result.known_for_department
                ? `Known for: ${result.known_for_department}`
                : "No overview available."}
          </p>
          <span className="badge">
            {result.media_type === "movie"
              ? "Movie"
              : result.media_type === "tv"
                ? "TV Show"
                : "Actor"}
          </span>
        </div>
      </Link>
    </div>
  );
}
