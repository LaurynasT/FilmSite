import { useRef } from "react";
import { Data } from "../../../interfaces/Data";
import { Movie } from "../../../interfaces/Movie";
import PopularMoviesItem from "./PopularMoviesItem";
import { ScrollLeft, ScrollRight } from "../../scroll/scrollIndex";

type Props = {
  popular: Data<Movie>;
};
export default function PopularMoviesList({ popular }: Props) {
  const moviesRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ScrollLeft scrollRef={moviesRef} />
      <div
        ref={moviesRef}
        className="flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {popular?.results.map((movie) => (
          <div key={movie.id}>
            <PopularMoviesItem movie={movie} />
          </div>
        ))}
      </div>
      <ScrollRight scrollRef={moviesRef} />
    </div>
  );
}
