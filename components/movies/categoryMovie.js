import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronDown,
  Heart,
  Bookmark,
  SlidersHorizontal,
  Star,
  Clock,
} from "lucide-react";

import { getMoviesByGenre } from "../../api/movies";
import { useFavorites } from '../context/FavContext'
import { useSaved } from '../context/SaveContext'

export default function CategoryMovies() {
const {
    isFavorite,
    removeFavorite,
    addFavorite
} = useFavorites();
const {
  isSaved,
  addSaved,
  removeSaved
} = useSaved();
  const { genre } = useParams();
  const { id } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("popularity");
  const [showSort, setShowSort] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // =============================
  // Favorite & Save
  // =============================
  const [saved, setSaved] = useState([]);

  const toggleFavorite = (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();

    const flag = isFavorite(movieId,'movie')
    if (!flag) {
      addFavorite(movieId, 'movie')
    }
    else {
      removeFavorite(movieId, 'movie')
    }
  };

  const toggleSave = (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();

    const flag = isSaved(movieId,'movie')
    if (!flag) {
      addSaved(movieId, 'movie')
    }
    else {
      removeSaved(movieId, 'movie')
    }
  };

  // =============================
  // GET MOVIES BY GENRE
  // =============================

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const data = await getMoviesByGenre(id);

        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovies();
    }
  }, [id]);

  // =============================
  // Rating Filter + Sorting
  // =============================

  const filteredMovies = useMemo(() => {
    let result = movies.filter(
      (movie) =>
        Number(movie.vote_average || 0) >= Number(minRating)
    );

    if (sortBy === "popularity") {
      result.sort(
        (a, b) =>
          (b.popularity || 0) - (a.popularity || 0)
      );
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          (b.vote_average || 0) -
          (a.vote_average || 0)
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.release_date || 0) -
          new Date(a.release_date || 0)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.release_date || 0) -
          new Date(b.release_date || 0)
      );
    }

    if (sortBy === "az") {
      result.sort((a, b) =>
        (a.title || "").localeCompare(
          b.title || ""
        )
      );
    }

    return result;
  }, [movies, sortBy, minRating]);

  // =============================
  // Genre Title
  // =============================

  const genreTitle =
    genre?.charAt(0).toUpperCase() +
    genre?.slice(1);

  // =============================
  // Loading
  // =============================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#050b12] px-5 py-6 text-white md:px-8">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              Loading...
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Loading {genre} movies...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#050b12] px-5 py-6 text-white md:px-8">

      {/* ================= HEADER ================= */}

      <div className="mx-8 mb-6 mt-16 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            All {genre} Movies

            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredMovies.length} movies)
            </span>
          </h1>
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex items-center gap-3">

          {/* ================= SORT ================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#24303b] bg-[#0b141d] px-4 text-sm text-gray-300 transition hover:border-[#3b4855]"
            >
              <span>Sort by:</span>

              <span className="font-medium text-white">
                {sortBy === "popularity" &&
                  "Popularity"}

                {sortBy === "rating" &&
                  "Rating"}

                {sortBy === "newest" &&
                  "Newest"}

                {sortBy === "oldest" &&
                  "Oldest"}

                {sortBy === "az" && "A-Z"}
              </span>

              <ChevronDown
                size={15}
                className={`transition ${
                  showSort ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSort && (
              <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-[#24303b] bg-[#0b141d] shadow-2xl">

                {[
                  ["popularity", "Popularity"],
                  ["rating", "Rating"],
                  ["newest", "Newest"],
                  ["oldest", "Oldest"],
                  ["az", "A-Z"],
                ].map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => {
                      setSortBy(value);
                      setShowSort(false);
                    }}
                    className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-[#15212c] ${
                      sortBy === value
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* ================= FILTER ================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#24303b] bg-[#0b141d] px-4 text-sm text-gray-300 transition hover:border-[#3b4855]"
            >
              <SlidersHorizontal size={15} />

              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-[#24303b] bg-[#0b141d] p-4 shadow-2xl">

                <p className="mb-3 text-sm font-medium text-white">
                  Minimum Rating
                </p>

                <div className="space-y-2">

                  {[0, 6, 7, 8, 9].map((rating) => (
                    <button
                      type="button"
                      key={rating}
                      onClick={() => {
                        setMinRating(rating);
                        setShowFilter(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-[#15212c] ${
                        minRating === rating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      {rating === 0
                        ? "All Ratings"
                        : `${rating}+`}
                    </button>
                  ))}

                </div>

              </div>
            )}

          </div>

        </div>
      </div>

      {/* ================= MOVIES GRID ================= */}

      {filteredMovies.length > 0 ? (

        <div className="mx-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

          {filteredMovies.map((movie) => {

            const image = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "";

            const year = movie.release_date
              ? movie.release_date.slice(0, 4)
              : "N/A";

            const movieRating =
              movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "N/A";

            return (
              <Link
                key={movie.id}
                to={`/MoviesandShows/movies/genre/${genre}/${id}/${movie.id}`}
                className="group overflow-hidden rounded-xl border border-[#18242e] bg-[#0b141d] transition duration-300 hover:-translate-y-1 hover:border-[#344552] hover:shadow-xl"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative aspect-[2/3] overflow-hidden">

                  <img
                    src={image}
                    alt={movie.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Dark Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                  {/* ================= FAVORITE + SAVE ================= */}

                  <div className="absolute right-2 top-2 z-10 flex gap-2">

                    {/* Favorite */}

                    <button
                      type="button"
                      onClick={(e) =>
                        toggleFavorite(
                          e,
                          movie.id
                        )
                      }
                      className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
                        (isFavorite( movie.id, 'movie'))
                          ? "bg-red-500 text-white"
                          : "bg-[#0a1118]/90 text-white hover:bg-[#181818]"
                      }`}
                    >
                      <Heart
                        size={16}
                        fill={
                          (isFavorite(movie.id, 'movie'))
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* Save */}

                    <button
                      type="button"
                      onClick={(e) =>
                        toggleSave(
                          e,
                          movie.id
                        )
                      }
                      className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
                          (isSaved(movie.id,'movie'))
                          ? "bg-yellow-500 text-black"
                          : "bg-[#0a1118]/90 text-white hover:bg-[#181818]"
                      }`}
                    >
                      <Bookmark
                        size={16}
                        fill={
                          (isSaved(movie.id,'movie'))
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                  </div>

                </div>

                {/* ================= INFO ================= */}

                <div className="p-3">

                  <h2 className="truncate text-sm font-medium text-white">
                    {movie.title}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    {year}
                  </p>

                  <div className="mt-3 flex items-center justify-between">

                    {/* Rating */}

                    <div className="flex items-center gap-1">

                      <Star
                        size={13}
                        fill="#facc15"
                        className="text-yellow-400"
                      />

                      <span className="text-xs text-gray-300">
                        {movieRating}
                      </span>

                    </div>

                    {/* Duration */}

                    <div className="flex items-center gap-1 text-xs text-gray-500">

                      <Clock size={12} />

                      <span>
                        Movie
                      </span>

                    </div>

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      ) : (

        /* ================= EMPTY STATE ================= */

        <div className="flex min-h-[400px] items-center justify-center">

          <div className="text-center">

            <p className="text-lg font-medium text-gray-300">
              No movies found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filter.
            </p>

          </div>

        </div>

      )}

    </section>
  );
}