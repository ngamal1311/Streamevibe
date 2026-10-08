import React from 'react'
import FeaturedMovie from './movies/featuremovie'
import FreeTrial from './Home/freeTiral' 
import MoviesSections from './movies/moviesSections'
import ShowsSections from './shows/showsSections'
import Footer from './footer'
import Header from './header'

export default function MoviesAndShows() {
    return (
        <>
            <Header />
            <FeaturedMovie />
            <MoviesSections />
            <ShowsSections />
            <FreeTrial />
            <Footer />
        </>
    )
}
