import { useEffect, useState } from "react";
import { PersonTvCredits } from "../../../interfaces/credits/PersonTvCredits";
import ActorTvList from "./ActorTvList";
import { fetchActorTvCredits } from "../../../services/tmdbActorService";

type Props = {
  actorId: number;
};

export default function ActorTv({ actorId }: Props) {
  const [actorTvCredits, setActorTvCredits] = useState<PersonTvCredits | null>(
    null,
  );

  async function loadActorCredits(actorId: number) {
    const response = await fetchActorTvCredits(actorId);
    setActorTvCredits(response);
  }
  useEffect(() => {
    loadActorCredits(actorId);
  }, [actorId]);
  return (
    <div>
      <ActorTvList actor={actorTvCredits} />
    </div>
  );
}
