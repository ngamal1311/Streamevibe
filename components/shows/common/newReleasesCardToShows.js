import { Link } from "react-router-dom";

const NewReleaseCard = ({
  id,
  image,
  releaseDate,
}) => {
  return (
    <Link
      to={`/MoviesandShows/shows/releases/show/${id}`}
      className="block"
    >
      <div className="rounded-lg border border-[#292929] bg-[#1a1a1a] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#444]">

        {/* Image */}
        <div className="overflow-hidden rounded-md">
          <img
            src={image}
            alt=""
            className="aspect-[3/4] w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* Release Date */}
        <div className="mt-3">
          <span className="inline-block rounded-md border border-[#2d2d2d] bg-[#222222] px-3 py-1.5 text-xs text-[#999]">
            Released at {releaseDate}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default NewReleaseCard;