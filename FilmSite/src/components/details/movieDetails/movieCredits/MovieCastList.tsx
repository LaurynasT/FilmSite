import { useRef } from "react";
import { Credits } from "../../../../interfaces/credits/Credits";
import { ScrollLeft, ScrollRight } from "../../../scroll/scrollIndex";
import MovieCastItem from "./MovieCastItem";
import "../../../../styles/Moviedetail.css"

type Props = {
    credits: Credits;
}
export default function MovieCastList({credits}: Props) {
    const scrollRef = useRef<HTMLDivElement>(null)
    return(
        <div>
            <ScrollLeft scrollRef={scrollRef} />
            <div className="cast-scroll-container" ref={scrollRef}>
            {credits.cast.map((cast) => (
                <MovieCastItem key={cast.id} cast={cast}/>
            ))}
            </div>
            <ScrollRight scrollRef={scrollRef} />
        </div>
    )
}