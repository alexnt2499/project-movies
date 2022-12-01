import React, { useState } from "react";
import CustomButton from "../components/Button";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../hooks";
import { selectMovie } from "../store/slices/moviesSlide";
import { getUrlImage1920x800, getUrlImage300x450 } from "../utils/urlImage";
import { Link } from "react-router-dom";

interface IHeader {
  notBanner?: boolean;
}

const Header: React.FC<IHeader> = ({ notBanner }) => {
  const movieState = useAppSelector(selectMovie);
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const _renderSkeleton = () => {
    return !isLoadedImage ? (
      <div className="animate-pulse w-[100vw] h-[800px] bg-slate-400 absolute"></div>
    ) : (
      <div></div>
    );
  };

  const _renderBanner = () => {
    if (notBanner === true) return;
    if (movieState.listsMoviesNowPlaying.length === 0) return;
    return (
      <>
        {_renderSkeleton()}
        <img
          src={getUrlImage1920x800(
            movieState.listsMoviesNowPlaying[0].backdrop_path
          )}
          className={`object-cover w-[100vw] h-[800px] transition duration-150 ${
            isLoadedImage ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoadedImage(true)}
        />
        <div className="absolute bottom-0 pl-[5%] pb-[5%] w-full">
          <img
            src={getUrlImage300x450(
              movieState.listsMoviesNowPlaying[0].poster_path
            )}
            className={"object-cover w-[200px] mb-4 rounded-[10px]"}
          />

          <p className="w-[50%] mb-10 text-white text-[1rem]">
            {movieState.listsMoviesNowPlaying[0].overview}
          </p>
          <CustomButton
            text="PLAY"
            iconLeft={
              <FontAwesomeIcon icon={faPlay} className="mr-1" size="1x" />
            }
            classNameCustom="bg-white text-black text-[15px] hover:bg-[#e50913] hover:bg-opacity-50 hover:text-white pl-[3%] pr-[3%] pt-[1%] pb-[1%] rounded-[5px]"
          />
          <Link to={`/movie-detail/${movieState.listsMoviesNowPlaying[0].id}`}>
            <CustomButton
              text="MORE INFO"
              iconLeft={
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="mr-1"
                  size="1x"
                />
              }
              classNameCustom="ml-4 text-[15px] pt-[1%] pb-[1%] pl-[3%] pr-[3%] rounded-[5px] bg-[#6D6D6E] bg-opacity-70 hover:bg-opacity-40 text-white"
            />
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="relative top-0 left-0 right-0 bottom-0 w-full">
      <NavBar />
      {_renderBanner()}
    </div>
  );
};

export default Header;
