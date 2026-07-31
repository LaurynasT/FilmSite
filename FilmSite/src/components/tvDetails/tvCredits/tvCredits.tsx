import { useState, useEffect } from "react";
import { Credits } from "../../../interfaces/credits/Credits";
import { fetchTvCredits } from "../../../services/tmdbTvService";
import TvCastList from "./tvCastList";
import TvCrewList from "./tvCrewList";
import "../../../styles/TvseriesDetail.css";

type Props = {
  showId: number;
};
export default function TvCredits({ showId }: Props) {
  const [tvCredits, setTvCredits] = useState<Credits | null>(null);
  async function loadCredits() {
    const response = await fetchTvCredits(showId);
    setTvCredits(response);
  }
  useEffect(() => {
    loadCredits();
  }, [showId]);

  if (!tvCredits) return <p>No credits found</p>;
  return (
    <div>
      <h2 className="h2">Cast</h2>
      <div className="cast-scroll-wrapper">
        <TvCastList tv={tvCredits} />
      </div>
      <h2 className="h2">Crew</h2>
      <div className="cast-scroll-wrapper">
        <TvCrewList tv={tvCredits} />
      </div>
    </div>
  );
}
