import React, { useState, useEffect, useRef } from "react";
import { fetchPopularTvSeries, IMAGE_BASE_URL } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import MovieCard from "../compound/ItemCard";

const PopularTvSeries = () => {
  const [tvseries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadPopularTvSeries = async () => {
      setLoading(true);
      try {
        const [popularTvSeries] = await Promise.all([fetchPopularTvSeries()]);
        setTvSeries(popularTvSeries);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularTvSeries();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const goToTvSeriesDetail = (id) => {
    navigate(`TvSeriesDetail/${id}`);
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="relative flex items-center gap-4">
        <button className="scroll-button left" onClick={scrollLeft}>
          &#10094;
        </button>
        <div
          className="flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden scroll-smooth"
          ref={scrollRef}
        >
          {tvseries.map((tv) => (
            <MovieCard key={tv.id} onClick={() => goToTvSeriesDetail(tv.id)}>
              <MovieCard.Image
                src={`${IMAGE_BASE_URL}${tv.poster_path}`}
                alt={tv.name}
              >
                <MovieCard.Badge>
                  ⭐ {tv.vote_average.toFixed(1)}
                </MovieCard.Badge>
              </MovieCard.Image>
            </MovieCard>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default PopularTvSeries;
