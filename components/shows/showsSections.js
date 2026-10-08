import React from "react";

import MediaTypeTitle from "./common/mediaTypeTitleToShows";

import GenresSection from "./Sections/genereSection";
import PopularGenresSection from "./Sections/popularGenereSection";
import TrendingSection from "./Sections/trendingSection";
import NewReleaseSection from "./Sections/newReleaseSection";
import MustWatchSection from "./Sections/mustWatchSection";
import {getShowGenres, getTrendingShows, getNewReleaseShows, getTopRatedShows} from '../../api/shows'
import { useState, useEffect } from "react";


export default function ShowsSections() {
  const [genres, setGenres] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [releasedShows, setReleasedShows] = useState([])
  const [mustWatchShows, setMustWatchShows] = useState([])
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getShowGenres();
        setGenres(data)
      } catch(error) {
        console.log(error);
      }
    }
    const fetchTrending = async () => {
      try {
        const data = await getTrendingShows();
        setTrendingShows(data)
        console.log(data)
      }
      catch (error) {
        console.error(error)
      } 
    }
    const fetchReleases = async () => {
      try {
        const data = await getNewReleaseShows();
        setReleasedShows(data)
      }
      catch(error){
        console.error(error)
      }
    }
    const fetchMustWatch = async () => {
      try {
        const data = await getTopRatedShows()
        setMustWatchShows(data)
      }
      catch(error){
        console.error(error)
      }
    }
    fetchGenres()
    fetchTrending()
    fetchReleases()
    fetchMustWatch()
  }, [])
  return (
    <>
      <div className="border border-[#1D1D1D] rounded-2xl mx-16 p-10 my-16">

        <MediaTypeTitle title="Shows" />

        <GenresSection genres={genres} />

        <PopularGenresSection genres={genres} />

        <TrendingSection items={trendingShows} />

        <NewReleaseSection items={releasedShows} />

        <MustWatchSection items={mustWatchShows} />

      </div>
    </>
  );
}