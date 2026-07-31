import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.js";
import PrivateRoute from "../components/routing/PrivateRoute.js";
import Dashboard from "../Pages/Dashboard.js";
import Login from "../Pages/Login.js";
import Signup from "../Pages/Signup.js";
import Logout from "../components/user/Logout.js";
import HomePage from "../Pages/HomePage.js";
import AiSearch from "../Pages/AiSearch.jsx";
import MovieDetail from "../Pages/MovieDetail.js";
import TvSeriesDetais from "../Pages/TvSeriesDetail.js";
import Actors from "../Pages/ActorPage.js";
import ChangeUsername from "../components/dashboard/UpdateUsernameModal.js";
import CompanyDetail from "../Pages/CompanyDetail.js";
import SearchResults from "../Pages/SearchResults.js";
import DiscoverMoviesPage from "../Pages/DiscoverMovie.jsx";
import DiscoverTvSeries from "../Pages/DiscoverTvSeries.jsx";
import About from "../Pages/About";
import { NavBar } from "../components/layout/NavBar.js";
import Footer from "../components/layout/Footer.js";
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
    <AuthProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-username"
              element={
                <PrivateRoute>
                  <ChangeUsername />
                </PrivateRoute>
              }
            />
            <Route path="/MovieDetail/:id" element={<MovieDetail />} />
            <Route path="/TvSeriesDetail/:id" element={<TvSeriesDetais />} />
            <Route
              path="/CompanyDetail/:companyId"
              element={<CompanyDetail />}
            />
            <Route path="/Login/" element={<Login />} />
            <Route path="/SignUp/" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/change-username" element={<ChangeUsername />} />
            <Route path="/ActorDetail/:id" element={<Actors />} />
            <Route path="/SearchResults" element={<SearchResults />} />
            <Route path="/DiscoverMovie" element={<DiscoverMoviesPage />} />
            <Route path="/DiscoverTv" element={<DiscoverTvSeries />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}


