import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getListRecommendations,
  getMovieById,
} from "../store/slices/movieDetailSlide/asyncThunk";
import { getUrlImage1920x800, getUrlImage300x450 } from "../utils/urlImage";
import { FaPlus, FaPlay } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Error } from "../components/Error";
import ReactLoading from "react-loading";
import { formatterUSD } from "../utils/format";
import MovieCard from "../components/MovieCard";

export const MovieDetail = () => {
  let { movieId } = useParams();
  const dispatch = useAppDispatch();
  const movieDetailState = useAppSelector((state) => state.movieDetail);
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const _renderSkeleton = () => {
    return !isLoadedImage ? (
      <div className="animate-pulse w-[100vw] h-[800px] max-sm:h-[500px] max-xs:h-[300px]  max-xss:h-[300px] bg-slate-400 absolute"></div>
    ) : (
      <div></div>
    );
  };

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieById(movieId));
      dispatch(getListRecommendations(movieId));
    }
  }, []);

  const _renderGenres = () => {
    return movieDetailState.movieDetail?.genres.map((value, index) => {
      return (
        <div key={value.id} className="flex justify-center items-center">
          <div className="w-1 h-1 rounded-[50%] bg-white mx-2" />
          <p>{value.name}</p>
        </div>
      );
    });
  };

  const _renderControl = () => {
    let percentage: number = movieDetailState.movieDetail?.vote_average
      ? movieDetailState.movieDetail?.vote_average * 10
      : 0;

    return (
      <div className="flex mb-3 items-between">
        <div className="h-[55px] w-[55px] mr-4">
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: "#36d07a",
            })}
          >
            <div className="text-[20px]">
              <strong>
                {Math.floor(percentage)}
                <span className="text-[7px]">%</span>
              </strong>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <button className="h-[50px] w-[50px] rounded-[50%] bg-white hover:bg-gray-300 flex justify-center items-center mr-2">
          <FaPlay color="#000" size={20} />
        </button>

        <button className="h-[50px] w-[50px] rounded-[50%] border-[2px] border-gray-500 hover:border-white flex justify-center items-center mr-2">
          <FaPlus color="#FFF" size={20} />
        </button>

        <button className="h-[50px] w-[50px] rounded-[50%] border-[2px] border-gray-500 hover:border-white flex justify-center items-center mr-2">
          <BiLike color="#FFF" size={20} />
        </button>
      </div>
    );
  };

  const _renderContent = () => {
    if (movieDetailState.error)
      return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <Error message={movieDetailState.error} />
        </div>
      );
    if (movieDetailState.loading)
      return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <ReactLoading type={"bars"} color="#fff" />
        </div>
      );
    return (
      <div>
        <div className="w-[100vw] h-[800px] max-sm:h-auto max-xs:h-auto  max-xss:h-auto flex justify-center items-center max-sm:flex-col max-xs:flex-col  max-xss:flex-col">
          {_renderSkeleton()}
          <img
            src={getUrlImage1920x800(
              movieDetailState.movieDetail?.backdrop_path
            )}
            className={
              "absolute max-sm:static max-xs:static  max-xss:static object-cover w-[100vw] h-[800px] max-sm:h-[500px] max-xs:h-[300px]  max-xss:h-[300px] opacity-20"
            }
            onLoad={() => setIsLoadedImage(true)}
            onError={() => setIsLoadedImage(true)}

          />
          <div className="px-[10%]  max-sm:pt-14  max-xs:pt-14  max-xss:pt-14 max-sm:flex-col max-xs:flex-col  max-xss:flex-col justify-center items-center  max-xss:flex-col w-full flex overflow-hidden">
            <img
              src={getUrlImage300x450(
                movieDetailState.movieDetail?.poster_path
              )}
              className={
                "object-cover w-[300px] max-sm:w-[80%] max-xs:w-[80%]  max-xss:w-[80%] mb-4 rounded-[10px]"
              }
            />

            <div className="ml-10">
              <h2 className="text-[30px] font-extrabold">
                {movieDetailState.movieDetail?.title}
              </h2>
              <div className="mb-5 mt-5 flex items-center max-sm:flex-col max-xs:flex-col  max-xss:flex-col max-sm:items-start  max-xs:items-start  max-xss:items-start">
                <div className="border border-white w-6 h-6 flex justify-center items-center rounded-md">
                  <p>R</p>
                </div>
                <p className="ml-2">
                  {movieDetailState.movieDetail?.release_date} (
                  {movieDetailState.movieDetail?.spoken_languages.map(
                    (value, index) => {
                      if (
                        movieDetailState.movieDetail?.spoken_languages
                          .length ===
                        index + 1
                      )
                        return <span key={value.name}> {value.name} </span>;

                      return <span key={value.name}>{value.name + ","}</span>;
                    }
                  )}
                  )
                </p>
                {_renderGenres()}
              </div>
              {_renderControl()}
              <p className="w-[90%] min-w-[300px] mb-2 text-white font-thin italic text-[1rem]">
                {movieDetailState.movieDetail?.tagline}
              </p>
              <h3 className="text-[25px] font-bold">Overview</h3>
              <p className="w-[90%] min-w-[300px] mb-10 text-white text-[1rem]">
                {movieDetailState.movieDetail?.overview}
              </p>

              <p className="mb-1">
                <span className="text-[20px] font-bold">Status:</span>{" "}
                {movieDetailState.movieDetail?.status}
              </p>
              <p>
                <span className="text-[20px] font-bold">Budget:</span>{" "}
                {formatterUSD.format(
                  movieDetailState.movieDetail?.budget
                    ? movieDetailState.movieDetail?.budget
                    : 0
                )}
              </p>
            </div>
          </div>
        </div>
        {_renderListRe()}
      </div>
    );
  };

  const _renderListRe = () => {
    if (movieDetailState.errorRe) return <></>;

    return (
      <div className="my-6 mx-10">
        <h2 className="mt-10 text-[30px] font-extrabold">Recommendations</h2>
        <div className=" grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-lg:gap-3 max-sm:grid-cols-2 max-sm:gap-2 max-xs:grid-cols-1 max-xs:gap-1 h-auto">
          {movieDetailState.listRecommendations.map((value, index) => {
            return <MovieCard key={`${value.id}${index}`} {...value} />;
          })}
        </div>
      </div>
    );
  };

  return <MainLayout notBanner={true}>{_renderContent()}</MainLayout>;
};
