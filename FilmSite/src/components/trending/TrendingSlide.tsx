import { IMAGE_BACKGROUND_URL } from "../../api/Api";
import { Trending } from "../../interfaces/Trending";

type Props = {
  item: Trending;
  active: boolean;
  genreMap: Record<number, string>;
  onNavigate: (item: Trending) => void;
};

export default function TrendingSlide({
  item,
  active,
  genreMap,
  onNavigate,
}: Props) {
  const genres = (item.genre_ids ?? [])
    .slice(0, 3)
    .map((id) => genreMap[id])
    .filter(Boolean);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0, zIndex: active ? 1 : 0 }}
    >
      <img
        src={`${IMAGE_BACKGROUND_URL}${item.backdrop_path}`}
        alt={item.title}
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 px-12 sm:px-6">
        <h1 className="text-white font-black text-5xl sm:text-2xl mb-3 max-w-lg leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {item.title}
        </h1>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="text-zinc-300 text-sm font-medium">
            {item.release_date?.slice(0, 4)}
          </span>
          <span className="text-zinc-500 text-xs">•</span>
          <span
            className="bg-yellow-400 text-black text-xs font-black px-1.5 py-0.5 rounded"
            style={{ fontFamily: "Impact, sans-serif" }}
          >
            IMDb
          </span>
          <span className="text-white text-sm font-semibold">
            ⭐ {item.vote_average.toFixed(1)}
          </span>
          <span className="text-zinc-500 text-xs">•</span>
          <span className="text-zinc-300 text-sm capitalize">
            {item.media_type === "tv" ? "TV Series" : item.media_type}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {genres.map((genre) => (
            <span
              key={genre}
              className="text-xs text-zinc-300 border border-zinc-600 px-2.5 py-0.5 rounded-full bg-zinc-800/50"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed max-w-sm mb-6 line-clamp-3">
          {item.overview}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(item)}
            className="flex items-center gap-2 bg-red-600 active:scale-95 text-white font-semibold px-6 py-2.5 rounded transition-all duration-150 text-sm border border-zinc-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
