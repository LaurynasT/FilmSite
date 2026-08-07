import { useNavigate } from "react-router-dom";
import { MediaTv } from "../../../../interfaces/MediaTv";
import { IMAGE_BASE_URL } from "../../../../api/Api";
import "../../../../styles/ActorPage.css"

type Props = {
  tv: MediaTv;
};
export default function ActorTvItem({ tv }: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/TvSeriesDetail/${tv.id}`);
  };

  return (
    <div>
      <div
        className="movie-card"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={`${IMAGE_BASE_URL}/${tv.poster_Path}`}
          alt={tv.name}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3>{tv.name}</h3>
          <p>{tv.first_air_date}</p>
        </div>
      </div>
    </div>
  );
}
