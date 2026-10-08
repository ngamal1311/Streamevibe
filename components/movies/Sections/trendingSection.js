import MediaSlider from "../../sliders/mediaslider";
import MediaCard from "../common/trendingCardToMovies.js";

const TrendingSection = ({ items, title = "Trending Now" }) => {
    return (
        <MediaSlider
        title={title}
        items={items}
        slidesPerView={5}
        slidesPerGroup={5}
        renderItem={(movie) => (
            <MediaCard
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            />
        )}
        />
    );
};

export default TrendingSection;