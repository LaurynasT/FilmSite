import { useEffect, useState } from "react";
import { Data } from "../../../../interfaces/Data";
import { MediaTv } from "../../../../interfaces/MediaTv";
import { fetchSimilarTv } from "../../../../services/tmdbTvService";
import SimilarTvList from "./similarTvList";

type Props = {
  showId: number;
};
export default function SimilarTv({ showId }: Props) {
  const [similarTv, setSimilarTv] = useState<Data<MediaTv>>();

  async function loadSimilar() {
    const response = await fetchSimilarTv(showId);
    setSimilarTv(response);
  }
  useEffect(() => {
    loadSimilar();
  }, [showId]);

  if (!similarTv) return <p>Loading ....</p>;
  return (
    <div>
      <SimilarTvList shows={similarTv} />
    </div>
  );
}
