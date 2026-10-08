import { useEffect, useState } from "react";

import MediaSlider from "../../sliders/mediaslider";

import TrendingCard from "../common/trendingCardToShows";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TrendingSection = ({items}) => {
  return (
    <MediaSlider
      title="Trending Shows"
      items={items}
      slidesPerView={5}
      slidesPerGroup={5}
      renderItem={(show) => (
        <TrendingCard
          id={show.id}
          image={
            show.poster_path
              ? `${IMAGE_BASE_URL}${show.poster_path}`
              : ""
          }
          seasons={show.number_of_seasons}
          views={show.popularity}
        />
      )}
    />
  );
};

export default TrendingSection;