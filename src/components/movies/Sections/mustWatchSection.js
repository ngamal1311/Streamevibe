import MediaSlider from "../../sliders/mediaslider";
import MustWatchCard from "../common/mustWatchCardToMovies";

const MustWatchSection = ({
    items,
    title = "Must - Watch Movies",
}) => {
    return (
        <MediaSlider
            title={title}
            items={items}
            slidesPerView={4}
            slidesPerGroup={4}
            renderItem={(movie) => (
                <MustWatchCard
                    id={movie.id}
                    poster_path={movie.poster_path}
                    duration={movie.runtime}
                    rating={movie.vote_average}
                    reviews={movie.reviews?.results || []}
                />
            )}
        />
    );
};

export default MustWatchSection;