import { useEffect, useState } from "react";
import { Seasons } from "../../../../interfaces/Seasons";
import SeasonsEpisodesList from "./SeasonsEpisodesList";
import { fetchTvSeasons } from "../../../../services/tmdbTvService";
import { TvDetail } from "../../../../interfaces/TvDetail";
import "../../../../styles/TvseriesDetail.css"

type Props = {
    show: TvDetail;
}
export default function SeasonsEpisodes({show}: Props) {
    const [showSeasons, setShowSeasons] = useState<Seasons | null>(null)
    const [selectedSeason, setSelectedSeason] = useState(1)

    async function loadSeasons() {
        const response = await fetchTvSeasons(show.id, selectedSeason);
        setShowSeasons(response)
    }
    useEffect(() => {
        loadSeasons();
    }, [show.id, selectedSeason])
    return(
        <div className="">
            <SeasonsEpisodesList 
             seasons={showSeasons}
             allSeasons={show.number_of_seasons}
             selectedSeason={selectedSeason}
             onSeasonChange={setSelectedSeason} />
        </div>
    )
}