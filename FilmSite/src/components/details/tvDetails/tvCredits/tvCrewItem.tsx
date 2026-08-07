import { Crew } from "../../../../interfaces/credits/Credits";
import { IMAGE_BASE_URL } from "../../../../api/Api";
import User from "../../../assets/user.png";
import "../../../../styles/TvseriesDetail.css"

type Props = {
  crew: Crew;
};
export default function TvCrewItem({ crew }: Props) {
  
  return (
    <div
      className="cast-card"
    >
      <img
        src={crew.profile_path ? `${IMAGE_BASE_URL}${crew.profile_path}` : User}
        alt={crew.name}
        className="cast-image"
      />
      <p className="cast-name">{crew.name}</p>
      <p className="cast-character">as {crew.job}</p>
    </div>
  );
}
