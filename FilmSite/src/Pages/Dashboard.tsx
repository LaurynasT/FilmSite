import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites, removeFavorite } from "../services/favoritesService";
import {
  getWatchList,
  removeFromWatchList,
} from "../services/watchListService";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import UserProfile from "../components/user/UserProfile";
import CollectionGrid from "../components/dashboard/collection/CollectionGrid";
import { UserMediaItem } from "../interfaces/UserMediaItem";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<UserMediaItem[]>([]);
  const [watchList, setWatchList] = useState<UserMediaItem[]>([]);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "movie" | "tv">("all");
  const [activeCollection, setActiveCollection] = useState("favorites");

  const loadCollection = useCallback(async () => {
    setCollectionLoading(true);
    const mediaType = activeTab !== "all" ? activeTab : undefined;

    try {
      if (activeCollection === "favorites") {
        const data = await getFavorites(mediaType);
        setFavorites(data);
      } else {
        const data = await getWatchList(mediaType);
        setWatchList(data);
      }
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setCollectionLoading(false);
    }
  }, [activeTab, activeCollection, navigate]);

  useEffect(() => {
    if (isAuthenticated) loadCollection();
  }, [isAuthenticated, loadCollection]);

  const handleRemoveFavorite = async (
    mediaId: number,
    mediaType: "movie" | "tv",
  ) => {
    try {
      await removeFavorite(mediaId, mediaType);
      setFavorites(
        favorites.filter(
          (fav) => !(fav.mediaId === mediaId && fav.mediaType === mediaType),
        ),
      );
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  const handleRemoveWatchList = async (
    mediaId: number,
    mediaType: "movie" | "tv",
  ) => {
    try {
      await removeFromWatchList(mediaId, mediaType);
      setWatchList(
        watchList.filter(
          (item) => !(item.mediaId === mediaId && item.mediaType === mediaType),
        ),
      );
    } catch (err) {
      console.error("Failed to remove from watchlist:", err);
    }
  };

  const currentCollection =
    activeCollection === "favorites" ? favorites : watchList;
  const handleRemoveItem =
    activeCollection === "favorites"
      ? handleRemoveFavorite
      : handleRemoveWatchList;
  const collectionTitle =
    activeCollection === "favorites" ? "My Favorites" : "My Watch List";

  return (
    <div className="mt-16 bg-gray-950 min-h-screen w-full p-6">
      <div className="flex flex-row items-start gap-4 mb-8 w-4/12">
        <Sidebar
          activeCollection={activeCollection}
          setActiveCollection={setActiveCollection}
        />

        <UserProfile user={user} />
      </div>
      {activeCollection !== "account" && (
        <CollectionGrid
          collection={currentCollection}
          loading={collectionLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collectionTitle={collectionTitle}
          onRemove={handleRemoveItem}
        />
      )}
    </div>
  );
}
