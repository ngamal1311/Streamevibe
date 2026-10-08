import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByGenre } from '../../../api/movies';

const GenreCard = ({ title, id }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getMoviesByGenre(id);
                const movies = data;
                const fetchedImages = movies
                    .filter((movie) => movie.poster_path)
                    .slice(0, 4)
                    .map(
                        (movie) =>
                            `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    );
                setImages(fetchedImages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImages();
    }, [id]);

    return (
        <Link to={`/MoviesandShows/movies/${title}/${id}`} className="block">
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
                    <button className="text-white text-xl">→</button>
                </div>
            </div>
        </Link>
    );
};

export default GenreCard;
