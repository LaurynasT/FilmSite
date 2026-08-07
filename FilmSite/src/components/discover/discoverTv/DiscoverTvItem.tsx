import { useNavigate } from "react-router-dom";
import { MediaTv } from "../../../interfaces/MediaTv";
import { IMAGE_BASE_URL } from "../../../api/Api";
import "../../../styles/DiscoverTv.css"

type Props = {
  show: MediaTv;
};
export default function DiscoverTvItem({ show }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/TvSeriesDetail/${show.id}`)}
    >
      <img
        src={`${IMAGE_BASE_URL}${show.poster_path}`}
        alt={show.name}
      />
      <div className="movie-info">
        <h3>{show.name}</h3>
        <p>{show.overview?.substring(0, 150)}...</p>
      </div>
    </div>
  );
}
