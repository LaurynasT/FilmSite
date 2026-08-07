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
    <>
      <ScrollLeft scrollRef={tvRef} />
      <div
        className="flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden scroll-smooth"
        ref={tvRef}
      >
        {tv?.results.map((tv) => (
            <PopularTvItem key={tv.id} tv={tv} />
        ))}
      </div>
      <ScrollRight scrollRef={tvRef} />
    </>
  );
}
