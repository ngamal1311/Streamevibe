import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getShowsByGenre } from "../../../api/shows";

const GenreCard = ({ title, id }) => {
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
      to={`/MoviesandShows/shows/${title}/${id}`}
      className="block"
    >
      <div className="bg-[#1a1a1a] border border-[#292929] rounded-lg p-3">
        {/* Images */}
        <div className="grid grid-cols-2 gap-2">
          {images?.slice(0, 4).map((image, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="w-full h-16 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Card Bottom */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-white text-sm">{title}</span>

          <span className="text-white text-xl">→</span>
        </div>
      </div>
    </Link>
  );
};

export default GenreCard;
