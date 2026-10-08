import { useEffect, useMemo, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  ChevronDown,
  Heart,
  Bookmark,
  SlidersHorizontal,
  Star,
  Tv,
} from "lucide-react";

import { getShowsByGenre } from "../../api/shows";
import {useFavorites} from '../context/FavContext'
import {useSaved} from '../context/SaveContext'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function CategoryShows() {

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

  const { genre, id } = useParams();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("popularity");
  const [showSort, setShowSort] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);

  // =============================
  // Get Shows From TMDB API
  // =============================

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Genre ID is missing.");
          return;
        }

        const data = await getShowsByGenre(id);

        setShows(data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load shows.");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [id]);

  // =============================
  // Favorite
  // =============================

  const toggleFavorite = (e, showId) => {
    e.preventDefault();
    e.stopPropagation();

    const flag = isFavorite(showId, 'show')
    if(!flag) {
      addFavorite(showId, 'show')
    }
    else {
      removeFavorite(showId, 'show')
    }
  };
  // =============================
  // Save
  // =============================

  const toggleSave = (e, showId) => {
    e.preventDefault();
    e.stopPropagation();

    const flag = isSaved(showId, 'show');
    if (!flag) {
      addSaved(showId, 'show');
    } else {
      removeSaved(showId, 'show');
    }
  };

  // =============================
  // Filter + Sort
  // =============================

  const filteredShows = useMemo(() => {
    let result = shows.filter(
      (show) =>
        Number(show.vote_average || 0) >= Number(minRating)
    );

    // Popularity
    if (sortBy === "popularity") {
      result.sort(
        (a, b) =>
          Number(b.popularity || 0) -
          Number(a.popularity || 0)
      );
    }

    // Rating
    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.vote_average || 0) -
          Number(a.vote_average || 0)
      );
    }

    // Newest
    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.first_air_date || 0) -
          new Date(a.first_air_date || 0)
      );
    }

    // Oldest
    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.first_air_date || 0) -
          new Date(b.first_air_date || 0)
      );
    }

    // A-Z
    if (sortBy === "az") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
      );
    }

    return result;
  }, [shows, sortBy, minRating]);

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
      <section className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#292929] border-t-red-600" />

          <p className="text-sm text-[#999]">
            Loading shows...
          </p>

        </div>

      </section>
    );
  }

  // =============================
  // Error
  // =============================

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4 text-white">

        <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] px-8 py-10 text-center">

          <h2 className="text-xl font-semibold">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-[#777]">
            {error}
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f0f0f] px-4 py-10 text-white md:px-8 lg:px-12">

      {/* ================= HEADER ================= */}

      <div className="mx-8 mb-8 mt-16 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-semibold md:text-3xl">
            All {genreTitle} Shows
          </h1>

          <p className="mt-2 text-sm text-[#999]">
            Explore all {genreTitle} shows available on StreamVibe.
          </p>

        </div>

        {/* ================= CONTROLS ================= */}

        <div className="flex gap-3">

          {/* ================= SORT ================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#1a1a1a] px-4 py-3 text-sm text-white hover:bg-[#222]"
            >
              <span>Sort By</span>

              <ChevronDown size={17} />
            </button>

            {showSort && (
              <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border border-[#292929] bg-[#181818] p-2">

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
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-[#252525] ${
                      sortBy === value
                        ? "bg-[#252525] text-red-500"
                        : "text-white"
                    }`}
                  >
                    {label}
                  </button>

                ))}

              </div>
            )}

          </div>

          {/* ================= FILTER ================= */}

          <button
            type="button"
            onClick={() => {
              setShowFilter(!showFilter);
              setShowSort(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#1a1a1a] px-4 py-3 text-sm text-white hover:bg-[#222]"
          >
            <SlidersHorizontal size={17} />

            Filter
          </button>

        </div>

      </div>

      {/* ================= FILTER ================= */}

      {showFilter && (
        <div className="mx-8 mb-8 rounded-lg border border-[#292929] bg-[#171717] p-5">

          <label className="mb-3 block text-sm text-[#aaa]">

            Minimum Rating:{" "}

            <span className="text-white">
              {minRating}
            </span>

          </label>

          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={minRating}
            onChange={(e) =>
              setMinRating(e.target.value)
            }
            className="w-full accent-red-600"
          />

        </div>
      )}

      {/* ================= SHOWS GRID ================= */}

      {filteredShows.length > 0 ? (

        <div className="mx-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

          {filteredShows.map((show) => {

            // =============================
            // TMDB Data
            // =============================

            const image = show.poster_path
              ? `${IMAGE_BASE_URL}${show.poster_path}`
              : null;

            const year = show.first_air_date
              ? show.first_air_date.substring(0, 4)
              : "N/A";

            const rating =
              show.vote_average != null
                ? show.vote_average.toFixed(1)
                : "N/A";

            return (
              <Link
                key={show.id}
                to={`/MoviesandShows/shows/top10InGenre/${genre}/${id}/${show.id}`}
                className="group"
              >

                <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#444]">

                  {/* ================= IMAGE ================= */}

                  <div className="relative overflow-hidden rounded-md">

                    {image ? (

                      <img
                        src={image}
                        alt={show.name}
                        loading="lazy"
                        className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                    ) : (

                      <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#252525] text-xs text-[#777]">
                        No Image
                      </div>

                    )}

                    {/* ================= FAVORITE + SAVE ================= */}

                    <div className="absolute right-2 top-2 z-10 flex gap-2">

                      {/* Favorite */}

                      <button
                        type="button"
                        onClick={(e) =>
                          toggleFavorite(
                            e,
                            show.id
                          )
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
                          (isFavorite(show.id, 'show'))
                            ? "bg-red-500 text-white"
                            : "bg-[#0a1118]/90 text-white hover:bg-[#181818]"
                        }`}
                      >

                        <Heart
                          size={16}
                          fill={
                            (isFavorite(show.id, 'show'))
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
                            show.id
                          )
                        }
                        className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
                          (isSaved(show.id, 'show'))
                            ? "bg-yellow-400 text-black"
                            : "bg-[#0a1118]/90 text-white hover:bg-[#181818]"
                        }`}
                      >

                        <Bookmark
                          size={16}
                          fill={
                            (isSaved(show.id, 'show'))
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                    </div>

                  </div>

                  {/* ================= INFO ================= */}

                  <div className="mt-3">

                    {/* Show Name */}

                    <h3 className="truncate text-sm font-medium text-white">
                      {show.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">

                      {/* Year */}

                      <span className="text-xs text-[#999]">
                        {year}
                      </span>

                      {/* Rating */}

                      <div className="flex items-center gap-1">

                        <Star
                          size={13}
                          fill="currentColor"
                          className="text-red-500"
                        />

                        <span className="text-xs text-[#999]">
                          {rating}
                        </span>

                      </div>

                    </div>

                    {/* Seasons */}

                    <div className="mt-2 flex items-center gap-1 text-xs text-[#777]">

                      <Tv size={13} />

                      Seasons N/A

                    </div>

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      ) : (

        /* ================= EMPTY STATE ================= */

        <div className="flex min-h-[300px] items-center justify-center">

          <div className="text-center">

            <h2 className="text-xl font-semibold">
              No shows found
            </h2>

            <p className="mt-2 text-sm text-[#777]">
              Try changing your filter.
            </p>

          </div>

        </div>

      )}

    </section>
  );
}