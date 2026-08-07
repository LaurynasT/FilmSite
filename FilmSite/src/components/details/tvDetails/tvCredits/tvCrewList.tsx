import { useRef } from "react";
import { Credits } from "../../../../interfaces/credits/Credits";
import { ScrollLeft, ScrollRight } from "../../../scroll/scrollIndex";
import TvCrewItem from "./tvCrewItem";
import "../../../../styles/TvseriesDetail.css"

type Props = {
  tv: Credits;
};
export default function TvCreditsList({ tv }: Props) {
  const crewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="cast-scroll-wrapper">
      <ScrollLeft scrollRef={crewRef} />
      <div className="cast-scroll-container" ref={crewRef}>
        {tv.crew.map((crew) => (
          <TvCrewItem key={crew.credit_id} crew={crew} />
        ))}
      </div>
      <ScrollRight scrollRef={crewRef} />
    </div>
  );
}
