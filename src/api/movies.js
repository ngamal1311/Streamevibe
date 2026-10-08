import { api } from "./api";

export const getPopularMovies = async () => {
    const data = await api("/movie/popular");
    return data.results;
};

export const getTopRatedMovies = async () => {
    const data = await api("/movie/top_rated");
    return data.results;
};

export const getTrendingMovies = async () => {
    const data = await api("/trending/movie/week");
    return data.results;
};
export const getMovieDetails = async (id) => {
    return await api(
        `/movie/${id}?append_to_response=credits,reviews`
    );
};
export const getMovieGenres = async () => {
    const data = await api("/genre/movie/list");
    return data.genres;
};
export const getMoviesByGenre = async (genreId) => {
    const data = await api(
        `/discover/movie?with_genres=${genreId}`
    );
    return data.results;
};
export const getTop10MoviesByGenre = async (genreId) => {
    const data = await api(
        `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
    );
    return data.results.slice(0, 10);
};
export const getMostTrendingMovie = async () => {
    const data = await api("/trending/movie/week");
    return data.results[0];
};