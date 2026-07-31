import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { IMAGE_BASE_URL } from "../../api/Api";
import { MovieDetail } from "../../interfaces/MovieDetail";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {
  movieDetail: MovieDetail;
};

export default function MovieDetailed({ movieDetail }: Props) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const rating = movieDetail.vote_average * 10;

  const handleToggleFavorite = (isFavorite) => {
    if (!isAuthenticated) {
      toast("Need to be logged in", { type: "error" });
      return;
    } else {
      toast(`Movie ${isFavorite ? "added to" : "removed from"} favorites`, {
        type: isFavorite ? "success" : "info",
      });
    }
  };

  return (
    <div>
      <div className="moviedetail-container">
        <img
          src={`${IMAGE_BASE_URL}${movieDetail.poster_path}`}
          alt={movieDetail.title}
          className="moviedetail-img"
        />
        {trailer ? (
          <div className="movie-trailer-container iframe">
            <iframe
              src={trailer}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
      <div className="moviedetail-genres">
        {movieDetail.genres.map((genre, index) => (
          <span key={index} className="movie-genre-badge">
            {genre.name}
          </span>
        ))}
      </div>
      <div style={{ width: 50, height: 50, margin: "10px" }}>
        <CircularProgressbar
          value={rating}
          text={`${rating}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: rating > 70 ? "green" : rating > 40 ? "orange" : "red",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
      <div style={{ marginTop: 15 }}>
        <FavoriteButton
          mediaId={movieDetail.id}
          mediaType="movie"
          title={movieDetail.title}
          posterPath={movieDetail.poster_path}
          onToggle={handleToggleFavorite}
        />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
      <div style={{ marginTop: 17 }}>
        <WatchListButton
          mediaId={movieDetail.id}
          mediaType="movie"
          title={movieDetail.title}
          posterPath={movieDetail.poster_path}
          onToggle={(isAdded) =>
            console.log(
              isAdded ? "Added to watchlist" : "Removed from watchlist",
            )
          }
        />
      </div>
      <div>
        <div className="moviedetail-container3">
          <p>
            <strong>Production companies: </strong>
            {movieDetail.production_companies.map((company, index) => (
              <span
                key={company.id}
                onClick={() => navigate(`/CompanyDetail/${company.id}`)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {company.name}
                {index < movieDetail.production_companies.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p>
            <strong>Budget:</strong> ${movieDetail.budget.toLocaleString()}
          </p>
          <p>
            <strong>Revenue:</strong> ${movieDetail.revenue.toLocaleString()}
          </p>
          <p>
            <strong>Overview:</strong> {movieDetail.overview}
          </p>
          <p>
            <strong>Status:</strong> {movieDetail.status}
          </p>
        </div>
      </div>
    </div>
  );
}
