import { useRef } from "react"
import { Data } from "../../../../interfaces/Data"
import { Movie } from "../../../../interfaces/Movie"
import { ScrollLeft, ScrollRight } from "../../../scroll/scrollIndex"
import SimilarMoviesItem from "./SimilarMoviesItem"
import "../../../../styles/Moviedetail.css"

type Props = {
    similar: Data<Movie>
}
export default function SimilarMoviesList({similar}: Props) {
    const similarRef = useRef<HTMLDivElement>(null)

    return(
        <div>
            <ScrollLeft scrollRef={similarRef}/>
            <div className="similar-scroll-container" ref={similarRef}>
            {similar.results.map((movie) => (
                <SimilarMoviesItem key={movie.id} movie={movie}/>
            ))}
            </div>
            <ScrollRight scrollRef={similarRef}/>
        </div>
    )
}