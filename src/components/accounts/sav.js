import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaTrash, FaPlay } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useSaved } from "../context/SaveContext";

import {
    getMovieDetails
} from "../../api/movies";

import {
    getShowDetails
} from "../../api/shows";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Saved() {
    const { accessToken, loading: authLoading } = useAuth();

    const {
        saved,
        loading: savedLoading,
        removeSaved,
    } = useSaved();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (authLoading || savedLoading) return;

        if (!accessToken) {
            setError("You are not logged in");
            setLoading(false);
            return;
        }

        if (saved.length === 0) {
            setItems([]);
            setLoading(false);
            return;
        }

        const loadSavedDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const savedItems = await Promise.all(
                    saved.map(async (item) => {
                        let data;

                        if (item.media_type === "movie") {
                            data = await getMovieDetails(
                                item.tmdb_id
                            );
                        } else if (item.media_type === "show") {
                            data = await getShowDetails(
                                item.tmdb_id
                            );
                        }

                        return {
                            ...data,
                            tmdb_id: item.tmdb_id,
                            media_type: item.media_type,
                        };
                    })
                );

                setItems(savedItems);

            } catch (error) {
                console.log(
                    "Get saved details error:",
                    error
                );

                setError("Failed to load saved items");

            } finally {
                setLoading(false);
            }
        };

        loadSavedDetails();

    }, [
        saved,
        accessToken,
        authLoading,
        savedLoading,
    ]);

    const handleRemove = async (tmdbId, mediaType) => {
        const success = await removeSaved(
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

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                {error}
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#141414] px-5 py-10 md:px-10 lg:px-16 mx-5">

            <div className="mb-10 mt-10">

                <div className="flex items-center gap-3 mb-2">

                    <FaBookmark className="text-red-500 text-2xl" />

                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Saved
                    </h1>

                </div>

                <p className="text-gray-400">
                    Movies and shows you saved to watch later.
                </p>

            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center">

                    <FaBookmark className="text-gray-600 text-6xl mb-5" />

                    <h2 className="text-white text-2xl font-semibold mb-2">
                        Your saved list is empty
                    </h2>

                    <p className="text-gray-400 mb-6">
                        Save movies and shows to watch them later.
                    </p>

                    <Link
                        to="/home"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        Explore Movies
                    </Link>

                </div>
            ) : (

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
                                className="group relative bg-[#1c1c1c] rounded-xl overflow-hidden"
                            >

                                <Link to={detailsPath}>

                                    <div className="aspect-[2/3] overflow-hidden">

                                        <img
                                            src={
                                                item.poster_path
                                                    ? `${TMDB_IMAGE_URL}${item.poster_path}`
                                                    : "/placeholder.jpg"
                                            }
                                            alt={title}
                                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                        />

                                    </div>

                                </Link>

                                <button
                                    onClick={() =>
                                        handleRemove(
                                            item.tmdb_id,
                                            item.media_type
                                        )
                                    }
                                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition"
                                >
                                    <FaTrash />
                                </button>

                                <div className="p-3">

                                    <h3 className="text-white font-semibold truncate">
                                        {title}
                                    </h3>

                                    <div className="flex items-center justify-between mt-2">

                                        <span className="text-gray-400 text-sm">
                                            {date
                                                ? date.slice(0, 4)
                                                : "N/A"}
                                        </span>

                                        <span className="text-gray-500 text-xs uppercase">
                                            {item.media_type}
                                        </span>

                                    </div>

                                    <Link
                                        to={`${item.media_type}/${item.tmdb_id}`}
                                        className="flex items-center justify-center gap-2 mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition"
                                    >
                                        <FaPlay className="text-xs" />
                                        Watch
                                    </Link>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </section>
    );
}

export default Saved;