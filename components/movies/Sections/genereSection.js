import MediaSlider from "../../sliders/mediaslider";
import GenreCard from "../common/genereCardToMovies";

const GenresSection = ({ genres}) => {
    return (
        <MediaSlider
            title="Our Genres"
            items={genres}
            slidesPerView={5}
            slidesPerGroup={5}
            renderItem={(genre) => (
                <GenreCard
                    id = {genre.id}
                    title={genre.name}
                />
            )}
        />
    );
};

export default GenresSection;