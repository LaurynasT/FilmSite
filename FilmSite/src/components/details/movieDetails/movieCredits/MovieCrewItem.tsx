import { IMAGE_BASE_URL } from "../../../../api/Api"
import { Crew } from "../../../../interfaces/credits/Credits"
import "../../../../styles/Moviedetail.css"
import User from "../../../assets/user.png"

type Props = {
    crew: Crew
}

export default function MovieCrewItem({crew}: Props) {

    return(
        <div>
            <div className="cast-card">
            <img
                  src={
                    crew.profile_path
                      ? `${IMAGE_BASE_URL}${crew.profile_path}`
                      : User
                  }
                  alt={crew.name}
                  className="cast-image"
                />
                <p className="cast-name">{crew.name}</p>
                <p className="cast-character">as {crew.job}</p>
        </div>
        </div>
    )
}