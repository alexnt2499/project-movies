import React from "react";
import { error } from "../assets";

interface IError {
  message: string;
}

export const Error: React.FC<IError> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <img src={error} className={"w-[300px]"} />
      <p className="text-red-400 text-[30px] mt-7 text-center">{message}</p>
    </div>
  );
};
