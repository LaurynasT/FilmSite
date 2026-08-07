
import { UserMediaItem } from "../../../interfaces/UserMediaItem";
import CollectionList from "./CollectionList";

type Props = {
  collection: UserMediaItem[];
  loading: boolean;
  activeTab: "all" | "movie" | "tv";
  setActiveTab: React.Dispatch<React.SetStateAction<"all" | "movie" | "tv">>;
  collectionTitle: string;
  onRemove: (mediaId: number, mediaType: "movie" | "tv") => void;
};
export default function CollectionGrid({
  collection,
  loading,
  activeTab,
  setActiveTab,
  collectionTitle,
  onRemove,
}: Props) {
  const tabs = ["all", "movie", "tv"] as const;

  
  return (
    <div className="w-11/12 ml-6 mb-8">
      <h2 className="text-gray-400 text-2xl font-bold mb-4">
        {collectionTitle}
      </h2>

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {tab === "all" ? "All" : tab === "movie" ? "Movies" : "TV Shows"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : collection.length === 0 ? (
        <div className="text-gray-400 text-center py-12">
          <p>No items found. Start adding some!</p>
        </div>
      ) : (
          <CollectionList collection={collection} onRemove={onRemove}/>
      )}
    </div>
  );
}
