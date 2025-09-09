"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { MdFormatQuote } from "react-icons/md";
import { gsap } from "gsap";

const TestimonialCard = ({
  name,
  subHeading,
  imgsrc,
  content,
}: {
  name: string;
  subHeading: string;
  imgsrc?: string;
  content: string;
}) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);

  return (
    <section ref={cardRef} className="relative group">
      {/* Profile image with animation */}
      <div
        ref={imageRef}
        className="h-28 w-28 bg-[#ffedde] p-2 rounded-full absolute -top-14 left-1/2 -translate-x-1/2 z-10
                  shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:scale-105"
      >
        <Image
          src={imgsrc ?? "/images/placeholder.png"}
          alt="image"
          width={940}
          height={240}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Quote icon */}
      <div
        ref={quoteRef}
        className="absolute top-10 right-6 text-pink-200 opacity-50 transition-all duration-500 
                 group-hover:text-primaryred group-hover:opacity-80 group-hover:scale-110 group-hover:rotate-12"
      >
        <MdFormatQuote size={48} />
      </div>

      {/* Card content */}
      <div
        className="bg-white pt-20 pb-7 px-6 rounded-lg shadow-md 
                    transition-all duration-500 hover:shadow-xl
                    group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-pink-50"
      >
        {/* Stars that light up on hover */}

        {/* Testimonial text */}
        <p className="text-center text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
          {content}
        </p>

        {/* Border that appears on hover */}
        <div
          className="w-16 h-1 bg-gray-200 mx-auto my-4 rounded-full transform origin-left transition-all duration-500 
                      group-hover:bg-primaryred group-hover:w-32"
        ></div>

        {/* Author info */}
        <hgroup className="flex justify-center items-baseline gap-x-2">
          <p className="text-xl font-semibold text-gray-700 group-hover:text-primaryred transition-colors duration-300">
            {name}
          </p>
          <p className="text-[12px] text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
            {subHeading}
          </p>
        </hgroup>
      </div>

      {/* Background decoration that appears on hover */}
      <div
        className="absolute -bottom-2 -right-2 w-20 h-20 bg-pink-100 rounded-full opacity-0 
                    transition-all duration-500 group-hover:opacity-50 -z-10"
      ></div>
      <div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-primaryred rounded-full opacity-0 
                    transition-all duration-500 group-hover:opacity-20 -z-10"
      ></div>
    </section>
  );
};

export default TestimonialCard;
