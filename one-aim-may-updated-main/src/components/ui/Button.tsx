import Link from "next/link";
import React from "react";

const Button = ({
  children,
  className,
  href,
  disabled,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${
        disabled ? "bg-gray-400 cursor-not-allowed" : ""
      } md:px-6 md:py-4 px-6 py-4  text-sm bg-black hover:bg-primaryred transition-all duration-500  rounded-full text-black ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
