import { IMAGE_BASE_URL } from "../../../api/Api";
import MovieCard from "../../Compound/ItemCard";
import { MediaTv } from "../../../interfaces/MediaTv";
import { useNavigate } from "react-router-dom";

type Props = {
    tv: MediaTv
}
export default function PopularTvItem({ tv }: Props) {
      const navigate = useNavigate();
  const goToTvSeriesDetail = (id: number) => {
    navigate(`TvSeriesDetail/${id}`);
  };

  return (
      <MovieCard onClick={() => goToTvSeriesDetail(tv.id)}>
        <MovieCard.Image
          src={`${IMAGE_BASE_URL}${tv.poster_path}`}
          alt={tv.name}
        >
          <MovieCard.Badge>⭐ {tv.vote_average.toFixed(1)}</MovieCard.Badge>
        </MovieCard.Image>
      </MovieCard>
  );
}
