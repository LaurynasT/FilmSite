import React, { useState, useEffect, useRef } from "react";
import { fetchPopularMovies, IMAGE_BASE_URL } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Compound/ItemCard";

const PopularMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);

        const lcpImage = popularMovies[0]?.poster_path;
        if (lcpImage) {
          const preloadLink = document.createElement("link");
          preloadLink.rel = "preload";
          preloadLink.href = `${IMAGE_BASE_URL}${lcpImage}`;
          preloadLink.as = "image";
          preloadLink.type = "image/jpeg";
          document.head.appendChild(preloadLink);
        }
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const goToMovieDetail = (id) => {
    navigate(`MovieDetail/${id}`);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
          {movies.map((movie) => (
            <MovieCard key={movie.id} onClick={() => goToMovieDetail(movie.id)}>
              <MovieCard.Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              >
                <MovieCard.Badge>
                  ⭐ {movie.vote_average.toFixed(1)}
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

export default PopularMovies;
