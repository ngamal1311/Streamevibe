import { api } from "./api";

export const getPopularShows = async () => {
  const data = await api("/tv/popular");
  return data.results;
};

export const getTopRatedShows = async () => {
    const data = await api("/tv/top_rated");
    return data.results;
};

export const getTrendingShows = async () => {
    const data = await api("/trending/tv/week");
    return data.results;
};

export const getShowDetails = async (id) => {
  return await api(
    `/tv/${id}?append_to_response=credits,reviews`
  );
};
export const getShowGenres = async () => {
  const data = await api("/genre/tv/list");
  return data.genres;
};

export const getShowsByGenre = async (genreId) => {
  const data = await api(
    `/discover/tv?with_genres=${genreId}`
  );
  return data.results;
};

export const getTop10ShowsByGenre = async (genreId) => {
  const data = await api(
    `/discover/tv?with_genres=${genreId}&sort_by=popularity.desc`
  );
  return data.results.slice(0, 10);
};

export const getNewReleaseShows = async () => {
  const data = await api(
    "/discover/tv?sort_by=first_air_date.desc"
  );

  return data.results;
};