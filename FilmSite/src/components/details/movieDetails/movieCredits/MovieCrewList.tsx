import { Credits } from "../../../../interfaces/credits/Credits";
import MovieCrewItem from "./MovieCrewItem";
import { ScrollLeft, ScrollRight } from "../../../scroll/scrollIndex";
import { useRef } from "react";
import "../../../../styles/Moviedetail.css"

type Props = {
    credits: Credits;
}
export default function MovieCrewtList({credits}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null)

    return(
        <div>
            <ScrollLeft scrollRef={scrollRef} />
            <div className="cast-scroll-container" ref={scrollRef}>
            {credits.crew.map((crew) => (
                <MovieCrewItem key={crew.credit_id} crew={crew}/>
            ))}
            </div>
            <ScrollRight scrollRef={scrollRef} />
        </div>
    )
}