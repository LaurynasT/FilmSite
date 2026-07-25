import { useState, useEffect } from "react";
import type { Data } from "../../../interfaces/Data";
import type { MediaTv } from "../../../interfaces/MediaTv";
import { fetchPopularTv } from "../../../services/tmdbTvService";
import PopularTvList from "./PopularTvList";

export default function PopularTvSeries() {
  const [tvseries, setTvSeries] = useState<Data<MediaTv> | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const response = await fetchPopularTv();
      setTvSeries(response);
    } finally {
      setLoading(true);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  if (loading || !tvseries) return <p>Loading movies...</p>;

  return (
    <div>
      <div className="relative flex items-center gap-4">
        <PopularTvList tv={tvseries} />
      </div>
    </div>
  );
};


