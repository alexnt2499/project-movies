export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<
    | 28
    | 12
    | 16
    | 35
    | 80
    | 99
    | 18
    | 10751
    | 14
    | 36
    | 27
    | 10402
    | 9648
    | 10749
    | 878
    | 10770
    | 53
    | 10752
    | 37
  >;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMoviesState {
  listsMoviesNowPlaying: Array<IMovie>;
  loading: boolean;
  loadingMore: boolean;
  page: number;
  hasLoadMore: boolean;
  error: string | undefined;
  errorLoadMore: string | undefined;
  keyword: string;
  currentTab: "now_playing" | "top_rated";
}
