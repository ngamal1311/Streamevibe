import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import {
  FaPlay,
  FaPlus,
  FaCheck,
  FaHeart,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import { getMovieDetails } from "../../api/movies";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function MovieDetails() {

  const { mid } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [castSwiper, setCastSwiper] = useState(null);
  const [reviewSwiper, setReviewSwiper] = useState(null);

  // -----------------------------
  // Fetch Movie Details
  // -----------------------------

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        if (!mid) {
          setError("Movie ID is missing.");
          return;
        }

        const data = await getMovieDetails(mid);

        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [mid]);

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-red-600" />

          <p className="text-sm text-gray-400">
            Loading movie details...
          </p>

        </div>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (error || !movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141414] px-5 text-white">

        <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] px-8 py-10 text-center">

          <h2 className="mb-2 text-xl font-semibold">
            Something went wrong
          </h2>

          <p className="text-sm text-gray-400">
            {error || "Movie not found."}
          </p>

        </div>
      </div>
    );
  }

  // -----------------------------
  // Movie Data
  // -----------------------------

  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE_URL}original${movie.backdrop_path}`
    : movie.poster_path
      ? `${IMAGE_BASE_URL}original${movie.poster_path}`
      : "";

  const cast =
    movie.credits?.cast
      ?.filter((actor) => actor.profile_path)
      .slice(0, 12) || [];

  const reviews =
    movie.reviews?.results
      ?.filter((review) => review.content)
      .slice(0, 6) || [];

  const director =
    movie.credits?.crew?.find(
      (person) => person.job === "Director"
    ) || null;

  const music =
    movie.credits?.crew?.find(
      (person) =>
        person.job === "Original Music Composer" ||
        person.department === "Sound"
    ) || null;

  // -----------------------------
  // Helpers
  // -----------------------------

  const formatDate = (date) => {
    if (!date) return "N/A";

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) {
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  };

  const getRatingStars = (rating) => {
    const roundedRating = Math.round(rating / 2);

    return Array.from({ length: 5 }).map((_, index) =>
      index < roundedRating ? (
        <FaStar
          key={index}
          className="text-[9px] text-red-600"
        />
      ) : (
        <FaRegStar
          key={index}
          className="text-[9px] text-[#555]"
        />
      )
    );
  };

  // -----------------------------
  // JSX
  // -----------------------------

  return (
    <main className="min-h-screen bg-[#141414] px-4 py-10 text-white sm:px-6 lg:px-10">

      <div className="mx-auto max-w-[1200px]">

        {/* =========================================
            HERO
        ========================================= */}

        <section className="relative mt-16 overflow-hidden rounded-lg">

          {backdrop ? (
            <img
              src={backdrop}
              alt={movie.title}
              className="h-[220px] w-full object-cover sm:h-[300px] lg:h-[390px]"
            />
          ) : (
            <div className="h-[220px] w-full bg-[#1a1a1a] sm:h-[300px] lg:h-[390px]" />
          )}

          {/* Gradient */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent" />

          {/* Content */}

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-7 text-center sm:pb-9">

            <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
              {movie.title}
            </h1>

            <p className="mt-2 max-w-2xl text-[10px] leading-4 text-gray-300 sm:text-xs">
              {movie.overview || "No description available."}
            </p>

            {/* Buttons */}

            <div className="mt-4 flex items-center gap-2">

              {/* Play */}

              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-[10px] font-medium transition hover:bg-red-700 sm:text-xs"
              >
                <FaPlay size={9} />
                Play Now
              </button>

              {/* Watchlist */}

              <button
                type="button"
                onClick={() =>
                  setIsWatchlisted(!isWatchlisted)
                }
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#444] bg-[#1a1a1a]/90 transition hover:bg-[#252525]"
              >
                {isWatchlisted ? (
                  <FaCheck size={10} />
                ) : (
                  <FaPlus size={10} />
                )}
              </button>

              {/* Like */}

              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#444] bg-[#1a1a1a]/90 transition hover:bg-[#252525]"
              >
                <FaHeart
                  size={10}
                  className={
                    isLiked
                      ? "text-red-600"
                      : "text-white"
                  }
                />
              </button>

              {/* Mute */}

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#444] bg-[#1a1a1a]/90 transition hover:bg-[#252525]"
              >
                {isMuted ? (
                  <FaVolumeMute size={10} />
                ) : (
                  <FaVolumeUp size={10} />
                )}
              </button>

            </div>
          </div>
        </section>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">

          {/* =====================================
              LEFT SIDE
          ===================================== */}

          <div className="min-w-0 space-y-4">

            {/* ===================================
                DESCRIPTION
            =================================== */}

            <section className="rounded-md border border-[#292929] bg-[#1a1a1a] p-5">

              <h3 className="mb-3 text-[10px] text-gray-500">
                Description
              </h3>

              <p className="text-[10px] leading-5 text-gray-300">
                {movie.overview ||
                  "No description available."}
              </p>

            </section>

            {/* ===================================
                CAST
            =================================== */}

            <section className="rounded-md border border-[#292929] bg-[#1a1a1a] p-5">

              {/* Cast Header */}

              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-[10px] text-gray-500">
                  Cast
                </h3>

                {/* Cast Controls */}

                <div className="flex gap-1">

                  <button
                    type="button"
                    onClick={() =>
                      castSwiper?.slidePrev()
                    }
                    disabled={
                      !castSwiper ||
                      castSwiper.isBeginning
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#333] bg-[#141414] text-gray-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FaArrowLeft size={8} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      castSwiper?.slideNext()
                    }
                    disabled={
                      !castSwiper ||
                      castSwiper.isEnd
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#333] bg-[#141414] text-gray-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FaArrowRight size={8} />
                  </button>

                </div>

              </div>

              {/* Cast Swiper */}

              {cast.length > 0 ? (

                <Swiper
                  onSwiper={setCastSwiper}
                  spaceBetween={12}
                  slidesPerView={2}
                  watchOverflow={true}
                  breakpoints={{
                    480: {
                      slidesPerView: 3,
                      spaceBetween: 12,
                    },

                    640: {
                      slidesPerView: 4,
                      spaceBetween: 12,
                    },

                    768: {
                      slidesPerView: 5,
                      spaceBetween: 12,
                    },

                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 14,
                    },
                  }}
                  className="w-full"
                >

                  {cast.map((actor) => (

                    <SwiperSlide key={actor.id}>

                      <div className="min-w-0">

                        {/* Actor Image */}

                        <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-[#252525]">

                          <img
                            src={`${IMAGE_BASE_URL}w342${actor.profile_path}`}
                            alt={actor.name}
                            loading="lazy"
                            className="h-full w-full object-cover object-center transition duration-300 hover:scale-105"
                          />

                        </div>

                        {/* Actor Name */}

                        <p className="mt-2 truncate text-center text-[9px] font-medium text-white">
                          {actor.name}
                        </p>

                        {/* Character */}

                        <p className="mt-1 truncate text-center text-[8px] text-gray-500">
                          {actor.character ||
                            "Cast"}
                        </p>

                      </div>

                    </SwiperSlide>

                  ))}

                </Swiper>

              ) : (

                <p className="text-[10px] text-gray-500">
                  No cast information available.
                </p>

              )}

            </section>

            {/* ===================================
                REVIEWS
            =================================== */}

            <section className="rounded-md border border-[#292929] bg-[#1a1a1a] p-5">

              {/* Reviews Header */}

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                <h3 className="text-[10px] text-gray-500">
                  Reviews
                </h3>

                <div className="flex items-center gap-1">

                  {/* Previous */}

                  <button
                    type="button"
                    onClick={() =>
                      reviewSwiper?.slidePrev()
                    }
                    disabled={
                      !reviewSwiper ||
                      reviewSwiper.isBeginning
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#333] bg-[#141414] text-gray-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FaArrowLeft size={8} />
                  </button>

                  {/* Next */}

                  <button
                    type="button"
                    onClick={() =>
                      reviewSwiper?.slideNext()
                    }
                    disabled={
                      !reviewSwiper ||
                      reviewSwiper.isEnd
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#333] bg-[#141414] text-gray-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FaArrowRight size={8} />
                  </button>

                  {/* Add Review */}

                  <button
                    type="button"
                    className="ml-1 rounded-md border border-[#333] bg-[#141414] px-3 py-2 text-[9px] text-white transition hover:bg-[#222]"
                  >
                    + Add Your Review
                  </button>

                </div>

              </div>

              {/* Reviews Swiper */}

              {reviews.length > 0 ? (

                <Swiper
                  onSwiper={setReviewSwiper}
                  spaceBetween={12}
                  slidesPerView={1}
                  watchOverflow={true}
                  breakpoints={{
                    700: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                    },
                  }}
                  className="w-full"
                >

                  {reviews.map((review) => {

                    const authorName =
                      review.author_details?.name ||
                      review.author ||
                      "Anonymous";

                    const rating =
                      review.author_details?.rating;

                    return (
                      <SwiperSlide
                        key={review.id}
                      >

                        <article className="h-full min-h-[165px] rounded-md border border-[#292929] bg-[#151515] p-4">

                          {/* Review Header */}

                          <div className="flex items-start justify-between gap-3">

                            {/* Author */}

                            <div className="min-w-0">

                              <h4 className="truncate text-[10px] font-medium text-white">
                                {authorName}
                              </h4>

                              <p className="mt-1 text-[8px] text-gray-500">
                                TMDB User
                              </p>

                              <p className="mt-1 text-[8px] text-gray-600">
                                {formatDate(
                                  review.created_at
                                )}
                              </p>

                            </div>

                            {/* Rating */}

                            {rating ? (

                              <div className="flex shrink-0 items-center gap-1 rounded bg-[#201010] px-2 py-1">

                                <div className="flex items-center gap-[1px]">
                                  {getRatingStars(
                                    rating
                                  )}
                                </div>

                                <span className="text-[8px] text-gray-500">
                                  {(rating / 2).toFixed(
                                    1
                                  )}
                                </span>

                              </div>

                            ) : (

                              <span className="text-[8px] text-gray-600">
                                N/A
                              </span>

                            )}

                          </div>

                          {/* Review Text */}

                          <p className="mt-4 line-clamp-6 break-words text-[9px] leading-4 text-gray-400">
                            {review.content}
                          </p>

                        </article>

                      </SwiperSlide>
                    );
                  })}

                </Swiper>

              ) : (

                <div className="rounded-md border border-[#292929] bg-[#151515] p-6 text-center">

                  <p className="text-[10px] text-gray-500">
                    No reviews available for this
                    movie.
                  </p>

                </div>

              )}

            </section>

          </div>

          {/* =====================================
              RIGHT SIDE
          ===================================== */}

          <aside className="rounded-md border border-[#292929] bg-[#1a1a1a] p-5">

            {/* Released Year */}

            <div className="mb-5">

              <p className="mb-2 flex items-center gap-2 text-[9px] text-gray-500">
                <span>◷</span>
                Released Year
              </p>

              <p className="text-[10px] text-white">
                {movie.release_date
                  ? movie.release_date.substring(0, 4)
                  : "N/A"}
              </p>

            </div>

            {/* Languages */}

            <div className="mb-5">

              <p className="mb-2 flex items-center gap-2 text-[9px] text-gray-500">
                <span>◉</span>
                Available Languages
              </p>

              <div className="flex flex-wrap gap-1.5">

                {movie.spoken_languages?.length > 0 ? (

                  movie.spoken_languages.map(
                    (language) => (

                      <span
                        key={language.iso_639_1}
                        className="rounded border border-[#333] bg-[#151515] px-2 py-1 text-[8px] text-gray-300"
                      >
                        {language.english_name ||
                          language.name}
                      </span>

                    )
                  )

                ) : (

                  <span className="text-[9px] text-gray-500">
                    N/A
                  </span>

                )}

              </div>

            </div>

            {/* Ratings */}

            <div className="mb-5">

              <p className="mb-2 flex items-center gap-2 text-[9px] text-gray-500">
                <FaStar size={8} />
                Ratings
              </p>

              <div className="grid grid-cols-2 gap-2">

                <div className="rounded-md border border-[#292929] bg-[#151515] p-2">

                  <p className="text-[8px] text-gray-400">
                    TMDB
                  </p>

                  <div className="mt-1 flex items-center gap-1">

                    <FaStar
                      size={8}
                      className="text-red-600"
                    />

                    <span className="text-[9px]">
                      {movie.vote_average
                        ? movie.vote_average.toFixed(
                            1
                          )
                        : "N/A"}
                    </span>

                  </div>

                </div>

                <div className="rounded-md border border-[#292929] bg-[#151515] p-2">

                  <p className="text-[8px] text-gray-400">
                    Votes
                  </p>

                  <div className="mt-1">

                    <span className="text-[9px]">
                      {movie.vote_count || 0}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Genres */}

            <div className="mb-5">

              <p className="mb-2 text-[9px] text-gray-500">
                Genres
              </p>

              <div className="flex flex-wrap gap-1.5">

                {movie.genres?.length > 0 ? (

                  movie.genres.map((genre) => (

                    <span
                      key={genre.id}
                      className="rounded border border-[#333] bg-[#151515] px-2 py-1 text-[8px] text-gray-300"
                    >
                      {genre.name}
                    </span>

                  ))

                ) : (

                  <span className="text-[9px] text-gray-500">
                    N/A
                  </span>

                )}

              </div>

            </div>

            {/* Director */}

            {director && (

              <div className="mb-5">

                <p className="mb-2 text-[9px] text-gray-500">
                  Director
                </p>

                <div className="flex items-center gap-2 rounded-md bg-[#151515] p-2">

                  {director.profile_path ? (

                    <img
                      src={`${IMAGE_BASE_URL}w185${director.profile_path}`}
                      alt={director.name}
                      className="h-9 w-9 rounded-md object-cover"
                    />

                  ) : (

                    <div className="h-9 w-9 rounded-md bg-[#252525]" />

                  )}

                  <div className="min-w-0">

                    <p className="truncate text-[9px] text-white">
                      {director.name}
                    </p>

                    <p className="mt-0.5 text-[7px] text-gray-500">
                      {director.known_for_department ||
                        "Director"}
                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* Music */}

            {music && (

              <div>

                <p className="mb-2 text-[9px] text-gray-500">
                  Music
                </p>

                <div className="flex items-center gap-2 rounded-md bg-[#151515] p-2">

                  {music.profile_path ? (

                    <img
                      src={`${IMAGE_BASE_URL}w185${music.profile_path}`}
                      alt={music.name}
                      className="h-9 w-9 rounded-md object-cover"
                    />

                  ) : (

                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#252525] text-[10px]">
                      ♪
                    </div>

                  )}

                  <div className="min-w-0">

                    <p className="truncate text-[9px] text-white">
                      {music.name}
                    </p>

                    <p className="mt-0.5 text-[7px] text-gray-500">
                      Music Composer
                    </p>

                  </div>

                </div>

              </div>

            )}

          </aside>

        </div>

      </div>

    </main>
  );
}

export default MovieDetails;