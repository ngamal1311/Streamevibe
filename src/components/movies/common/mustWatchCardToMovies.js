import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";

const MustWatchCard = ({
    id,
    poster_path,
    rating,
    }) => {
        const image =`https://image.tmdb.org/t/p/w500${poster_path}`
    return (
        <Link
        to={`/MoviesandShows/movies/mustwatch/movie/${id}`}
        className="block"
        >
        <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#444]">

            {/* Poster */}
            <div className="overflow-hidden rounded-md">
            <img
                src={image}
                alt=""
                className="aspect-[3/4] w-full object-cover transition duration-300 hover:scale-105"
            />
            </div>

            {/* Info */}
            <div className="mt-3 flex items-center justify-between">

            {/* Rating */}
            <div className="flex items-center gap-1">

                <div className="flex text-xs text-red-600">
                {"★★★★★".slice(0, Math.round(rating || 5))}
                </div>

            </div>

            </div>

        </div>
        </Link>
    );
};

export default MustWatchCard;