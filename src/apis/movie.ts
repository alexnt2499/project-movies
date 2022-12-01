import axiosService from "../utils/axiosService";
import { api_key } from "../utils/config";

export const getListMovieNowPlayingApi = (page: number) => {
  return axiosService.get(
    `/movie/now_playing?language=en-US&page=${page}&api_key=${api_key}`
  );
};

export const getListMovieTopRatedApi = (page: number) => {
  return axiosService.get(
    `/movie/top_rated?language=en-US&page=${page}&api_key=${api_key}`
  );
};

export const searchByKeywordApi = (page: number, keyword: string) => {
  return axiosService.get(
    `/search/movie?language=en-US&query=${keyword}&page=${page}&include_adult=false&api_key=${api_key}`
  );
};

export const getListRecommendationsApi = (movieId: string) => {
  return axiosService.get(
    `/movie/${movieId}/recommendations?language=en-US&page=${1}&api_key=${api_key}`
  );
};

export const getMovieByIdApi = (movieId: string) => {
  return axiosService.get(
    `/movie/${movieId}?language=en-US&api_key=${api_key}`
  );
};
