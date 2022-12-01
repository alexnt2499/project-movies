import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListRecommendationsApi,
  getMovieByIdApi,
} from "../../../apis/movie";

export const getMovieById = createAsyncThunk(
  "movieDetail/getMovieById",
  async (movieId: string, thunkAPI) => {
    const response = await getMovieByIdApi(movieId);
    return response.data;
  }
);

export const getListRecommendations = createAsyncThunk(
  "movieDetail/getListRecommendations",
  async (movieId: string, thunkAPI) => {
    let response = await getListRecommendationsApi(movieId);
    if (response.data?.results) return response.data.results;
    return response.data;
  }
);
