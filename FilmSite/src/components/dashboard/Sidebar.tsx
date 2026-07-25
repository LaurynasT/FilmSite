import React from "react";
import BookmarkIcon from "../Icons/bookmark.png";
import Watchlist from "../Icons/watchlist.png";
import SubscriptionIcon from "../Icons/subscription.png";

type Props = {
  activeCollection: string;
  setActiveCollection: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ activeCollection, setActiveCollection }: Props) => {
  return (
    <div className="w-50 bg-gray-800 p-6 rounded flex flex-col gap-3 h-56 ">
      <button className="bg-transparent text-white hover:text-white hover:bg-red-700 text-left px-2 py-1 rounded flex flex-row">
        <img
          src={SubscriptionIcon}
          alt="Subscription"
          className="w-5 h-5 mr-2"
        />
        Subscription
      </button>
      <button
        className={`bg-transparent text-white hover:bg-red-700 text-left px-2 py-1 rounded flex flex-row${
          activeCollection === "watchlist" ? "bg-red-700" : ""
        }`}
        onClick={() => setActiveCollection("watchlist")}
      >
        <img src={Watchlist} alt="Watchlist" className="w-5 h-5 mr-2" />
        Watch List
      </button>
      <button
        className={`bg-transparent text-white hover:bg-red-700 text-left px-2 py-1 rounded flex flex-row ${
          activeCollection === "favorites" ? "bg-red-700" : ""
        }`}
        onClick={() => setActiveCollection("favorites")}
      >
        <img src={BookmarkIcon} alt="Favorites" className="w-5 h-5 mr-2" />
        Favorites
      </button>
    </div>
  );
};

export default Sidebar;
