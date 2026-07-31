import { useNavigate } from "react-router-dom"
import { Cast } from "../../../interfaces/credits/Credits"
import "../../../styles/Moviedetail.css"
import { IMAGE_BASE_URL } from "../../../api/Api"
import User from "../../assets/user.png"

type Props = {
    cast: Cast
}

export default function MovieCastItem({cast}: Props) {
    const navigate = useNavigate()
    return(
        <div className="cast-card" onClick={() => navigate(`/ActorDetail/${cast.id}`)}>
            <img
                  src={
                    cast.profile_path
                      ? `${IMAGE_BASE_URL}${cast.profile_path}`
                      : User
                  }
                  alt={cast.name}
                  className="cast-image"
                />
                <p className="cast-name">{cast.name}</p>
                <p className="cast-character">as {cast.character}</p>
        </div>
    )
}