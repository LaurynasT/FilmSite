import SearchIcon from "../assets/search.png"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchResult } from "../../interfaces/search/SearchResults";
import { fetchSearchMulti } from "../../services/tmdbSearchService";
import { Data } from "../../interfaces/Data";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Data<SearchResult> | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  async function loadSearch() {
    setLoading(true);

    try {
      const response = await fetchSearchMulti(query);

      setResults(response);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(() => {
      loadSearch();
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);


  const handleSelect = (item: SearchResult) => {
    setOpen(false);
    setQuery("");

    if (item.media_type === "movie") {
      navigate(`/MovieDetail/${item.id}`);
    }

    if (item.media_type === "tv") {
      navigate(`/TvSeriesDetail/${item.id}`);
    }

    if (item.media_type === "person") {
      navigate(`/ActorDetail/${item.id}`);
    }
  };


  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);

      navigate("/SearchResults", {
        state: {
          results,
          searchType: "all",
        },
      });
    }
  };


  return (
    <div
      className="relative flex items-center w-64"
      ref={ref}
    >
      <img
        src={SearchIcon}
        alt="search"
        className="absolute left-3 w-4 h-4 opacity-50 z-10"
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search movies, TV shows..."
        className="bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-full pl-9 pr-4 py-1.5 w-64 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
      />


      {loading && (
        <div className="absolute top-10">
          Loading...
        </div>
      )}


      {open && results && results.results.length > 0 && (
        <div className="absolute top-10 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-50 shadow-xl">
          {results?.results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              {item.poster_path || item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w45${
                    item.poster_path || item.profile_path
                  }`}
                  alt={item.title || item.name || ""}
                  className="w-8 h-10 object-cover rounded"
                />
              ) : (
                <div className="w-8 h-10 bg-zinc-700 rounded" />
              )}

              <div>
                <p className="text-white text-sm">
                  {item.title || item.name}
                </p>

                <p className="text-zinc-500 text-xs capitalize">
                  {item.media_type}
                </p>

                {item.release_date && (
                  <p className="text-zinc-500 text-xs">
                    {item.release_date.slice(0, 4)}
                  </p>
                )}

                {item.vote_average !== undefined && (
                  <p className="text-zinc-500 text-xs">
                    {item.vote_average.toFixed(1)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}