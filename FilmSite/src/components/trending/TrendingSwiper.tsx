import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrending } from "../../services/tmdbTrendingService";
import {
  fetchGenresMovie,
  fetchGenresTv,
} from "../../services/tmdbGenreService";
import { Trending } from "../../interfaces/Trending";
import { Data } from "../../interfaces/Data";
import { Genre } from "../../interfaces/Genre";
import TrendingSlide from "./TrendingSlide";
import TrendingDots from "./TrendingDots";

export default function TrendingSwiper() {
  const [trendingData, setTrendingData] = useState<Data<Trending>>();
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useNavigate();

  async function loadData() {
    setLoading(true);

    try {
      const [trending, movieGenresResponse, tvGenresResponse] =
        await Promise.all([
          fetchTrending(),
          fetchGenresMovie(),
          fetchGenresTv(),
        ]);
      const movieGenres = movieGenresResponse ?? movieGenresResponse;
      const tvGenres = tvGenresResponse ?? tvGenresResponse;
      const map: Record<number, string> = {};

      const allGenres: Genre[] = [...movieGenres, ...tvGenres];

      allGenres.forEach((genre) => {
        map[genre.id] = genre.name;
      });

      setGenreMap(map);

      setTrendingData({
        ...trending,
        results: trending.results.slice(0, 6),
      });
    } finally {
      setLoading(false);
    }
  }

  function nextSlide() {
    if (!trendingData) return;

    const length = trendingData.results.length;

    setCurrentIndex((prev) => (prev + 1) % length);
  }

  function goToSlide(index: number) {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setCurrentIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }

  function navigateToDetail(item: Trending) {
    if (item.media_type === "movie") {
      navigate(`/MovieDetail/${item.id}`);
    }

    if (item.media_type === "tv") {
      navigate(`/TvSeriesDetail/${item.id}`);
    }

    if (item.media_type === "person") {
      navigate(`/ActorDetail/${item.id}`);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!trendingData) return;

    intervalRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trendingData]);

  if (loading) {
    return <div className="h-[420px] bg-zinc-900 animate-pulse" />;
  }

  if (!trendingData || trendingData.results.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-black select-none"
      style={{height: "420px",}}>
      {trendingData.results.map((item, index) => (
        <TrendingSlide
          key={item.id}
          item={item}
          active={index === currentIndex}
          genreMap={genreMap}
          onNavigate={navigateToDetail}
        />
      ))}

      <TrendingDots
        count={trendingData.results.length}
        current={currentIndex}
        onChange={goToSlide}
      />
    </div>
  );
}
