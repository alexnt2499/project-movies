import React from "react";
import { error404 } from "../assets";
import CustomButton from "../components/Button";
import MainLayout from "../layouts/MainLayout";
import { BiLeftArrowAlt } from "react-icons/bi";

const NotFound = () => {
  return (
    <MainLayout notBanner>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col">
        <img src={error404} />

        <a href="/" className="mt-14">
          <CustomButton text="Back to home" />
        </a>
      </div>
    </MainLayout>
  );
};

export default NotFound;
