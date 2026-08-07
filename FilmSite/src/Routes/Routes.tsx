import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/routing/PrivateRoute.js";
import Dashboard from "../Pages/Dashboard.js";
import Login from "../Pages/Login.js";
import Signup from "../Pages/Signup.js";
import HomePage from "../Pages/HomePage.js";
// import AiSearch from "../Pages/AiSearch.jsx";
import MovieDetail from "../Pages/MovieDetail.js";
import TvSeriesDetais from "../Pages/TvSeriesDetail.js";
import Actors from "../Pages/ActorPage.js";
import CompanyDetail from "../Pages/CompanyDetail.js";
import SearchResults from "../Pages/SearchResults.js";
import DiscoverMoviesPage from "../Pages/DiscoverMovie.js";
import DiscoverTvSeries from "../Pages/DiscoverTvSeries.js";
import About from "../Pages/About";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AppRoutes() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <div>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/update-username"
              element={
                <PrivateRoute>
             
                </PrivateRoute>
              }
            /> */}
            <Route path="/MovieDetail/:id" element={<MovieDetail />} />
            <Route path="/TvSeriesDetail/:id" element={<TvSeriesDetais />} />
            <Route
              path="/CompanyDetail/:companyId"
              element={<CompanyDetail />}
            />
            <Route path="/ActorDetail/:id" element={<Actors />} />
            <Route path="/SearchResults" element={<SearchResults />} />
            <Route path="/DiscoverMovie" element={<DiscoverMoviesPage />} />
            <Route path="/DiscoverTv" element={<DiscoverTvSeries />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
