import { Actor } from "../../../interfaces/Actor";

type Props = {
  actor: Actor;
};
export default function ActorDetails({ actor }: Props) {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
        alt={actor.name}
        className="actor-image"
      />
      <div className="actor-details">
        <h1>{actor.name}</h1>
        <p>{actor.biography || "No biography available."}</p>
        <p>
          <strong>Born:</strong> {actor.birthday}{" "}
          {actor.place_of_birth && `in ${actor.place_of_birth}`}
        </p>
        {actor.deathday && (
          <p>
            <strong>Died:</strong> {actor.deathday}
          </p>
        )}
      </div>
    </div>
  );
}
