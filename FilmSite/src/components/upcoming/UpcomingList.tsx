import { useRef } from "react";
import { Data } from "../../interfaces/Data";
import { Movie } from "../../interfaces/Movie";
import { ScrollLeft, ScrollRight } from "../scroll/scrollIndex";
import UpcomingItem from "./UpcomingItem";

type Props ={
    upcoming: Data<Movie>
}
export default function UpcomingList({upcoming}: Props) {
    const moviesRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <ScrollLeft scrollRef={moviesRef}/>
            <div ref={moviesRef} className="flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden scroll-smooth" >
            {upcoming?.results.map((movie)=>(
                <div >
                 <UpcomingItem key={movie.id} upcoming={movie}/> 
                 </div>
                 ))}
                 </div>
            <ScrollRight scrollRef={moviesRef} />
        </div>
    );
}