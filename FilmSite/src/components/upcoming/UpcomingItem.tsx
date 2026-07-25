import { useNavigate } from "react-router-dom"
import { IMAGE_BASE_URL } from "../../api/Api"
import { Movie } from "../../interfaces/Movie"
import MovieCard from "../Compound/ItemCard"

type Props = {
    upcoming: Movie
}

export default function UpcomingItem({upcoming}: Props) {

const navigate = useNavigate();
const goToMovieDetail = (id: number) => {
   navigate(`MovieDetail/${id}`);
};

    return (
        <div>
            <MovieCard
              onClick={() => goToMovieDetail(upcoming.id)}
            >
              <MovieCard.Image
                src={`${IMAGE_BASE_URL}${upcoming.poster_path}`}
                alt={upcoming.title}
              >
                <MovieCard.Badge>
                  ⭐ {upcoming.vote_average.toFixed(1)}
                </MovieCard.Badge>
              </MovieCard.Image>
            </MovieCard>
        </div>
    )
}