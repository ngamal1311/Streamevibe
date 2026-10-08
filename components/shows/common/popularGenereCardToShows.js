import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getShowsByGenre } from "../../../api/shows";
const PopularGenreCard = ({
  title,
  id,
}) => {
  const [images, setImages] = useState([]);
    useEffect(() => {
      const fetchImages = async () => {
        const data = await getShowsByGenre(id);
        const shows = data;
        const fetchedImages = shows
          .filter((show) => show.poster_path)
          .slice(0, 4)
          .map((show) => `https://image.tmdb.org/t/p/w500${show.poster_path}`);
          setImages(fetchedImages);
      };
      fetchImages();
    });
  return (
    <Link
      to={`/MoviesandShows/shows/top10InGenre/${title}/${id}`}
      className="block"
    >
      <div className="rounded-xl border border-[#292929] bg-[#1a1a1a] p-3 transition duration-300 hover:-translate-y-1 hover:border-[#444]">

        {/* Images */}
        <div className="grid grid-cols-2 gap-2">
          {images?.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-md"
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-24 w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between">

          <div>
            <span className="mb-1 inline-block rounded-md bg-red-600 px-2 py-1 text-[10px] font-medium text-white">
              Top 10 In
            </span>

            <h3 className="text-sm font-medium text-white">
              {title}
            </h3>
          </div>

          <span className="text-xl text-white">
            →
          </span>

        </div>

      </div>
    </Link>
  );
};

export default PopularGenreCard;