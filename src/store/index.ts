import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlide";
import movieDetailReducer from "./slices/movieDetailSlide";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
