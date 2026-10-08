import { Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingCard = ({
    id,
    poster_path,
    title,
    vote_average,
    release_date,
    }) => {
    const image = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "";

    const year = release_date ? release_date.slice(0, 4) : "N/A";

    return (
        <Link to={`/MoviesandShows/movies/trending/movie/${id}`} className="block">
        <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] p-3">
            <div className="overflow-hidden rounded-md">
            <img
                src={image}
                alt={title}
                className="aspect-[3/4] w-full object-cover transition duration-300 hover:scale-105"
            />
            </div>

            <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-[#999]">{year}</span>

            <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400" fill="currentColor" />

                <span className="text-xs text-[#999]">
                {vote_average?.toFixed(1)}
                </span>
            </div>
            </div>
        </div>
        </Link>
    );
};

export default TrendingCard;
