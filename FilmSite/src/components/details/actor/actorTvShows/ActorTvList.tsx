import { PersonTvCredits } from "../../../../interfaces/credits/PersonTvCredits";
import ActorTvItem from "./ActorTvItem";
import "../../../../styles/ActorPage.css"
type Props = {
  actor: PersonTvCredits | null;
};
export default function ActorTvList({ actor }: Props) {
  return (
    <div className="known-for-grid">
      {actor?.cast.map((tv) => (
        <div key={tv.id}>
          <ActorTvItem tv={tv} />
        </div>
      ))}
    </div>
  );
}
