import SearchIcon from "../Icons/search.png";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMulti } from "../Api/Api";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const timeout = setTimeout(async () => {
      const data = await searchMulti(query);
      setResults(data?.slice(0, 6) || []);
      setOpen(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (item) => {
    setOpen(false);
    setQuery("");
    navigate(
      `/${item.media_type === "tv" ? "TvSeriesDetail" : "MovieDetail"}/${item.id}`,
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      navigate("/SearchResults", {
        state: { results: { results }, searchType: "all" },
      });
    }
  };

  return (
    <div className="relative flex items-center w-64" ref={ref}>
      <img
        src={SearchIcon}
        alt="search"
        className="absolute left-3 w-4 h-4 opacity-50 z-10"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search movies, TV shows..."
        className="bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-full pl-9 pr-4 py-1.5 w-64 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
      />

      {open && results.length > 0 && (
        <div className="absolute top-10 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-50 shadow-xl">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              {item.poster_path || item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w45${item.poster_path || item.profile_path}`}
                  alt=""
                  className="w-8 h-10 object-cover rounded"
                />
              ) : (
                <div className="w-8 h-10 bg-zinc-700 rounded" />
              )}
              <div className="">
                <p className="text-white text-sm">{item.title || item.name}</p>
                <p className="text-zinc-500 text-xs capitalize">
                  {item.media_type}
                </p>
                <p className="text-zinc-500 text-xs">
                  {item.release_date?.slice(0, 4)}
                </p>
                <p className="text-zinc-500 text-xs">
                  {item.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
