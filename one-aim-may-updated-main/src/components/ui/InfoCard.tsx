import Image from "next/image";
import React from "react";

const InfoCard = ({
  className,
  src,
  number,
  desc,
}: {
  className?: string;
  src: string;
  number: string;
  desc: string;
}) => {
  return (
    <div className="relative group transition-all duration-300 hover:scale-105">
      {/* Background shape */}
      <div
        className={`bg-[#DC8940]/10  absolute top-0 left-0 h-full rounded-2xl w-full rotate-[8deg] transition-all duration-500 group-hover:rotate-[4deg] group-hover:bg-[#DC8940]/20 ${className}`}
      ></div>

      {/* Main card */}
      <div
        className="bg-white py-8 sm:py-12 lg:py-16 px-6 sm:px-10 lg:px-16 rounded-2xl relative z-50 
                    shadow-sm transition-all duration-300 
                    group-hover:shadow-xl"
      >
        <div className="space-y-3 relative z-20">
          {/* Icon container with animation */}
          <div
            className="bg-[#333333] h-16 w-16 sm:h-20 sm:w-20 p-3 rounded-full mx-auto
                        transform transition-all duration-500 
                        group-hover:scale-110 group-hover:bg-[#222222]"
          >
            <Image
              src={src}
              alt={desc}
              width={42}
              height={64}
              className="w-full h-full bg-cover transition-transform duration-700 
                        group-hover:rotate-12"
            />
          </div>

          {/* Text group with animations */}
          <hgroup className="text-center transition-all duration-300 space-y-2">
            <h2
              className="text-[#DC8940] text-4xl sm:text-5xl lg:text-3xl xl:text-5xl font-bold transition-all 
                          group-hover:text-[#c97b36]"
            >
              {number}k+
            </h2>
            <p
              className="text-[#DC8940] transition-all
                        group-hover:text-[#c97b36]"
            >
              {desc}
            </p>
          </hgroup>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
