import MediaTypeTitle from './common/mediaTypeTitleToMovies';
import React, {useState, useEffect} from 'react';
import GenresSection from './Sections/genereSection'
import PopularGenresSection from './Sections/popularGenereSection'
import TrendingSection from './Sections/trendingSection'
import NewReleasesSection from './Sections/newReleaseSection'
import MustWatchSection from './Sections/mustWatchSection'
import {getTrendingMovies, getTopRatedMovies, getPopularMovies, getMovieGenres} from '../../api/movies'

export default function MoviesSectoins() {
    const [trendingMovies, setTrendingMovies] = useState([])
    const [releasesMovies, setReleasesMovies] = useState([])
    const [mustWatchMovies, setMustWatchMovies] = useState([])
    const [genres, setGenres] = useState([])
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getMovieGenres();
                setGenres(data)
            }
            catch(error) {
                console.error(error)
            }
        }
        const fetchTrendingMovies = async () => {
            try {
            const data = await getTrendingMovies();
            setTrendingMovies(data)
            }
            catch (error) {
                console.error(error)
            }
        }
        const fetchReleases = async () => {
            try {
            const data = await getPopularMovies();
            setReleasesMovies(data)
            }
            catch (error) {
                console.error(error)
            }
        }
        const fetchMustWatch= async () => {
            try {
            const data = await getTopRatedMovies();
            setMustWatchMovies(data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchMustWatch()
        fetchTrendingMovies();
        fetchReleases();
        fetchGenres();
    }, [genres, trendingMovies, releasesMovies, mustWatchMovies])
    return (
        <>
            <div className='border border-[#1D1D1D] rounded-2xl mx-16 p-10'>
                <MediaTypeTitle  title={'Movies'}/>
                <GenresSection genres={genres}/>
                <PopularGenresSection genres={genres} />
                <TrendingSection items={trendingMovies} />
                <NewReleasesSection  items={releasesMovies}/>
                <MustWatchSection  items={mustWatchMovies}/>
            </div>
        </>
    )
}
