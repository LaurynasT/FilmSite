import { useState } from "react";
import PopularMovies from "../components/popular/popularMovies/PopularMovies";
import PopularTvSeries from "../components/popular/popularTv/PopularTvSeries";
import Upcoming from "../components/upcoming/Upcoming";


export default function HomePage() {

  return (
    <div className="bg-black text-white min-h-screen pb-12 ">
      <div className=" justify-end-safe ml-auto w-11/12 mr-8 ">
        <div className="mt-12 pt-2">
          <TrendingSwiper />
        </div>

        <div className="space-y-12 mt-8">
          <div>
            <div className="flex items-center gap-3 mb-4 ml-5">
              <div className="h-7 w-1 rounded-full bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.85)] mb-4" />
              <h1 className="text-2xl font-bold">Popular Movies</h1>
            </div>
            <PopularMovies />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 ml-5">
              <div className="h-7 w-1 rounded-full bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.85)] mb-4" />
              <h1 className="text-2xl font-bold">Popular TV Series</h1>
            </div>
            <PopularTvSeries />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 ml-5">
              <div className="h-7 w-1 rounded-full bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.85)] mb-4" />
              <h1 className="text-2xl font-bold">Upcoming Movies</h1>
            </div>
            <Upcoming />
          </div>
        </div>
      </div>
    </div>
  );
};


