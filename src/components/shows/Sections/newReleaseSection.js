import MediaSlider from "../../sliders/mediaslider";
import NewReleaseCard from "../common/newReleasesCardToShows";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const NewReleaseSection = ({ items }) => {
  return (
    <MediaSlider
      title="New Releases"
      items={items}
      slidesPerView={5}
      slidesPerGroup={5}
      renderItem={(show) => (
        <NewReleaseCard
          id={show.id}
          image={
            show.poster_path
              ? `${IMAGE_BASE_URL}${show.poster_path}`
              : ""
          }
          releaseDate={show.first_air_date}
        />
      )}
    />
  );
};

export default NewReleaseSection;