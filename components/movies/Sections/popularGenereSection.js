import MediaSlider from "../../sliders/mediaslider";
import PopularGenreCard from "../common/popularGenereCardToMovies";

const PopularGenresSection = ({ genres }) => {
    return (
        <MediaSlider
            title="Popular Top 10 In Genres"
            items={genres}
            slidesPerView={4}
            slidesPerGroup={4}
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