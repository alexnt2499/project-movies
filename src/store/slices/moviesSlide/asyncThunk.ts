import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../..";
import {
  getListMovieNowPlayingApi,
  getListMovieTopRatedApi,
  searchByKeywordApi,
} from "../../../apis/movie";

export const getListMovieNowPlaying = createAsyncThunk(
  "movies/getListMovieNowPlaying",
  async (params, thunkAPI) => {
    const state: RootState | any = thunkAPI.getState();
    let response;
    
    if (state.movies.currentTab === "now_playing")
      response = await getListMovieNowPlayingApi(1);
    else response = await getListMovieTopRatedApi(1);

    if (response.data?.results) return response.data.results;
    return response.data;
  }
);

export const getListMovieNowPlayingLoadMore = createAsyncThunk(
  "movies/getListMovieNowPlayingLoadMore",
  async (params, thunkAPI) => {
    const state: RootState | any = thunkAPI.getState();

    if (state.movies.listsMoviesNowPlaying.length === 0) return [];
    if (!state.movies.hasLoadMore) return [];

    let response;

    if (state.movies.currentTab === "now_playing")
      response = await getListMovieNowPlayingApi(state.movies.page);
    else response = await getListMovieTopRatedApi(state.movies.page);

    if (response.data?.results) return response.data.results;
    return response.data;
  }
);

export const searchByKeyword = createAsyncThunk(
  "movies/searchByKeyword",
  async (params, thunkAPI) => {
    const state: RootState | any = thunkAPI.getState();

    if (!state.movies.hasLoadMore) return [];
    const response = await searchByKeywordApi(
      state.movies.page,
      state.movies.keyword
    );
    if (response.data?.results) return response.data.results;
    return response.data;
  }
);
