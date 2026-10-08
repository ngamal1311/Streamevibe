import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { getMovieGenres, getMoviesByGenre } from "../../api/movies";

function Categories() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Get all movie genres
        const genres = await getMovieGenres();

        // Get movies for every genre
        const categoriesWithImages = await Promise.all(
          genres.map(async (genre) => {
            const movies = await getMoviesByGenre(genre.id);

            // Get first 4 movies that have poster images
            const images = movies
              .filter((movie) => movie.poster_path)
              .slice(0, 4)
              .map(
                (movie) =>
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              );

            return {
              id: genre.id,
              name: genre.name,
              images,
            };
          }),
        );

        setCategories(categoriesWithImages);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-[#141414] px-5 py-16 text-white sm:px-8 lg:px-16">
      {/* Header */}
      <div className="mx-auto mb-10 flex max-w-[1597px] items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Explore our wide variety of categories
          </h2>

          <p className="mt-3 max-w-2xl text-sm text-[#999]">
            Whether you're looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="hidden items-center gap-3 rounded-lg border border-[#262626] bg-[#1a1a1a] p-3 md:flex">
          {/* LEFT ARROW */}
          <button
            onClick={() => swiper?.slidePrev()}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#141414] text-xl text-white transition hover:bg-[#222]"
          >
            ←
          </button>

          {/* PAGINATION */}
          <div className="flex items-center gap-1">
            {swiper &&
              Array.from({ length: swiper.snapGrid.length }).map((_, index) => (
                <span
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "w-5 bg-red-600" : "w-1 bg-[#333]"
                  }`}
                />
              ))}
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() => swiper?.slideNext()}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#141414] text-xl text-white transition hover:bg-[#222]"
          >
            →
          </button>
        </div>
      </div>

      {/* SWIPER */}
      <div className="mx-auto max-w-[1597px]">
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.snapIndex);
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              {/* CARD */}
              <div className="rounded-lg border border-[#262626] bg-[#1a1a1a] p-4">
                {/* IMAGES */}
                <div className="grid grid-cols-2 gap-2">
                  {category.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={category.name}
                      className="aspect-[1.4] w-full rounded-md object-cover"
                    />
                  ))}
                </div>

                {/* CARD FOOTER */}
                <div className="mt-5 flex items-center justify-between">
                  <h3 className="font-medium">{category.name}</h3>

                  <span className="text-xl">→</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Categories;
