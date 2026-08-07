import { useState, useEffect } from "react";
import {
  checkWatchList,
  addToWatchList,
  removeFromWatchList,
} from "../../services/watchListService";
import { useAuth } from "../../context/AuthContext";
import "../../styles/WatchListButton.css";

type Props = {
  mediaId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string;
  onToggle?: (isInWatchList: boolean) => void;
};
export default function WatchListButton({
  mediaId,
  mediaType,
  title,
  posterPath,
  onToggle,
}: Props) {
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsInWatchList(false);
      setIsLoading(false);
      return;
    }
    const checkWatchListStatus = async () => {
      setIsLoading(true);
      try {
        const status = await checkWatchList(mediaId, mediaType);
        setIsInWatchList(status);
      } catch (error) {
        console.error("Error checking watch list status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWatchListStatus();
  }, [mediaId, mediaType, isAuthenticated]);

  const handleToggleWatchList = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      if (onToggle) onToggle(false);
      return;
    }
    setIsLoading(true);
    try {
      if (isInWatchList) {
        await removeFromWatchList(mediaId, mediaType);
        setIsInWatchList(false);
        onToggle?.(false);
      } else {
        await addToWatchList(mediaId, mediaType, title, posterPath);
        setIsInWatchList(true);
        onToggle?.(true);
      }
    } catch (error) {
      console.error("Error toggling watch list status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`compact-watchlist-button ${isInWatchList ? "in-watchlist" : ""} ${isLoading ? "loading" : ""}`}
      onClick={handleToggleWatchList}
      disabled={isLoading}
      aria-label={
        isInWatchList ? "Remove from watch list" : "Add to watch list"
      }
      title={isInWatchList ? "Remove from watch list" : "Add to watch list"}
    >
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill={isInWatchList ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </button>
  );
}
