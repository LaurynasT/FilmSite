import { useNavigate } from "react-router-dom";
import { UserMediaItem } from "../../../interfaces/UserMediaItem";
import { IMAGE_BASE_URL } from "../../../api/Api";

type Props = {
  item: UserMediaItem;
  onRemove: (mediaId: number, mediaType: "movie" | "tv") => void;
};
export default function CollectionItem({ item, onRemove }: Props) {
  const navigate = useNavigate();

  const handleNavigateToDetail = (mediaId: number, mediaType: string) => {
    if (mediaType === "movie") navigate(`/MovieDetail/${mediaId}`);
    else if (mediaType === "tv") navigate(`/TvSeriesDetail/${mediaId}`);
  };
  return (
    <div
      className="cursor-pointer hover:opacity-80 transition"
      onClick={() => handleNavigateToDetail(item.mediaId, item.mediaType)}
    >
      <div className="cursor-pointer hover:opacity-80 transition">
        {item.posterPath ? (
          <img
            src={`${IMAGE_BASE_URL}${item.posterPath}`}
            alt={item.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-white text-sm font-semibold line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {item.mediaType === "movie" ? "🎬 Movie" : "📺 TV Series"}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.mediaId, item.mediaType);
          }}
          className="mt-auto text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
