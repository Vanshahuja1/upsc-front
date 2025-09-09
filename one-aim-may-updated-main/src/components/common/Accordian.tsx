"use client";
import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordianProps {
  long_description: string;
}

const Accordian: React.FC<AccordianProps> = ({ long_description }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showFullFacultyText, setShowFullFacultyText] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toggleFAQIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="screen relative my-24">
      <div
        className={`w-full   absolute bottom-0 h-[60px] ${
          showFullFacultyText
            ? "bg-transparent"
            : "bg-gradient-to-t from-[#FFF5EE] via-[#FFECDB]/70 to-[#FFF5EE] blur-xl"
        }  left-0`}
      ></div>
      <p className="text-base md:text-xl text-center mt-12 md:mt-6 px-4 md:px-0 ">
        {long_description.slice(0, 200)}
        <span
          className={`block overflow-hidden transition-all duration-500 ease-in-out ${
            showFullFacultyText
              ? "max-h-[500px] opacity-100 mt-1"
              : "max-h-0 opacity-0"
          }`}
        >
          {" "}
          {long_description.slice(200)}
        </span>
      </p>
      <div className="text-center mt-2 relative z-10">
        <button
          onClick={() => setShowFullFacultyText(!showFullFacultyText)}
          className="text-[#FF7B07] hover:underline focus:outline-none transition-colors duration-300 flex items-center gap-1 mx-auto"
        >
          {showFullFacultyText ? "Show Less" : "Show More"}
          <FaChevronDown
            className={`w-3 h-3 transition-transform ${
              showFullFacultyText ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Accordian;
