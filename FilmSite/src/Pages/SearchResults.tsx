import { useLocation } from "react-router-dom";
import "../styles/SearchResults.css";
import SearchResultsList from "../components/search/SearchResultsList";
import { SearchResult } from "../interfaces/search/SearchResults";
import { Data } from "../interfaces/Data";
import "../styles/SearchResults.css"

type SearchState = {
  results: Data<SearchResult>;
  searchType: "all" | "movie" | "tv" | "person";
};
export default function SearchResults() {
  const location = useLocation();
   const {
    results = null,
    searchType = "all",
  } = (location.state as SearchState) || {};

  if (!results) {
  return <p>No results found</p>;
}
 
  return (
    <div className="results-container">
      <h1>Search Results</h1>
      <SearchResultsList results={results} searchType={searchType} />
    </div>
  );
}
