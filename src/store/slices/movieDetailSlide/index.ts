import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import { IMovieDetailState } from "./interface";
import { getListRecommendations, getMovieById } from "./asyncThunk";

const initState: IMovieDetailState = {
  listRecommendations: [],
  loading: false,
  loadingRe: false,
  error: "",
  errorRe: "",
  movieDetail: null,
};

export const movieDetailSlide = createSlice({
  name: "movieDetail",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    //getMovieById
    builder.addCase(getMovieById.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getMovieById.fulfilled, (state, action) => {
      state.loading = false;
      state.movieDetail = action.payload;
      state.error = "";
    });

    builder.addCase(getMovieById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message?.toString();
    });

    //getListRecommendations
    builder.addCase(getListRecommendations.pending, (state, action) => {
      state.loadingRe = true;
      state.errorRe = "";
    });

    builder.addCase(getListRecommendations.fulfilled, (state, action) => {
      state.loadingRe = false;
      state.listRecommendations = action.payload;
      state.errorRe = "";
    });

    builder.addCase(getListRecommendations.rejected, (state, action) => {
      state.loadingRe = false;
      state.errorRe = action.error.message?.toString();
    });
  },
});

export const {} = movieDetailSlide.actions;

export const selectMovie = (state: RootState) => state.movieDetail;

export default movieDetailSlide.reducer;
