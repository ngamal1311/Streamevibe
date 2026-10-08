import MediaSlider from "../../sliders/mediaslider";
import MustWatchCard from "../common/mustWatchCardToShows";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MustWatchSection = ({ items }) => {
  return (
    <MediaSlider
      title="Must - Watch Shows"
      items={items}
      slidesPerView={5}
      slidesPerGroup={5}
      renderItem={(show) => (
        <MustWatchCard
          id={show.id}
          image={
            show.poster_path
              ? `${IMAGE_BASE_URL}${show.poster_path}`
              : ""
          }
          rating={show.vote_average}
        />
      )}
    />
  );
};

export default MustWatchSection;