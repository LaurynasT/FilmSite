import SearchIcon from "../../Icons/search.png";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMulti } from '../Api/Api';


function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const searchResults = await searchMulti(query);
    navigate('/SearchResults', { state: { results: searchResults, searchType: 'all' } });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center">
      <img
        src={SearchIcon}
        alt="search"
        className="absolute left-3 w-4 h-4 opacity-50"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search movies, TV shows..."
        className="bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-full pl-9 pr-4 py-1.5 w-64 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
      />
    </div>
  );
}
export default Search;
