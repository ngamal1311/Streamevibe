import { Link } from "react-router-dom";

const MediaCard = ({
  id,
  image,
  type = "trending",
  duration,
  views,
  releaseDate,
  rating,
  reviews,
  seasons,
}) => {
  return (
    <Link
      to={`/show/${id}`}
      className="block"
    >
      <div className="bg-[#1a1a1a] border border-[#292929] rounded-lg p-3 transition duration-300 hover:border-[#444] hover:-translate-y-1">

        {/* Image */}
        <div className="overflow-hidden rounded-md">
          <img
            src={image}
            alt=""
            className="w-full aspect-[3/4] object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* Trending */}
        {type === "trending" && (
          <div className="flex items-center justify-between mt-3">

            <span className="text-[#999] text-xs flex items-center gap-1">
              <span>◷</span>
              {seasons} Seasons
            </span>

            <span className="text-[#999] text-xs flex items-center gap-1">
              <span>◉</span>
              {views}
            </span>

          </div>
        )}

        {/* New Releases */}
        {type === "new" && (
          <div className="mt-3">
            <span className="inline-block bg-[#222222] border border-[#2d2d2d] text-[#999] text-xs px-3 py-1.5 rounded-md">
              Released at {releaseDate}
            </span>
          </div>
        )}

        {/* Must Watch */}
        {type === "mustWatch" && (
          <div className="flex items-center justify-between mt-3">

            <span className="text-[#999] text-xs flex items-center gap-1">
              <span>◷</span>
              {seasons} Seasons
            </span>

            <div className="flex items-center gap-1">

              <div className="flex text-red-600 text-xs">
                {"★★★★★".slice(
                  0,
                  Math.round(rating || 5)
                )}
              </div>

              <span className="text-[#999] text-xs">
                {reviews}
              </span>

            </div>

          </div>
        )}

      </div>
    </Link>
  );
};

export default MediaCard;