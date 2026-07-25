import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFavorites,
  removeFavorite,
  getWatchList,
  removeFromWatchList,
} from "../Api/Api.jsx";
import { useAuth } from "../assets/AuthContext";
import Sidebar from "../assets/Sidebar";
import UserProfile from "../assets/UserProfile";
import CollectionGrid from "../assets/CollectionGrid";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [activeCollection, setActiveCollection] = useState("favorites");

  useEffect(() => {
    const loadCollection = async () => {
      try {
        setCollectionLoading(true);
        const mediaType = activeTab !== "all" ? activeTab : null;

        if (activeCollection === "favorites") {
          const data = await getFavorites(mediaType);
          setFavorites(data);
        } else {
          const data = await getWatchList(mediaType);
          setWatchList(data);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        }
      } finally {
        setCollectionLoading(false);
      }
    };

    if (isAuthenticated) loadCollection();
  }, [activeTab, activeCollection, isAuthenticated, navigate]);

  const handleRemoveFavorite = async (mediaId, mediaType) => {
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

  const handleRemoveWatchList = async (mediaId, mediaType) => {
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

  const handleNavigateToDetail = (mediaId, mediaType) => {
    if (mediaType === "movie") navigate(`/MovieDetail/${mediaId}`);
    else if (mediaType === "tv") navigate(`/TvSeriesDetail/${mediaId}`);
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

        <UserProfile
          user={user}
          onChangeUsername={() => navigate("/change-username")}
        />
      </div>

      {activeCollection !== "account" && (
        <CollectionGrid
          collection={currentCollection}
          loading={collectionLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collectionTitle={collectionTitle}
          onRemove={handleRemoveItem}
          onNavigate={handleNavigateToDetail}
        />
      )}
    </div>
  );
};
export default Dashboard;
