import React, { useEffect, useState } from "react";
import { FiSearch, FiAlignLeft, FiGrid } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../hooks";
import useDebounce from "../hooks/useDebounce";
import {
  resetPageAndHasLoadMore,
  selectMovie,
  setKeywordInStore,
  setTabInStore,
} from "../store/slices/moviesSlide";
import {
  getListMovieNowPlaying,
  searchByKeyword,
} from "../store/slices/moviesSlide/asyncThunk";

const SearchContent = () => {
  const [keyword, setKeyword] = useState<string>("");
  const dispatch = useAppDispatch();
  const movieState = useAppSelector(selectMovie);

  let debouncedValue = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedValue) {
      dispatch(resetPageAndHasLoadMore());
      dispatch(setKeywordInStore(debouncedValue));
      dispatch(searchByKeyword());
    } else {
      dispatch(resetPageAndHasLoadMore());
      dispatch(setKeywordInStore(debouncedValue));
      dispatch(getListMovieNowPlaying());
    }
  }, [debouncedValue]);

  const _onChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.currentTarget.value);
  };

  const _onChangeTab = (tabName: "now_playing" | "top_rated") => {
    dispatch(setTabInStore(tabName));
    dispatch(getListMovieNowPlaying());
  };

  return (
    <div className="w-full flex max-sm:flex-col justify-between items-center">
      <div className="flex  items-center w-[338px] max-sm:w-[100%] h-[38px] relative">
        <FiSearch className="absolute left-4" size={18} />
        <input
          className="flex items-center w-[230px] max-sm:w-[100%] h-[38px] pl-12 pr-3 text-[13px] bg-black border border-white"
          placeholder="Titles, people, genres"
          onChange={_onChangeSearch}
        />
      </div>
      <div className="flex max-sm:mt-4 w-full justify-end">
        <button
          className={`h-[38px] w-[108px] flex justify-center items-center border transition hover:transition border-white hover:bg-white hover:text-black ${
            movieState.currentTab === "now_playing" ? "bg-white text-black" : ""
          } cursor-pointer`}
          onClick={() => _onChangeTab("now_playing")}
        >
          <p>Now Playing</p>
        </button>
        <button
          className={`h-[38px] w-[108px] ml-3 flex justify-center items-center border transition hover:transition border-white hover:bg-white hover:text-black ${
            movieState.currentTab === "top_rated" ? "bg-white text-black" : ""
          } cursor-pointer`}
          onClick={() => _onChangeTab("top_rated")}
        >
          <p>Top Rated</p>
        </button>
      </div>
    </div>
  );
};

export default SearchContent;
