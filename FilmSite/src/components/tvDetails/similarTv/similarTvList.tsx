import { useRef } from "react";
import { Data } from "../../../interfaces/Data";
import { MediaTv } from "../../../interfaces/MediaTv";
import { ScrollLeft, ScrollRight } from "../../scroll/scrollIndex";
import SimilarTvItem from "./similarTvItem";
import "../../../styles/TvseriesDetail.css";

type Props = {
  shows: Data<MediaTv>;
};

export default function SimilarTvList({ shows }: Props) {
  const showRef = useRef<HTMLDivElement>(null);
  return (
    <div className="similar-scroll-wrapper">
      <ScrollLeft scrollRef={showRef} />
      <div className="similar-scroll-container">
        {shows.results.map((show) => (
          <SimilarTvItem key={show.id} show={show} />
        ))}
      </div>
      <ScrollRight scrollRef={showRef} />
    </div>
  );
}
