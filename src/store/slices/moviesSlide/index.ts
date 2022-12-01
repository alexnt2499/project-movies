import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import {
  getListMovieNowPlaying,
  getListMovieNowPlayingLoadMore,
  searchByKeyword,
} from "./asyncThunk";
import { IMoviesState } from "./interface";


const initMoviesState: IMoviesState = {
  listsMoviesNowPlaying: [],
  loading: false,
  loadingMore: false,
  page: 1,
  hasLoadMore: true,
  error: "",
  errorLoadMore: "",
  keyword: "",
  currentTab: "now_playing",
};

export const movieSlide = createSlice({
  name: "movies",
  initialState: initMoviesState,
  reducers: {
    resetPageAndHasLoadMore: (state) => {
      state.page = 1;
      state.hasLoadMore = true;
      state.error = "";
      state.errorLoadMore = "";
      state.listsMoviesNowPlaying = [];
      state.loading = false;
      state.loadingMore = false;
    },
    setKeywordInStore: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setTabInStore: (
      state,
      action: PayloadAction<"now_playing" | "top_rated">
    ) => {
      if (state.currentTab !== action.payload) {
        state.page = 1;
        state.hasLoadMore = true;
        state.error = "";
        state.errorLoadMore = "";
        state.listsMoviesNowPlaying = [];
        state.loading = false;
        state.loadingMore = false;
      }
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // Get Init List Movie
    builder.addCase(getListMovieNowPlaying.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getListMovieNowPlaying.fulfilled, (state, action) => {
      state.listsMoviesNowPlaying = action.payload;
      state.loading = false;
      state.page = 2;
      state.error = "";
    });

    builder.addCase(getListMovieNowPlaying.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message?.toString();
    });

    // Load More List Movie
    builder.addCase(getListMovieNowPlayingLoadMore.pending, (state) => {
      state.loadingMore = true;
    });

    builder.addCase(
      getListMovieNowPlayingLoadMore.fulfilled,
      (state, action) => {
        if (action.payload.length !== 0) {
          state.listsMoviesNowPlaying = state.listsMoviesNowPlaying.concat(
            action.payload
          );
          state.loadingMore = false;
          state.loading = false;
          state.page = state.page + 1;
          state.errorLoadMore = "";
        } else {
          state.hasLoadMore = false;
          state.loadingMore = false;
        }
      }
    );

    builder.addCase(
      getListMovieNowPlayingLoadMore.rejected,
      (state, action) => {
        state.loadingMore = false;
        state.errorLoadMore = action.error.message?.toString();
      }
    );

    // Get Init Search
    builder.addCase(searchByKeyword.pending, (state) => {
      state.loadingMore = true;
    });

    builder.addCase(searchByKeyword.fulfilled, (state, action) => {
      if (action.payload.length !== 0) {
        if (state.page > 1)
          state.listsMoviesNowPlaying = state.listsMoviesNowPlaying.concat(
            action.payload
          );
        else state.listsMoviesNowPlaying = action.payload;
        state.loadingMore = false;
        state.page = state.page + 1;
        state.errorLoadMore = "";
      } else {
        state.hasLoadMore = false;
        state.loadingMore = false;
      }
    });

    builder.addCase(searchByKeyword.rejected, (state, action) => {
      state.loadingMore = false;
      state.errorLoadMore = action.error.message?.toString();
    });
  },
});

export const { resetPageAndHasLoadMore, setKeywordInStore, setTabInStore } =
  movieSlide.actions;

export const selectMovie = (state: RootState) => state.movies;

export default movieSlide.reducer;
