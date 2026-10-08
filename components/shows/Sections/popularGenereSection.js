import MediaSlider from "../../sliders/mediaslider";
import PopularGenreCard from "../common/popularGenereCardToShows";

const PopularGenresSection = ({ genres }) => {
  return (
    <MediaSlider
      title="Popular Top 10 In Genres"
      items={genres}
      slidesPerView={5}
      slidesPerGroup={5}
      renderItem={(genre) => (
        <PopularGenreCard
          title={genre.name}
          id = {genre.id}
        />
      )}
    />
  );
};

export default PopularGenresSection;