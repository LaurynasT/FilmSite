import { useRef } from "react";
import { Credits } from "../../../interfaces/credits/Credits";
import { ScrollLeft, ScrollRight } from "../../scroll/scrollIndex";
import TvCrewItem from "./tvCrewItem";
import "../../../styles/TvseriesDetail.css";

type Props = {
  tv: Credits;
};
export default function TvCreditsList({ tv }: Props) {
  const crewRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <h2 className="h2">Crew</h2>
      <div className="cast-scroll-wrapper">
        <ScrollLeft scrollRef={crewRef} />
        <div className="cast-scroll-container" ref={crewRef}>
          {tv.crew.map((crew) => (
            <TvCrewItem key={crew.id} crew={crew} />
          ))}
        </div>
      </div>
      <ScrollRight scrollRef={crewRef} />
    </div>
  );
}
