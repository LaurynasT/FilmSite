import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SeasonsEpisodes from "../components/tvDetails/seasonsEpisodes/SeasonsEpisodes";
import TvCredits from "../components/tvDetails/tvCredits/tvCredits";
import SimilarTv from "../components/tvDetails/similarTv/similarTv";
import { fetchTvDetail } from "../services/tmdbTvService";
import type { TvDetail } from "../interfaces/TvDetail";
import TvDetails  from "../components/tvDetails/TvDetails";

export default function TvSeriesDetails() {
  const { id } = useParams();
  const [tvDetail, setTvDetails] = useState<TvDetail>();
  const [loading, setLoading] = useState(true);

  async function loadTvDetails() {
    setLoading(true)
    try{
    const response = await fetchTvDetail(Number(id));
    setTvDetails(response)
    } finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    loadTvDetails();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (!tvDetail) return <p>No movie data found.</p>;

  return (
    <div className="tvDetail">
      <div className="tvDetailwidth">
        <div className="background">
          <TvDetails tv={tvDetail}/>
          </div>
        </div>
      <div className="seasons">
          <SeasonsEpisodes show={tvDetail}/>
      </div>
      <div className="cast-section">
        <TvCredits showId={tvDetail.id}/>
      </div>
      <div className="similar-section">
        <h2 style={{ color: "black" }}>Similar Tv Series </h2>
        <SimilarTv showId={tvDetail.id}/>
      </div>
    </div>
  );
};

