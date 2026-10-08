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
import {useFavorites} from '../context/FavContext'

import { getShowsByGenre } from "../../api/shows";
import { useSaved } from "../context/SaveContext";

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

  const [sortBy, setSortBy] = useState("popularity");
  const [showSort, setShowSort] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const [saved, setSaved] = useState([]);

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
  // Get Shows By Genre ID
  // =============================

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);

        const data = await getShowsByGenre(id);

        setShows(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch shows:", error);
        setShows([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchShows();
    }
  }, [id]);

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
          (b.popularity || 0) -
          (a.popularity || 0)
      );
    }

    // Rating
    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          (b.vote_average || 0) -
          (a.vote_average || 0)
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
        (a.name || "").localeCompare(b.name || "")
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
      <section className="min-h-screen bg-[#0f0f0f] px-4 py-10 text-white md:px-8 lg:px-12">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              Loading...
            </h1>

            <p className="mt-2 text-sm text-[#777]">
              Loading {genre} shows...
            </p>
          </div>
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
            All {genre} Shows

            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredShows.length} shows)
            </span>
          </h1>

          <p className="mt-2 text-sm text-[#999]">
            Explore all {genreTitle} shows available
            on StreamVibe.
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
              className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#1a1a1a] px-4 py-3 text-sm text-white transition hover:bg-[#222]"
            >
              <span>Sort By</span>

              <ChevronDown
                size={17}
                className={`transition ${
                  showSort ? "rotate-180" : ""
                }`}
              />
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
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-[#252525] ${
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

          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-[#292929] bg-[#1a1a1a] px-4 py-3 text-sm text-white transition hover:bg-[#222]"
            >
              <SlidersHorizontal size={17} />

              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-[#292929] bg-[#181818] p-4">

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
                      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-[#252525] ${
                        minRating === rating
                          ? "text-red-500"
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

      {/* ================= SHOWS GRID ================= */}

      {filteredShows.length > 0 ? (

        <div className="mx-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

          {filteredShows.map((show) => {

            const image = show.poster_path
              ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
              : "";

            const year = show.first_air_date
              ? show.first_air_date.slice(0, 4)
              : "N/A";

            const rating = show.vote_average
              ? show.vote_average.toFixed(1)
              : "N/A";

            return (
              <Link
                key={show.id}
                to={`/MoviesandShows/shows/${genre}/${id}/${show.id}`}
                className="group"
              >

                <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#444]">

                  {/* ================= IMAGE ================= */}

                  <div className="relative overflow-hidden rounded-md">

                    <img
                      src={image}
                      alt={show.name}
                      className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* ================= FAVORITE + SAVE ================= */}

                    <div className="absolute right-2 top-2 flex gap-2">

                      {/* FAVORITE */}

                      <button
                        type="button"
                        onClick={(e) =>
                          toggleFavorite(e, show.id)
                        }
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
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

                      {/* SAVE */}

                      <button
                        type="button"
                        onClick={(e) =>
                          toggleSave(e, show.id)
                        }
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                          (isSaved(show.id, 'show'))
                            ? "bg-yellow-400 text-black"
                            : "bg-[#0a1118]/90 text-white hover:bg-[#181818]"
                        }`}
                      >
                        <Bookmark
                          size={16}
                          fill={
                            isSaved(show.id, 'show')
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                    </div>

                  </div>

                  {/* ================= INFO ================= */}

                  <div className="mt-3">

                    <h3 className="truncate text-sm font-medium text-white">
                      {show.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">

                      {/* YEAR */}

                      <span className="text-xs text-[#999]">
                        {year}
                      </span>

                      {/* RATING */}

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

                    {/* TYPE */}

                    <div className="mt-2 flex items-center gap-1 text-xs text-[#777]">

                      <Tv size={13} />

                      TV Show

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