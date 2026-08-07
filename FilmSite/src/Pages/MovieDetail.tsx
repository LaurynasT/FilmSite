
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import "../styles/Moviedetail.css";
import "react-toastify/dist/ReactToastify.css";
import SimilarMovies from "../components/details/movieDetails/similarMovies/SimilarMovies";
import MovieCredits from "../components/details/movieDetails/movieCredits/MovieCredits";
import MovieReviews from "../components/details/movieDetails/movieReviews/MovieReviews";
import MovieDetailed from "../components/details/movieDetails/MovieDetailed";
import { fetchMovieDetail } from "../services/tmdbMovieService";
import type { MovieDetail } from "../interfaces/MovieDetail";

export default function MovieDetail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();
  const [loading, setLoading] = useState(true);


 async function loadMovieData() {
  setLoading(true);
  try {
    const response = await fetchMovieDetail(Number(id));
    setMovieDetail(response);
  } finally {
    setLoading(false);
  }
 }

  useEffect(() => {
    loadMovieData();
  }, [id]);


  if (loading) return <p>Loading movie details...</p>;
  if (!movieDetail)
    return <p style={{ marginTop: "60px" }}>No movie data found.</p>;

  return (
    <div className="moviedetail">
      <div className="moviedetailwidth">
        <div className="background">
          <MovieDetailed movieDetail={movieDetail} />
        </div>

        <div className="cast-section">
          <MovieCredits movieId={movieDetail.id} />
        </div>
        <div className="similar-section">
          <h2 style={{ color: "black" }}>Similar Movies</h2>
          <SimilarMovies movieId={movieDetail.id} />
        </div>
        <div className="comments-container">
          <MovieReviews movieId={movieDetail.id} />
        </div>
      </div>
    </div>
  );
};

