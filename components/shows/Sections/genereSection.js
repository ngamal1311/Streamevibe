import MediaSlider from "../../sliders/mediaslider";
import GenreCard from "../common/genereCardToShows";

const GenresSection = ({ genres }) => {
  return (
    <MediaSlider
      title="Our Genres"
      items={genres}
      slidesPerView={5}
      slidesPerGroup={5}
      renderItem={(genre) => (
        <GenreCard
          title={genre.name}
          id = {genre.id}
        />
      )}
    />
  );
};

export default GenresSection;