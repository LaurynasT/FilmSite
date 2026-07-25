import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ActorPage.css";
import ActorDetails from "../components/actor/ActorDetails";
import { fetchActorData } from "../services/tmdbActorService";
import { Actor } from "../interfaces/Actor";
import ActorMovies from "../components/actor/actorMovies/ActorMovies";
import ActorTv from "../components/actor/actorTvShows/ActorTv";

export default function ActorPage() {
  const { id } = useParams();
  const [actor, setActor] = useState<Actor>();
  const [creditType, setCreditType] = useState<"movie" | "tv">("movie");
  const [loading, setLoading] = useState(true);

  async function loadActorData() {
    setLoading(true);
    try {
      const response = await fetchActorData(Number(id));
      setActor(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActorData();
  }, [id]);

  if (loading || !actor)
    return <div className="actor-page">Loading actor data...</div>;

  return (
    <div className="actor-page">
      <div className="actor-card">
        <ActorDetails actor={actor} />
      </div>

      <div className="toggle-buttons">
        <button
          onClick={() => setCreditType("tv")}
          className={creditType === "tv" ? "active-button" : ""}
        >
          Tv Roles
        </button>
        <button
          onClick={() => setCreditType("movie")}
          className={creditType === "movie" ? "active-button" : ""}
        >
          Movie Roles
        </button>
      </div>

      <h2 className="section-title">
        Known For {creditType === "movie" ? "Movies" : "Tv Shows"}
      </h2>
      <div className="known-for-grid">
        {creditType === "movie" && <ActorMovies actorId={actor.id} />}
        {creditType === "tv" && <ActorTv actorId={actor.id} />}
      </div>
    </div>
  );
}
