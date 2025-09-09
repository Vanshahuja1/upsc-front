"use client";
import React, { useState, useEffect } from "react";
import { BiArrowFromBottom } from "react-icons/bi";

const TopDown = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has scrolled down enough to show the button
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-primaryred w-14 h-14 z-[80] max-sm:w-10 max-sm:h-10 rounded-full shadow-lg transition-all duration-300 ${
        isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="h-full w-full flex items-center justify-center"
      >
        <BiArrowFromBottom className="text-white h-[70%] w-[70%]" />
      </button>
    </div>
  );
};

export default TopDown;
