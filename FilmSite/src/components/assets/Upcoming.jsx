import React, { useState, useEffect, useRef } from "react";
import { fetchUpcomingMovies, IMAGE_BASE_URL } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import MovieCard from "../compound/ItemCard";

const UpcomingMovies = () => {
  const [upcoming, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      setLoading(true);
      try {
        const [upcomingMovies] = await Promise.all([fetchUpcomingMovies()]);
        setUpcomingMovies(upcomingMovies);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    loadUpcomingMovies();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const goToMovieDetail = (id) => {
    navigate(`MovieDetail/${id}`);
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
          {upcoming.map((upcomings) => (
            <MovieCard
              key={upcomings.id}
              onClick={() => goToMovieDetail(upcomings.id)}
            >
              <MovieCard.Image
                src={`${IMAGE_BASE_URL}${upcomings.poster_path}`}
                alt={upcomings.title}
              >
                <MovieCard.Badge>
                  ⭐ {upcomings.vote_average.toFixed(1)}
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

export default UpcomingMovies;
