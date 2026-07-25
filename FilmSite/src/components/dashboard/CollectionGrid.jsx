import React from "react";
import { IMAGE_BASE_URL } from "../Api/Api";

const CollectionGrid = ({
  collection,
  loading,
  activeTab,
  setActiveTab,
  collectionTitle,
  onRemove,
  onNavigate,
}) => {
  return (
    <div className="w-11/12 ml-6 mb-8">
      <h2 className="text-gray-400 text-2xl font-bold mb-4">
        {collectionTitle}
      </h2>

      <div className="flex gap-2 mb-6">
        {["all", "movie", "tv"].map((tab) => (
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {collection.map((item) => (
            <div
              key={`${item.mediaType}-${item.mediaId}`}
              className="bg-gray-900 rounded overflow-hidden flex flex-col"
            >
              <div
                className="cursor-pointer hover:opacity-80 transition"
                onClick={() => onNavigate(item.mediaId, item.mediaType)}
              >
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
                  onClick={() => onRemove(item.mediaId, item.mediaType)}
                  className="mt-auto text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionGrid;
