import { useNavigate } from "react-router-dom";
import { MediaTv } from "../../../../interfaces/MediaTv";
import "../../../../styles/TvseriesDetail.css"
import { IMAGE_BASE_URL } from "../../../../api/Api";

type Props = {
  show: MediaTv;
};

export default function SimilarTvItem({ show }: Props) {
  const navigate = useNavigate();
  return (
    <div className="similar-card" onClick={() => navigate(`/tv/${show.id}`)}>
      <img
        src={
          show.poster_path
            ? `${IMAGE_BASE_URL}${show.poster_path}`
            : "https://via.placeholder.com/120"
        }
        alt={show.name}
        className="similar-image"
      />
      <p style={{ color: "black" }}>{show.name}</p>
    </div>
  );
}
