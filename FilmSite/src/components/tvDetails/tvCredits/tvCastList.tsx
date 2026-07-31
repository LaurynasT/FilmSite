import { useRef } from "react";
import { Credits } from "../../../interfaces/credits/Credits";
import { ScrollLeft, ScrollRight } from "../../scroll/scrollIndex";
import TvCastItem from "./tvCastItem";
import TvCrewItem from "./tvCrewItem";
import "../../../styles/TvseriesDetail.css";

type Props = {
  tv: Credits;
};
export default function TvCastList({ tv }: Props) {
  const castRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ScrollLeft scrollRef={castRef} />
      <div className="cast-scroll-container" ref={castRef}>
        {tv.cast.map((cast) => (
          <TvCastItem key={cast.id} cast={cast} />
        ))}
      </div>
    </div>
  );
}
