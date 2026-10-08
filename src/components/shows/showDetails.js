import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Play,
  Plus,
  Share2,
  Volume2,
  Star,
  CalendarDays,
  Languages,
  Tag,
  UserRound,
  Music,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { getShowDetails } from "../../api/shows";

export default function ShowDetails() {
  const { mid } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSeason, setOpenSeason] = useState(1);

  const castSwiperRef = useRef(null);
  const reviewsSwiperRef = useRef(null);

  // =========================================
  // GET SHOW DETAILS
  // =========================================

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);

        if (!mid) {
          setShow(null);
          return;
        }

        const data = await getShowDetails(mid);

        setShow(data);
      } catch (error) {
        console.error("Failed to fetch show details:", error);
        setShow(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [mid]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#050b12] px-6 py-20 text-white">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">
              Loading...
            </h1>

            <p className="mt-3 text-gray-500">
              Loading show details...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // SHOW NOT FOUND
  // =========================================

  if (!show) {
    return (
      <section className="min-h-screen bg-[#050b12] px-6 py-20 text-white">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">

            <h1 className="text-3xl font-semibold">
              Show Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The show you're looking for doesn't exist.
            </p>

            <Link
              to="/MoviesandShows"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium transition hover:bg-red-700"
            >
              Back to Shows
            </Link>

          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // BASIC SHOW DATA
  // =========================================

  const description =
    show.overview || "No description available.";

  const year = show.first_air_date
    ? show.first_air_date.slice(0, 4)
    : "N/A";

  const image = show.backdrop_path
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : "";

  const rating = show.vote_average
    ? Number(show.vote_average.toFixed(1))
    : 0;

  const languages =
    show.spoken_languages?.map(
      (language) => language.english_name
    ) || [];

  const genres =
    show.genres?.map(
      (genreItem) => genreItem.name
    ) || [];

  // =========================================
  // CAST
  // =========================================

  const cast =
    show.credits?.cast
      ?.filter((actor) => actor.profile_path)
      .slice(0, 12)
      .map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character || "Cast",
        image: `https://image.tmdb.org/t/p/w342${actor.profile_path}`,
      })) || [];

  // =========================================
  // DIRECTOR
  // =========================================

  const director =
    show.credits?.crew?.find(
      (person) => person.job === "Director"
    );

  // =========================================
  // MUSIC
  // =========================================

  const music =
    show.credits?.crew?.find(
      (person) =>
        person.department === "Sound" &&
        (
          person.job === "Original Music Composer" ||
          person.job === "Music"
        )
    );

  // =========================================
  // REVIEWS
  // =========================================

  const reviews =
    show.reviews?.results
      ?.filter((review) => review.content)
      .slice(0, 6)
      .map((review) => ({
        id: review.id,
        name: review.author || "Anonymous",
        country: "TMDB User",
        rating: review.author_details?.rating
          ? Number(
              (review.author_details.rating / 2).toFixed(1)
            )
          : 0,
        text: review.content,
      })) || [];

  // =========================================
  // SEASONS
  // =========================================

  const seasons =
    show.seasons?.filter(
      (season) => season.season_number > 0
    ) || [];

  // =========================================
  // SEASON TOGGLE
  // =========================================

  const toggleSeason = (seasonNumber) => {
    setOpenSeason(
      openSeason === seasonNumber
        ? null
        : seasonNumber
    );
  };

  // =========================================
  // RETURN
  // =========================================

  return (
    <section className="min-h-screen bg-[#050b12] px-5 py-6 text-white md:px-8">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <div className="mx-auto mt-16 max-w-6xl">

        <div className="relative overflow-hidden rounded-xl">

          {/* Hero Image */}

          {image ? (
            <img
              src={image}
              alt={show.name || "Show"}
              className="h-[430px] w-full object-cover md:h-[520px]"
            />
          ) : (
            <div className="h-[430px] w-full bg-[#101820] md:h-[520px]" />
          )}

          {/* Gradient */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-black/20 to-transparent" />

          {/* Hero Content */}

          <div className="absolute bottom-7 left-0 w-full px-5 text-center md:px-10">

            <h1 className="text-2xl font-bold md:text-4xl">
              {show.name}
            </h1>

            <p className="mx-auto mt-2 max-w-3xl text-xs leading-5 text-gray-300 md:text-sm">
              {description}
            </p>

            {/* Buttons */}

            <div className="mt-4 flex justify-center gap-2">

              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2 text-xs font-medium transition hover:bg-red-700"
              >
                <Play
                  size={13}
                  fill="currentColor"
                />

                Play Now
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0b141d]/90 transition hover:bg-[#17212a]"
              >
                <Plus size={14} />
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0b141d]/90 transition hover:bg-[#17212a]"
              >
                <Share2 size={13} />
              </button>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0b141d]/90 transition hover:bg-[#17212a]"
              >
                <Volume2 size={13} />
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="mx-auto mt-7 grid max-w-6xl gap-5 lg:grid-cols-[1.8fr_0.8fr]">

        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <div className="min-w-0 space-y-5">

          {/* ================================================= */}
          {/* SEASONS & EPISODES */}
          {/* ================================================= */}

          <div className="rounded-lg border border-[#18242e] bg-[#0b141d] p-4 md:p-5">

            <h2 className="mb-4 text-sm font-medium text-gray-300">
              Seasons and Episodes
            </h2>

            <div className="space-y-2">

              {seasons.length > 0 ? (
                seasons.map((season) => {

                  const isOpen =
                    openSeason === season.season_number;

                  return (
                    <div key={season.id}>

                      {/* Season Header */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleSeason(
                            season.season_number
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left transition ${
                          isOpen
                            ? "rounded-b-none bg-[#101820]"
                            : "bg-[#080f16] hover:bg-[#101820]"
                        }`}
                      >

                        <div className="flex items-center gap-2">

                          <span className="text-xs text-white">
                            Season{" "}
                            {String(
                              season.season_number
                            ).padStart(2, "0")}
                          </span>

                          <span className="text-[10px] text-gray-500">
                            {season.episode_count || 0} Episodes
                          </span>

                        </div>

                        {isOpen ? (
                          <ChevronUp
                            size={15}
                            className="text-gray-400"
                          />
                        ) : (
                          <ChevronDown
                            size={15}
                            className="text-gray-400"
                          />
                        )}

                      </button>

                      {/* Episodes */}

                      {isOpen && (
                        <div className="rounded-b-md bg-[#080f16] px-4 py-4">

                          <p className="text-xs text-gray-500">
                            {season.episode_count || 0} episodes
                          </p>

                        </div>
                      )}

                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-500">
                  No seasons available.
                </p>
              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <div className="rounded-lg border border-[#18242e] bg-[#0b141d] p-5">

            <h2 className="mb-3 text-xs font-medium text-gray-400">
              Description
            </h2>

            <p className="text-xs leading-5 text-gray-400">
              {description}
            </p>

          </div>

          {/* ================================================= */}
          {/* CAST */}
          {/* ================================================= */}

          <div className="min-w-0 rounded-lg border border-[#18242e] bg-[#0b141d] p-5">

            {/* Cast Header */}

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-xs font-medium text-gray-400">
                Cast
              </h2>

              {/* Cast Controls */}

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() =>
                    castSwiperRef.current?.slidePrev()
                  }
                  disabled={
                    cast.length === 0
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#151f28] text-gray-400 transition hover:bg-[#202c36] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={13} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    castSwiperRef.current?.slideNext()
                  }
                  disabled={
                    cast.length === 0
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#151f28] text-gray-400 transition hover:bg-[#202c36] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={13} />
                </button>

              </div>

            </div>

            {/* Cast Swiper */}

            {cast.length > 0 ? (

              <Swiper
                onSwiper={(swiper) => {
                  castSwiperRef.current = swiper;
                }}
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
                    spaceBetween: 14,
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

                      <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#151f28]">

                        <img
                          src={actor.image}
                          alt={actor.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-center transition duration-300 hover:scale-105"
                        />

                      </div>

                      {/* Actor Name */}

                      <p className="mt-2 truncate text-center text-[10px] font-medium text-white">
                        {actor.name}
                      </p>

                      {/* Character */}

                      <p className="mt-1 truncate text-center text-[8px] text-gray-500">
                        {actor.character}
                      </p>

                    </div>

                  </SwiperSlide>

                ))}

              </Swiper>

            ) : (

              <p className="text-xs text-gray-500">
                No cast available.
              </p>

            )}

          </div>

          {/* ================================================= */}
          {/* REVIEWS */}
          {/* ================================================= */}

          <div className="min-w-0 rounded-lg border border-[#18242e] bg-[#0b141d] p-5">

            {/* Reviews Header */}

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <h2 className="text-xs font-medium text-gray-400">
                Reviews
              </h2>

              <div className="flex items-center gap-2">

                {/* Previous */}

                <button
                  type="button"
                  onClick={() =>
                    reviewsSwiperRef.current?.slidePrev()
                  }
                  disabled={
                    reviews.length === 0
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#151f28] text-gray-400 transition hover:bg-[#202c36] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={13} />
                </button>

                {/* Next */}

                <button
                  type="button"
                  onClick={() =>
                    reviewsSwiperRef.current?.slideNext()
                  }
                  disabled={
                    reviews.length === 0
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#151f28] text-gray-400 transition hover:bg-[#202c36] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight size={13} />
                </button>

                {/* Add Review */}

                <button
                  type="button"
                  className="rounded-md border border-[#263541] bg-[#101820] px-3 py-2 text-[10px] text-white transition hover:bg-[#18232d]"
                >
                  + Add Your Review
                </button>

              </div>

            </div>

            {/* Reviews Swiper */}

            {reviews.length > 0 ? (

              <Swiper
                onSwiper={(swiper) => {
                  reviewsSwiperRef.current = swiper;
                }}
                spaceBetween={16}
                slidesPerView={1}
                watchOverflow={true}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                }}
                className="w-full"
              >

                {reviews.map((review) => (

                  <SwiperSlide key={review.id}>

                    <div className="h-full min-h-[150px] rounded-md bg-[#080f16] p-4">

                      {/* Review Header */}

                      <div className="mb-3 flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h3 className="truncate text-[11px] font-medium text-white">
                            {review.name}
                          </h3>

                          <p className="mt-1 text-[9px] text-gray-500">
                            {review.country}
                          </p>

                        </div>

                        {/* Rating */}

                        <div className="flex shrink-0 items-center gap-1">

                          <div className="flex">

                            {[1, 2, 3, 4, 5].map(
                              (star) => {

                                const filled =
                                  review.rating >= star;

                                return (
                                  <Star
                                    key={star}
                                    size={9}
                                    fill={
                                      filled
                                        ? "currentColor"
                                        : "none"
                                    }
                                    className={
                                      filled
                                        ? "text-red-500"
                                        : "text-gray-600"
                                    }
                                  />
                                );
                              }
                            )}

                          </div>

                          <span className="text-[9px] text-gray-500">
                            {review.rating
                              ? review.rating
                              : "N/A"}
                          </span>

                        </div>

                      </div>

                      {/* Review Text */}

                      <p className="line-clamp-6 break-words text-[10px] leading-4 text-gray-500">
                        {review.text}
                      </p>

                    </div>

                  </SwiperSlide>

                ))}

              </Swiper>

            ) : (

              <p className="text-xs text-gray-500">
                No reviews available.
              </p>

            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDEBAR */}
        {/* ================================================= */}

        <div className="h-fit rounded-lg border border-[#18242e] bg-[#0b141d] p-5">

          {/* Released Year */}

          <InfoBlock
            icon={<CalendarDays size={12} />}
            title="Released Year"
          >

            <p className="text-xs text-white">
              {year}
            </p>

          </InfoBlock>

          {/* Languages */}

          <InfoBlock
            icon={<Languages size={12} />}
            title="Available Languages"
          >

            {languages.length > 0 ? (

              <div className="flex flex-wrap gap-1.5">

                {languages.map((language) => (

                  <span
                    key={language}
                    className="rounded bg-[#151f28] px-2 py-1 text-[9px] text-gray-300"
                  >
                    {language}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-[9px] text-gray-500">
                Not Available
              </p>

            )}

          </InfoBlock>

          {/* Ratings */}

          <InfoBlock
            icon={<Star size={12} />}
            title="Ratings"
          >

            <div className="grid grid-cols-2 gap-2">

              <RatingBox
                title="TMDB"
                rating={rating}
              />

              <RatingBox
                title="Streamvibe"
                rating={rating}
              />

            </div>

          </InfoBlock>

          {/* Genres */}

          <InfoBlock
            icon={<Tag size={12} />}
            title="Genres"
          >

            {genres.length > 0 ? (

              <div className="flex flex-wrap gap-1.5">

                {genres.map((genreName) => (

                  <span
                    key={genreName}
                    className="rounded bg-[#151f28] px-2 py-1 text-[9px] text-gray-300"
                  >
                    {genreName}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-[9px] text-gray-500">
                Not Available
              </p>

            )}

          </InfoBlock>

          {/* Director */}

          <InfoBlock
            icon={<UserRound size={12} />}
            title="Director"
          >

            <PersonCard
              name={
                director?.name ||
                "Not Available"
              }
              image={
                director?.profile_path
                  ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                  : ""
              }
            />

          </InfoBlock>

          {/* Music */}

          <InfoBlock
            icon={<Music size={12} />}
            title="Music"
          >

            <PersonCard
              name={
                music?.name ||
                "Not Available"
              }
              image={
                music?.profile_path
                  ? `https://image.tmdb.org/t/p/w185${music.profile_path}`
                  : ""
              }
            />

          </InfoBlock>

        </div>

      </div>

    </section>
  );
}

// =================================================
// INFO BLOCK
// =================================================

function InfoBlock({
  icon,
  title,
  children,
}) {
  return (
    <div className="mb-5 last:mb-0">

      <div className="mb-2 flex items-center gap-1.5 text-[10px] text-gray-500">
        {icon}
        {title}
      </div>

      {children}

    </div>
  );
}

// =================================================
// RATING BOX
// =================================================

function RatingBox({
  title,
  rating,
}) {
  const numericRating = Number(rating) || 0;

  return (
    <div className="rounded-md bg-[#080f16] p-2.5">

      <p className="text-[9px] text-gray-400">
        {title}
      </p>

      <div className="mt-1 flex items-center gap-1">

        <div className="flex">

          {[1, 2, 3, 4, 5].map((item) => (

            <Star
              key={item}
              size={8}
              fill={
                numericRating / 2 >= item
                  ? "currentColor"
                  : "none"
              }
              className={
                numericRating / 2 >= item
                  ? "text-red-500"
                  : "text-gray-600"
              }
            />

          ))}

        </div>

        <span className="text-[9px] text-gray-300">
          {numericRating
            ? numericRating.toFixed(1)
            : "N/A"}
        </span>

      </div>

    </div>
  );
}

// =================================================
// PERSON CARD
// =================================================

function PersonCard({
  name,
  image,
}) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-[#080f16] p-2">

      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md">

        {image ? (

          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />

        ) : (

          <div className="flex h-full w-full items-center justify-center bg-[#151f28]">

            <UserRound
              size={14}
              className="text-gray-500"
            />

          </div>

        )}

      </div>

      <div className="min-w-0">

        <p className="truncate text-[10px] text-white">
          {name}
        </p>

        <p className="text-[8px] text-gray-500">
          From TMDB
        </p>

      </div>

    </div>
  );
}