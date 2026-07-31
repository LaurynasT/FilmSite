import { useRef } from "react";
import { Seasons } from "../../../interfaces/Seasons";
import { ScrollLeft, ScrollRight } from "../../scroll/scrollIndex";
import SeasonsEpisodesItem from "./SeasonsEpisodesItem";
import "../../../styles/TvseriesDetail.css"

type Props = {
  seasons: Seasons | null;
  selectedSeason: number;
  allSeasons: number;
  onSeasonChange: (season: number) => void;
};
export default function SeasonsEpisodesList({
  seasons,
  selectedSeason,
  onSeasonChange,
  allSeasons,
}: Props) {
  const episodeRef = useRef<HTMLDivElement>(null);
  if (!seasons) return <p>No season data found</p>;
  return (
    <div className="seasons-scroll-wrapper">
      <h2>Seasons</h2>
      <select
        value={selectedSeason}
        onChange={(e) => onSeasonChange(Number(e.target.value))}
        className="seasons-dropdown"
      >
        {Array.from({ length: allSeasons }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Season {i + 1}
          </option>
        ))}
      </select>
      <ScrollLeft scrollRef={episodeRef} />
      <div ref={episodeRef} className="flex gap-4 overflow-x-auto seasons-scroll-container">
        {seasons?.episodes.map((episode) => (
          <SeasonsEpisodesItem key={episode.id} episode={episode} />
        ))}
      </div>
      <ScrollRight scrollRef={episodeRef} />
    </div>
  );
}
