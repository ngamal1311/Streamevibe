import "./App.css";
import Home from "./components/home";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Support from "./components/support/support";
import Subscription from "./components/support/subscription/subscription";
import MoviesAndShows from "./components/moviesAndShowsSections";
import CategoryMovies from "./components/movies/categoryMovie";
import PopularGenreMovies from "./components/movies/popularCategory";
import CategoryShows from "./components/shows/categoryShows";
import PopularGenreShows from "./components/shows/popularCategory";
import MovieDetails from './components/movies/movieDetails'
import ShowDetails from './components/shows/showDetails'
import Register from './components/accounts/register'
import Login from './components/accounts/login'
import Profile from "./components/accounts/profile";
import Favorites from "./components/accounts/Fav";
import MainLayout from "./components/Layout/mainlayout";
import Saved from "./components/accounts/sav";
function App() {
  return (
    <>
      <Router>
        <main className="bg-[#141414] text-white">
          <Routes>
            <Route exact path="/" element={< Register/>} />
          </Routes>
          <Routes>
            <Route path="/login" element={< Login/>} />
          </Routes>
          <Routes>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={< Profile/>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/MoviesandShows" element={<MoviesAndShows />} />
            <Route path="/support" element={<Support />} />
            <Route
              exact
              path="/MoviesandShows/movies/:genre/:id"
              element={<CategoryMovies />}
            />
            <Route
              exact
              path="/MoviesandShows/movies/top10InGenre/:genre/:id"
              element={<PopularGenreMovies />}
            />
            <Route
              exact
              path="/MoviesandShows/shows/:genre/:id"
              element={<CategoryShows />}
            />
            <Route
              exact
              path="/MoviesandShows/shows/top10InGenre/:genre/:id"
              element={<PopularGenreShows />}
            />
          <Route exact path="/MoviesandShows/shows/genre/:genre/:id/:mid" element={<ShowDetails />} />
          <Route exact path="/MoviesandShows/shows/top10InGenre/:genre/:id/:mid" element={<ShowDetails />} />
          <Route exact path="/MoviesandShows/movies/genre/:genre/:id/:mid" element={<MovieDetails />} />
          <Route exact path="/MoviesandShows/movies/top10InGenre/:genre/:id/:mid" element={<MovieDetails />} />
          <Route  path="/MoviesandShows/movies/trending/movie/:mid" element={<MovieDetails />} />
            <Route path="/MoviesandShows/movies/releases/movie/:mid" element={<MovieDetails />} />
            <Route path="/MoviesandShows/movies/mustwatch/movie/:mid" element={<MovieDetails />} />
          <Route  path="/MoviesandShows/shows/trending/show/:mid" element={<ShowDetails />} />
            <Route path="/MoviesandShows/shows/releases/show/:mid" element={<ShowDetails />} />
            <Route path="/MoviesandShows/shows/mustwatch/show/:mid" element={<ShowDetails />} />
            <Route path='saved/movie/:mid' element={<MovieDetails />} />
            <Route path='saved/show/:mid' element={<ShowDetails />} />
            <Route path='favorites/movie/:mid' element={<MovieDetails />} />
            <Route path='favorites/show/:mid' element={<ShowDetails />} />
            </Route>
            </Routes>
        </main>
      </Router>
    </>
  );
}


export default App;