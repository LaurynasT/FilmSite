import { Data } from "../../../../interfaces/Data";
import { Reviews } from "../../../../interfaces/Reviews";
import MovieReviewsItem from "./MovieReviewsItem";

type Props = {
  reviews: Data<Reviews>;
};

export default function MovieReviewList({ reviews }: Props) {
  return (
    <div>
      {reviews.results.map((review) => (
        <MovieReviewsItem key={review.id} review={review} />
      ))}
    </div>
  );
}
