import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../Api/Api";
import Search from "../search/Search";
import Avatar from "../Icons/Avatar.png";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-red-500" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black h-16 flex items-center justify-between px-6">
      <div className="hidden md:flex items-center gap-10">
        <NavLink to="/" className="text-white font-bold text-xl tracking-wide">
          Movie<span className="text-red-500">Hub</span>
        </NavLink>
        <ul className="flex items-center gap-7">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/DiscoverMovie" className={linkClass}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/DiscoverTv" className={linkClass}>
              TV Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/About" className={linkClass}>
              About
            </NavLink>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                  class="disabled"
                >
                  AI Search(Not finished)
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <NavLink
        to="/"
        className="md:hidden text-white font-bold text-xl tracking-wide"
      >
        Movie<span className="text-red-500">Hub</span>
      </NavLink>

      <div className="hidden md:flex items-center gap-5">
        <Search />
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/login"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded transition-colors"
            >
              Sign Up
            </NavLink>
          </>
        ) : (
          <div className="">
            <img
              src={Avatar}
              alt="User"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded shadow-lg py-1">
                <NavLink
                  to="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left text-sm px-4 py-2 transition-colors ${
                      isActive
                        ? "text-red-500"
                        : "text-gray-300 hover:text-red-400"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left text-sm !text-gray-300 hover:!text-red-400 px-4 py-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/DiscoverMovie"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Movies
          </NavLink>
          <NavLink
            to="/DiscoverTv"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            TV Shows
          </NavLink>
          <NavLink
            to="/About"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            About
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/AiSearch"
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                AI Search
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                Dashboard
              </NavLink>
            </>
          )}
          <div className="pt-1">
            <Search />
          </div>
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left text-sm text-gray-300 hover:text-red-400 transition-colors bg-transparent border-none outline-none cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
