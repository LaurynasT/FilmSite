import { UserMediaItem } from "../../../interfaces/UserMediaItem"
import CollectionItem from "./CollectionItem"

type Props = {
    collection: UserMediaItem[]
    onRemove: (mediaId: number, mediaType: "movie" | "tv") => void;
}
export default function CollectionList({collection, onRemove}: Props) {

    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {collection.map((item) => (
                <CollectionItem key={item.id} item={item} onRemove={onRemove} />
            ))}
        </div>
    )
}