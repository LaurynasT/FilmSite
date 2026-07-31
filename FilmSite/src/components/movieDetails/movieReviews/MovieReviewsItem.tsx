import { Reviews } from "../../../interfaces/Reviews";
import "../../../styles/Moviedetail.css"

type Props = {
  review: Reviews;
};
export default function MovieReviewsItem({ review }: Props) {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="comments-section">
      <p style={{ color: "black" }}>
        <strong>Name: </strong>
        {review.author}
      </p>
      <p style={{ color: "black" }}>{stripHtml(review.content)}</p>
    </div>
  );
}
