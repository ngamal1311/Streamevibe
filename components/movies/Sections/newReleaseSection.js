import MediaSlider from "../../sliders/mediaslider";
import NewReleaseCard from "../common/newReleasesCardToMovies";

const NewReleasesSection = ({ items, title = "New Releases" }) => {
    return (
        <MediaSlider
        title={title}
        items={items}
        slidesPerView={5}
        slidesPerGroup={5}
        renderItem={(movie) => (
            <NewReleaseCard
            id={movie.id}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            />
        )}
        />
    );
};

export default NewReleasesSection;
