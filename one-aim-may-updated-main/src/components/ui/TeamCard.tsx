"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const TeamCard = ({
  name,
  qualification,
  description,
  role,
  image = "/images/team/team.png",
  experience,
  designation,
  specialization,
  facultSlug,
}: {
  name: string;
  qualification?: string;
  experience?: string;
  description?: string;
  education?: string;
  subject?: string;
  role?: string;
  image?: string;
  designation?: string;
  specialization?: string;
  facultSlug: string;
}) => {
  return (
    <div className="group rounded-2xl relative group overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl h-[clamp(400px,47vw,500px)] ">
      <div className="h-full">
        <Image
          src={image || "/images/placeholder.png"}
          alt={`${name} team member photo`}
          width={720}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className=" scale-y-0 group-hover:scale-y-100 origin-top duration-500 transition-all h-full rounded-2xl w-full absolute top-0 left-0 bg-gradient-to-t from-[#c1151b]/70 to-[#c1151b]/80 backdrop-blur-[2px] flex items-center justify-center px-4 sm:px-6 md:px-8 z-10">
        <div className="w-full space-y-3">
          <div className="w-full sm:space-y-3">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {name}
            </h1>
            {role && (
              <p className="text-center text-sm sm:text-base text-white/90 font-medium -mt-1 mb-1">
                {designation}
              </p>
            )}
            <div className="w-full h-[1px] bg-white/80"></div>

            {/* Qualification Box */}
            <div className="flex flex-col gap-y-3 mt-3 ">
              <div className="flex items-center gap-x-2">
                {/* Image Container  */}
                <div>
                  <div className="bg-white/90 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center shadow-sm">
                    <div className="h-[70%] w-[70%]">
                      <Image
                        src={"/images/icons/expertise.svg"}
                        alt={"icon1"}
                        width={32}
                        height={32}
                        className="w-full h-full bg-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-white text-xs sm:text-sm font-medium">
                  {experience}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                {/* Image Container  */}
                <div>
                  <div className="bg-white/90 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center shadow-sm">
                    <div className="h-[70%] w-[70%]">
                      <Image
                        src={"/images/icons/open-book.svg"}
                        alt={"icon1"}
                        width={32}
                        height={32}
                        className="w-full h-full bg-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-white text-xs sm:text-sm font-medium">
                  {qualification}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                {/* Image Container  */}
                <div>
                  <div className="bg-white/90 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center shadow-sm">
                    <div className="h-[70%] w-[70%]">
                      <Image
                        src={"/images/icons/molecule.svg"}
                        alt={"icon1"}
                        width={32}
                        height={32}
                        className="w-full h-full bg-cover"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-white text-xs sm:text-sm font-medium">
                  {specialization}
                </p>
              </div>
            </div>
          </div>

          <div className="max-h-[150px] custom-scrollbar">
            <p className="text-left text-sm text-white font-medium px-2 md:line-clamp-4 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 cursor-pointer">
          <Link
            href={`/faculty/${facultSlug}`}
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center bg-white hover:bg-[#FFFFFF] hover:scale-110 transition-all duration-300 shadow-md"
            aria-label="View more details"
          >
            <div className="h-1/2 w-[75%]">
              <Image
                src={"/images/icons/arrow-2.svg"}
                alt="arrow"
                width={164}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile text overlay when not hovered - only shown on touch devices */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:hidden">
        <h3 className="text-white font-bold text-lg">{name}</h3>
        {role && <p className="text-white/90 text-sm">{role}</p>}
      </div>
    </div>
  );
};

export default TeamCard;

// Add this CSS to your global styles or component:
// .custom-scrollbar::-webkit-scrollbar {
//   width: 4px;
// }
// .custom-scrollbar::-webkit-scrollbar-track {
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
// }
// .custom-scrollbar::-webkit-scrollbar-thumb {
//   background: rgba(255, 255, 255, 0.3);
//   border-radius: 10px;
// }
