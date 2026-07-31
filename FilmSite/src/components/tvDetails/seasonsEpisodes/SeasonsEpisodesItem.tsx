import { IMAGE_BASE_URL } from "../../../api/Api";
import { Episode } from "../../../interfaces/Seasons";
import "../../../styles/TvseriesDetail.css"

type Props = {
  episode: Episode;
};
export default function SeasonsEpisodesItem({ episode }: Props) {
  return (
    <div className="seasons-card">
      <img
        src={
          episode?.still_path
            ? `${IMAGE_BASE_URL}${episode?.still_path}`
            : "https://via.placeholder.com/200"
        }
        alt={episode?.name}
        className="seasons-flex-img"
      />
      <p>
        {episode?.episode_number}. {episode?.name}
      </p>
    </div>
  );
}
