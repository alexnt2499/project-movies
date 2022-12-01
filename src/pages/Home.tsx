import React, { useCallback, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import SearchContent from "../components/SearchContent";
import { useAppDispatch, useAppSelector } from "../hooks";
import Layout from "../layouts/MainLayout";
import { selectMovie } from "../store/slices/moviesSlide";
import {
  getListMovieNowPlaying,
  getListMovieNowPlayingLoadMore,
  searchByKeyword,
} from "../store/slices/moviesSlide/asyncThunk";
import ReactLoading from "react-loading";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Error } from "../components/Error";

function Home() {
  const movieState = useAppSelector(selectMovie);
  const dispatch = useAppDispatch();

  useEffect(() => {
    _getListMoviePlayNowInit();
  }, []);

  const observer: React.MutableRefObject<any> = useRef();

  const triggerElement = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log(movieState.keyword);
          
          if (movieState.keyword) {
            _searchByKeywordLoadMore();
          } else {
            _getListMoviePlayNowLoadMore();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [movieState.loading, movieState.hasLoadMore]
  );

  const _getListMoviePlayNowInit = async () => {
    dispatch(getListMovieNowPlaying());
  };

  const _getListMoviePlayNowLoadMore = () => {
    if (movieState.listsMoviesNowPlaying.length !== 0 && movieState.hasLoadMore)
      dispatch(getListMovieNowPlayingLoadMore());
  };

  const _searchByKeywordLoadMore = async () => {
    dispatch(searchByKeyword());
  };

  const _renderContent = () => {
    if (movieState.error)
      return (
        <Error message={movieState.error} />
      );
    if (movieState.loading)
      return (
        <div className="flex justify-center mt-10">
          <ReactLoading type={"bars"} color="#fff" />
        </div>
      );

    return (
      <div className=" mt-6  grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-lg:gap-3 max-sm:grid-cols-2 max-sm:gap-2 max-xs:grid-cols-1 max-xs:gap-1 h-auto">
        {movieState.listsMoviesNowPlaying.map((value, index) => {
          return <MovieCard key={`${value.id}${index}`} {...value} />;
        })}
      </div>
    );
  };

  return (
    <Layout>
      <PullToRefresh pullingContent={""} onRefresh={_getListMoviePlayNowInit}>
        <div className="p-8 pt-24 z-[-1]">
          <SearchContent />
          {_renderContent()}
        </div>
      </PullToRefresh>

      {movieState.loadingMore ? (
        <div className="flex justify-center mt-10">
          <ReactLoading type={"bars"} color="#fff" />
        </div>
      ) : null}
      {movieState.error ? null : (
        <div className="w-full h-10 bg-black" ref={triggerElement}></div>
      )}
    </Layout>
  );
}

export default Home;
