import { useEffect, useState } from "react";

import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaPlus,
  FaCheck,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

import { useSaved } from "../context/SaveContext";
import { useFavorites } from "../context/FavContext";




import { getMostTrendingMovie } from "../../api/movies";

function FeaturedMovie() {
  const [movie, setMovie] = useState(null);

const {
  isSaved,
  addSaved,
  removeSaved
} = useSaved();

const {
  addFavorite,
  removeFavorite,
  isFavorite
} = useFavorites();

  const [likedMovies, setLikedMovies] = useState(() => {
    const savedLikes = localStorage.getItem("likedMovies");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  const [muted, setMuted] = useState(true);

  // =============================
  // Get Most Trending Movie
  // =============================

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const data = await getMostTrendingMovie();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch featured movie:", error);
      }
    };

    fetchFeaturedMovie();
  }, []);

  // =============================
  // Save Likes
  // =============================

  useEffect(() => {
    localStorage.setItem(
      "likedMovies",
      JSON.stringify(likedMovies)
    );
  }, [likedMovies]);

  // =============================
  // Save Watchlist
  // =============================

  useEffect(() => {
    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  // =============================
  // Like / Unlike
  // =============================

  const toggleLike = () => {
    if (!movie) return;
    const isLiked = isFavorite(movie.id, 'movie');
    if (!isLiked) {
      addFavorite(movie.id, 'movie'); 
    } else {
      removeFavorite(movie.id, 'movie'); 
    } 
  }

  // =============================
  // Add / Remove Watchlist
  // =============================

  const toggleWatchlist = () => {
    if (!movie) return;
    const inWatchlist = isSaved(movie.id, 'movie'); 
    if (!inWatchlist) {
      addSaved(movie.id, 'movie');
    } else {
      removeSaved(movie.id, 'movie');
    }
  };

  if (!movie) {
    return (
      <section className="bg-[#141414] px-5 pb-16 pt-6 text-white sm:px-8 lg:px-16">
        <div className="mx-auto mt-16 flex h-[400px] max-w-[1597px] items-center justify-center rounded-xl bg-[#0b0b0b]">
          <p className="text-gray-400">Loading...</p>
        </div>
      </section>
    );
  }

  const isLiked = isFavorite(movie.id, 'movie');
  const isInWatchlist = isSaved(movie.id, 'movie');

  const image = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  return (
    <section className="bg-[#141414] px-5 pb-16 pt-6 text-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1597px]">

        {/* Movie Container */}

        <div className="relative mt-16 overflow-hidden rounded-xl">

          {/* Movie Image */}

          <img
            src={image}
            alt={movie.title}
            className="block h-[400px] w-full object-cover sm:h-[500px] md:h-[600px] lg:h-[650px]"
          />

          {/* Dark Gradient */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/20 to-transparent"></div>

          {/* Movie Content */}

          <div className="absolute bottom-8 left-1/2 z-10 w-[90%] -translate-x-1/2 text-center sm:bottom-10 lg:bottom-12">

            {/* Title */}

            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              {movie.title}
            </h1>

            {/* Description */}

            <p className="mx-auto mt-3 max-w-4xl text-xs leading-5 text-[#b3b3b3] sm:text-sm">
              {movie.overview || "No description available."}
            </p>

            {/* Buttons */}

            <div className="mt-5 flex items-center justify-center gap-2">

              {/* Play */}

              <button
                onClick={() =>
                  console.log(`Playing: ${movie.title}`)
                }
                className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-medium transition hover:bg-red-700"
              >
                <FaPlay size={12} />
                Play Now
              </button>

              {/* Watchlist */}

              <button
                onClick={toggleWatchlist}
                aria-label="Add to watchlist"
                className={`flex h-11 w-11 items-center justify-center rounded-md border border-[#333] bg-[#141414] text-lg transition hover:bg-[#252525] ${
                  isInWatchlist
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {isInWatchlist ? <FaCheck /> : <FaPlus />}
              </button>

              {/* Love */}

              <button
                onClick={toggleLike}
                aria-label="Like movie"
                className={`flex h-11 w-11 items-center justify-center rounded-md border border-[#333] bg-[#141414] text-lg transition hover:bg-[#252525] ${
                  isLiked
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Sound */}

              <button
                onClick={() => setMuted((prev) => !prev)}
                aria-label="Toggle sound"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-[#333] bg-[#141414] text-lg transition hover:bg-[#252525]"
              >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;