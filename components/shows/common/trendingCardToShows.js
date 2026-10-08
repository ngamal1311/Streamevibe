import { Link } from "react-router-dom";
import { Clock, Eye } from "lucide-react";

const TrendingCard = ({
  id,
  image,
  views,
}) => {
  return (
    <Link
      to={`/MoviesandShows/shows/trending/show/${id}`}
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

        {/* Info */}
        <div className="mt-3 flex items-center justify-between">

          <span className="flex items-center gap-1 text-xs text-[#999]">
            <Eye size={13} />
            {views}
          </span>

        </div>

      </div>
    </Link>
  );
};

export default TrendingCard;