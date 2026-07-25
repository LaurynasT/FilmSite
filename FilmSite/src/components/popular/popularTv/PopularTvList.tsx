import { useRef } from "react";
import { ScrollLeft, ScrollRight } from "../../scroll/scrollIndex";
import { MediaTv } from "../../../interfaces/MediaTv";
import { Data } from "../../../interfaces/Data";
import PopularTvItem from "./PopularTvItem";

type Props = {
  tv: Data<MediaTv>;
};

export default function PopularTvList({ tv }: Props) {
  const tvRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ScrollLeft scrollRef={tvRef} />
      <div
        className="flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden scroll-smooth"
        ref={tvRef}
      >
        {tv?.results.map((tv) => (
          <div key={tv.id}>
            <PopularTvItem tv={tv} />
          </div>
        ))}
      </div>
      <ScrollRight scrollRef={tvRef} />
    </div>
  );
}
