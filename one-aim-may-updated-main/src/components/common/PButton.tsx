"use client";
import Link from "next/link";
import React from "react";

const PButton = ({
  children,
  className,
  onClick,
  disabled,

  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  type?: "submit" | "button" | "reset";
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-element
    <button
      type={type}
      disabled={disabled}
      className={`${
        disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-black text-white hover:bg-primaryred"
      } mt-4  py-2 inline-block rounded-full px-12 text-center w-max  shadow-lg  transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PButton;
