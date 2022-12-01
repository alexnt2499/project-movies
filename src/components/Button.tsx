import React from "react";

interface ICustomButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  classNameCustom?: string;
  iconLeft?: React.ReactNode;
}

const CustomButton: React.FC<ICustomButton> = ({
  text,
  classNameCustom,
  iconLeft,
  ...props
}) => {
  return (
    <button
      type="button"
      className={
        `bg-[#e50913] text-sm px-3 py-2 text-white  ${classNameCustom}`
      }
      {...props}
    >
      {iconLeft}
      {text}
    </button>
  );
};

export default CustomButton;
