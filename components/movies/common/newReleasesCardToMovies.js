import { Link } from "react-router-dom";

const NewReleaseCard = ({ id, poster_path, release_date }) => {
    const image = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "";
    return (
        <Link to={`/MoviesandShows/movies/releases/movie/${id}`} className="block">
        <div className="bg-[#1a1a1a] border border-[#292929] rounded-lg p-3 transition duration-300 hover:-translate-y-1 hover:border-[#444]">
            {/* Poster */}
            <div className="overflow-hidden rounded-md">
            <img
                src={image}
                alt=""
                className="w-full aspect-[3/4] object-cover transition duration-300 hover:scale-105"
            />
            </div>

            {/* Release Date */}
            <div className="mt-3">
            <span className="inline-block bg-[#222222] border border-[#2d2d2d] text-[#999] text-xs px-3 py-1.5 rounded-md">
                Released at {release_date}
            </span>
            </div>
        </div>
        </Link>
    );
};

export default NewReleaseCard;
