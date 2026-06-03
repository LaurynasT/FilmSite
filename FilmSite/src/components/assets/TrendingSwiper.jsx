import React, { useState, useEffect, useRef } from 'react';
import { fetchTrending, fetchGenres, fetchGenresTV } from '../Api/Api';
import { useNavigate } from 'react-router-dom';

const TrendingSwiper = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [genreMap, setGenreMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const [data, movieGenres, tvGenres] = await Promise.all([
        fetchTrending('week'),
        fetchGenres(),
        fetchGenresTV(),
      ]);

  
      const map = {};
      [...movieGenres, ...tvGenres].forEach((g) => {
        map[g.id] = g.name;
      });

      setGenreMap(map);
      setTrendingData(data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % trendingData.length);
  };

  const navigateToDetail = (item) => {
    if (item.media_type === 'movie') navigate(`/MovieDetail/${item.id}`);
    else if (item.media_type === 'tv') navigate(`/TvSeriesDetail/${item.id}`);
    else if (item.media_type === 'person') navigate(`/ActorDetail/${item.id}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (trendingData.length === 0) return;
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, [trendingData, currentIndex]);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const handleDotClick = (index) => {
    goToSlide(index);
    resetInterval();
  };

  if (loading) {
    return <div className="w-full bg-zinc-900 animate-pulse" style={{ height: '420px' }} />;
  }

  if (trendingData.length === 0) return null;

  const item = trendingData[currentIndex];

  
  const genreNames = (item.genre_ids || [])
    .slice(0, 3)
    .map((id) => genreMap[id])
    .filter(Boolean);

  return (
    <div className="relative w-full overflow-hidden bg-black select-none" style={{ height: '420px' }}>
    
      {trendingData.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === currentIndex ? 1 : 0, zIndex: i === currentIndex ? 1 : 0 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${slide.backdrop_path}`}
            alt={slide.title || slide.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

     
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 px-12 sm:px-6">
        
        <h1
          className="text-white font-black text-5xl sm:text-2xl mb-3 max-w-lg leading-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {item.title || item.name}
        </h1>

      
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="text-zinc-300 text-sm font-medium">
            {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)}
          </span>
          {item.vote_average > 0 && (
            <>
              <span className="text-zinc-500 text-xs">•</span>
              <span
                className="bg-yellow-400 text-black text-xs font-black px-1.5 py-0.5 rounded"
                style={{ fontFamily: 'Impact, sans-serif' }}
              >
                IMDb
              </span>
              <span className="text-white text-sm font-semibold">
                {item.vote_average.toFixed(1)}
              </span>
            </>
          )}
          {item.media_type && (
            <>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-300 text-sm capitalize">
                {item.media_type === 'tv' ? 'TV Series' : item.media_type}
              </span>
            </>
          )}
        </div>

        
        {genreNames.length > 0 && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {genreNames.map((genre) => (
              <span
                key={genre}
                className="text-xs text-zinc-300 border border-zinc-600 px-2.5 py-0.5 rounded-full bg-zinc-800/50"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        <p className="text-zinc-300 text-sm leading-relaxed max-w-sm mb-6 line-clamp-3">
          {item.overview}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateToDetail(item)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold px-6 py-2.5 rounded transition-all duration-150 text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Trailer
          </button>
          <button
            onClick={() => navigateToDetail(item)}
            className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700/80 active:scale-95 text-white font-semibold px-6 py-2.5 rounded transition-all duration-150 text-sm border border-zinc-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </button>
        </div>
      </div>

      
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {trendingData.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-red-600 w-3 h-3'
                : 'bg-zinc-500 hover:bg-zinc-300 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
    </div>
  );
};

export default TrendingSwiper;