import React, { useState } from "react";
import { FaPlus, FaPlay } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { IMovie } from "../store/slices/moviesSlide/interface";
import { getUrlImage355x200 } from "../utils/urlImage";
import { genres } from "../utils/data";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

interface IMovieCard extends IMovie {}

const MovieCard: React.FC<IMovieCard> = ({ ...props }) => {
  const [showFooterCard, setShowFooterCard] = useState(false);
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const _onMouseEnterHandle = () => {
    setShowFooterCard(true);
  };

  const _onMouseLeaveHandle = () => {
    setShowFooterCard(false);
  };

  const _renderFooterCard = () => {
    return (
      <div
        className={`transition transform ${
          showFooterCard
            ? "px-3 py-4 opacity-100 scale-100 h-auto z-10 bg-black"
            : "opacity-0 scale-0 h-0 z-0"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex">
            <button className="h-[30px] w-[30px] rounded-[50%] bg-white hover:bg-gray-300 flex justify-center items-center mr-2">
              <FaPlay color="#000" size={10} />
            </button>

            <button className="h-[30px] w-[30px] rounded-[50%] border-[2px] border-gray-500 hover:border-white flex justify-center items-center mr-2">
              <FaPlus color="#FFF" size={10} />
            </button>

            <button className="h-[30px] w-[30px] rounded-[50%] border-[2px] border-gray-500 hover:border-white flex justify-center items-center">
              <BiLike color="#FFF" size={10} />
            </button>
          </div>

          <button className="h-[30px] w-[30px] rounded-[50%] border-[2px] border-gray-500 hover:border-white flex justify-center items-center mr-2">
            <AiOutlineDown color="#FFF" size={10} />
          </button>
        </div>

        <div className="mt-4 px-3 flex justify-start items-center">
          <div className="px-1 py-[1px] border-[0.5px] border-white rounded-md font-light">
            <p className="font-thin text-[10px]">+16</p>
          </div>
          <p className="font-thin text-[13px] mx-3">{props.title}</p>
          <div className="px-1 h-[17px] border-[0.5px] border-white rounded-md">
            <p className="font-thin text-[10px]">HD</p>
          </div>
        </div>

        <div className="mt-4 px-3 flex justify-between items-center">
          <div className="font-thin text-[13px] flex justify-center items-center">
            <p>User Score: </p>
            <div className="h-8 w-8 ml-2">
              <CircularProgressbarWithChildren
                value={props.vote_average * 10}
                styles={buildStyles({
                  pathColor: "#36d07a",
                })}
              >
                <div className="text-[10px]">
                  <strong>{Math.floor(props.vote_average * 10)}%</strong>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>

        <div className="mt-4 px-3 flex justify-between items-center">
          <div className="font-thin text-[13px]">
            Release Date: {props.release_date}
          </div>
        </div>

        <div className="mt-4 px-3 flex justify-start items-center">
          {props.genre_ids.map((value) => (
            <div key={value} className="font-thin text-[13px] mr-1">
              {genres[value]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative w-[100%]  h-[15vw] max-sm:h-[23vw] max-xs:h-[45vw] mt-2 mb-4 ${
        showFooterCard ? "z-10" : "z-0"
      }`}
    >
      <div
        onMouseEnter={_onMouseEnterHandle}
        onMouseLeave={_onMouseLeaveHandle}
        className="absolute w-full transition duration-500 ease-in-out hover:scale-125 max-xs:hover:scale-110 hover:translate-y-[-100px] transform hover:rounded-[5px] overflow-hidden shadow-md shadow-[#000]"
      >
        <div className="relative w-[100%] h-[15vw] max-sm:h-[23vw] max-xs:h-[45vw]">
          <div className="animate-pulse flex w-[100%] h-[15vw] max-sm:h-[23vw] max-xs:h-[45vw] space-x-4 bg-slate-400 absolute"></div>
          <a href={`/movie-detail/${props.id}`}>
            <img
              className={`w-[100%] h-[15vw] max-sm:h-[23vw] max-xs:h-[45vw] absolute transition duration-150 ${
                isLoadedImage ? "opacity-100" : "opacity-0"
              }`}
              src={getUrlImage355x200(props.backdrop_path ?? props.poster_path )}
              onLoad={() => setIsLoadedImage(true)}
            />
          </a>
        </div>

        {_renderFooterCard()}
      </div>
    </div>
  );
};

function areEqual(prevProps: IMovieCard, nextProps: IMovieCard) {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) return true;
  return false;
}

export default React.memo(MovieCard, areEqual);
