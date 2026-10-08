import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaHeart, FaTrash, FaPlay } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavContext";

import { getMovieDetails } from "../../api/movies";
import { getShowDetails } from "../../api/shows";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Favorites() {
    const { accessToken, loading: authLoading } = useAuth();

    const {
        favorites,
        loading: favoritesLoading,
        removeFavorite,
    } = useFavorites();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading || favoritesLoading) {
            return;
        }

        if (!accessToken) {
            setError("You are not logged in");
            setLoading(false);
            return;
        }

        if (favorites.length === 0) {
            setItems([]);
            setLoading(false);
            return;
        }

        const loadFavoriteDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const favoriteItems = await Promise.all(
                    favorites.map(async (favorite) => {
                        let data;

                        if (favorite.media_type === "movie") {
                            data = await getMovieDetails(
                                favorite.tmdb_id
                            );
                        } else if (favorite.media_type === "show") {
                            data = await getShowDetails(
                                favorite.tmdb_id
                            );
                        }

                        return {
                            ...data,
                            media_type: favorite.media_type,
                            tmdb_id: favorite.tmdb_id,
                        };
                    })
                );

                setItems(favoriteItems);
            } catch (error) {
                console.log("Get favorite details error:", error);
                setError("Failed to load favorites");
            } finally {
                setLoading(false);
            }
        };

        loadFavoriteDetails();
    }, [
        favorites,
        accessToken,
        authLoading,
        favoritesLoading,
    ]);

    const handleRemove = async (tmdbId, mediaType) => {
        const success = await removeFavorite(
            tmdbId,
            mediaType
        );

        if (success) {
            setItems((prev) =>
                prev.filter(
                    (item) =>
                        !(
                            item.tmdb_id === tmdbId &&
                            item.media_type === mediaType
                        )
                )
            );
        }
    };

    if (authLoading || favoritesLoading || loading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <p className="text-lg text-gray-400">
                    Loading favorites...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
                <div className="text-center">
                    <FaHeart className="text-red-600 text-5xl mx-auto mb-5" />

                    <h2 className="text-2xl font-bold mb-2">
                        {error}
                    </h2>

                    <Link
                        to="/login"
                        className="inline-block mt-5 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-6 lg:px-10 py-10">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10 mt-10">
                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                        <FaHeart className="text-red-500 text-xl" />
                    </div>

                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            My Favorites
                        </h1>

                        <p className="text-gray-400 mt-1">
                            Movies and shows you don't want to forget
                        </p>
                    </div>

                </div>
            </div>

            {/* Empty */}
            {items.length === 0 ? (
                <div className="max-w-7xl mx-auto">

                    <div className="min-h-[400px] flex flex-col items-center justify-center text-center bg-[#171717] border border-[#292929] rounded-2xl">

                        <FaHeart className="text-gray-600 text-6xl mb-5" />

                        <h2 className="text-2xl font-semibold mb-2">
                            Your favorites are empty
                        </h2>

                        <p className="text-gray-500 max-w-md mb-6">
                            Start adding movies and shows to your
                            favorites and they will appear here.
                        </p>

                        <Link
                            to="/movies"
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
                        >
                            Explore Movies
                        </Link>

                    </div>

                </div>
            ) : (

                /* Grid */
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">

                        {items.map((item) => {

                            const isMovie =
                                item.media_type === "movie";

                            const title = isMovie
                                ? item.title
                                : item.name;

                            const date = isMovie
                                ? item.release_date
                                : item.first_air_date;

                            const detailsPath = isMovie
                                ? `/movie/${item.tmdb_id}`
                                : `/tv/${item.tmdb_id}`;

                            return (
                                <div
                                    key={`${item.media_type}-${item.tmdb_id}`}
                                    className="
                                        group
                                        bg-[#1c1c1c]
                                        rounded-xl
                                        overflow-hidden
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:bg-[#222222]
                                    "
                                >

                                    {/* Poster */}
                                    <div className="relative aspect-[2/3] overflow-hidden">

                                        <Link to={detailsPath}>
                                            <img
                                                src={
                                                    item.poster_path
                                                        ? `${TMDB_IMAGE_URL}${item.poster_path}`
                                                        : "/placeholder.jpg"
                                                }
                                                alt={title}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                    group-hover:scale-105
                                                "
                                            />
                                        </Link>

                                        {/* Dark overlay */}
                                        <div className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-black/40
                                            via-transparent
                                            to-transparent
                                            pointer-events-none
                                        " />

                                        {/* Delete */}
                                        <button
                                            onClick={() =>
                                                handleRemove(
                                                    item.tmdb_id,
                                                    item.media_type
                                                )
                                            }
                                            className="
                                                absolute
                                                top-3
                                                right-3
                                                w-10
                                                h-10
                                                rounded-full
                                                bg-black/70
                                                backdrop-blur-sm
                                                flex
                                                items-center
                                                justify-center
                                                text-white
                                                hover:bg-red-600
                                                transition-all
                                                duration-200
                                                z-10
                                            "
                                            title="Remove from favorites"
                                        >
                                            <FaTrash className="text-sm" />
                                        </button>

                                    </div>

                                    {/* Card Info */}
                                    <div className="p-3">

                                        <h3 className="font-semibold text-white text-base truncate">
                                            {title}
                                        </h3>

                                        <div className="flex items-center justify-between mt-2 text-sm">

                                            <span className="text-gray-400">
                                                {date
                                                    ? date.slice(0, 4)
                                                    : "N/A"}
                                            </span>

                                            <span className="text-gray-500 uppercase text-xs">
                                                {item.media_type === "movie"
                                                    ? "MOVIE"
                                                    : "SHOW"}
                                            </span>

                                        </div>

                                        {/* Watch */}
                                        <Link
                                            to={`${item.media_type}/${item.tmdb_id}`}
                                            className="
                                                mt-3
                                                w-full
                                                h-10
                                                rounded-lg
                                                bg-red-600
                                                hover:bg-red-700
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                font-medium
                                                transition-colors
                                                duration-200
                                            "
                                        >
                                            <FaPlay className="text-xs" />
                                            Watch
                                        </Link>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                </div>
            )}

        </div>
    );
}

export default Favorites;