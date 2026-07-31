import { Data } from "../../interfaces/Data";
import { SearchResult } from "../../interfaces/search/SearchResults";
import SearchResultsItem from "./SearchResultsItem";
import "../../styles/SearchResults.css"

type Props = {
  results: Data<SearchResult>;
  searchType: "all" | "movie" | "tv" | "person";
};
export default function SearchResultsList({ results, searchType }: Props) {
  const filteredResults =
    searchType === "all"
      ? results.results
      : results.results.filter((result) => result.media_type === searchType);
  return (
    <div>
      <div className="card-grid">
        {filteredResults.map((result) => (
          <SearchResultsItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}
