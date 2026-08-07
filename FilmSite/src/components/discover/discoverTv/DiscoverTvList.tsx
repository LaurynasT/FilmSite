import { Data } from "../../../interfaces/Data"
import { MediaTv } from "../../../interfaces/MediaTv"
import DiscoverTvItem from "./DiscoverTvItem"
import "../../../styles/DiscoverTv.css"

type Props = {
    shows: Data<MediaTv>
}
export default function DiscoverTvList({shows}: Props) {

    return(
        <div className="movies-list">
            {shows.results.map((show) => (
                <DiscoverTvItem key={show.id} show={show}/>
            ))}
        </div>
    )
}