import { IMAGE_BASE_URL } from "../../../api/Api";
import type { TvDetail } from "../../../interfaces/TvDetail";
import { ToastContainer, toast } from "react-toastify";
import FavoriteButton from "../../media/FavoriteButton";
import WatchListButton from "../../media/WatchListButton";
import { useAuth } from "../../../context/AuthContext";

type Props = {
  tv: TvDetail;
};
export default function TvDetails({ tv }: Props) {
  const { isAuthenticated } = useAuth();

  const handleToggleFavorite = (isFavorite: boolean) => {
    toast(`TV Show ${isFavorite ? "added to" : "removed from"} favorites`, {
      type: isFavorite ? "success" : "info",
    });
  };

  const handleToggleWatchList = (isInWatchList: boolean) => {
    if (!isAuthenticated) {
      toast("Need to be logged in", { type: "error" });
      return;
    }

    toast(`Tv Show ${isInWatchList ? "added to" : "removed from"} watchlist`, {
      type: isInWatchList ? "success" : "info",
    });
  };
  return (
    <>
      <div className="tvDetail-container">
        <img
          src={`${IMAGE_BASE_URL}${tv.poster_path}`}
          alt={tv.name}
          className="tvDetail-img"
        />
        {/* {trailer ? (
          <div className="trailer-container iframe">
            <iframe
              src={trailer}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No trailer available</p>
        )} */}
      </div>
      <div className="tvDetail-genres">
        {tv.genres.map((genre, index) => (
          <span key={index} className="genre-badge">
            {genre.name}
          </span>
        ))}
      </div>

      <div className="tvDetail-container2">
        <h2>
          {tv.name} ({tv.first_air_date?.split("-")[0]})
        </h2>
        <p>{tv.number_of_seasons} Seasons</p>
        <p>Rating: {tv.vote_average.toFixed(1)}/10</p>
        <div style={{ marginTop: 15 }}>
          <FavoriteButton
            mediaId={tv.id}
            mediaType="tv"
            title={tv.name}
            posterPath={tv.poster_path}
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
            mediaId={tv.id}
            mediaType="tv"
            title={tv.name}
            posterPath={tv.poster_path}
            onToggle={handleToggleWatchList}
          />
        </div>
      </div>
      <div className="tvDetail-container3">
        <p>
          <strong>Production companies:</strong>{" "}
          {tv.production_companies.map((company) => company.name).join(", ")}
        </p>
        <p>
          <strong>Networks:</strong>{" "}
          {tv.networks.map((network) => network.name).join(", ")}
        </p>
        <p>
          <strong>Overview:</strong> {tv.overview}
        </p>
        <p>
          <strong>Status:</strong> {tv.status}
        </p>
      </div>
      <div>
        <p className="tvDetail-container3-home">
          <strong>Homepage: </strong> <br />
          {tv.homepage ? (
            <a href={tv.homepage} target="_blank" rel="noopener noreferrer">
              {tv.homepage}
            </a>
          ) : (
            "No official homepage available"
          )}
        </p>
      </div>
    </>
  );
}
