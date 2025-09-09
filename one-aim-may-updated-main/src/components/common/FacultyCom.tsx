import { Faculty } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FacultyCom: React.FC<Faculty> = ({
  name,
  designation,
  experience,
  qualifications,
  specialization,
  facebook_link,
  twitter_link,
  linkedin_link,
  instagram_link,
  featured_image_url,
}) => {
  return (
    <div className="padding-top">
      <div className="mdl:flex hidden">
        {/* Part 2 will go here */}
        <div className="ml-28">
          <div className="h-[18rem] w-[18rem] rounded-full bg-white scale-150 relative left-16 overflow-hidden">
            <Image
              src={featured_image_url || "/images/placeholder.png"}
              alt=""
              width={1200}
              height={1200}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div className="w-[100%] bg-[#DC8940] py-20 pl-52 flex items-center -my-14">
          <div className="space-y-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {name}
            </h1>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">Designation:</h5>
              <p> {designation}</p>
            </div>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">Experience:</h5>
              <p> {experience} years</p>
            </div>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg ">
                Qualifications:
              </h5>
              <p> {qualifications}</p>
            </div>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">
                Specialization:
              </h5>
              <p> {specialization}</p>
            </div>
            <div className="text-white flex gap-x-4 mt-4">
              <div className="flex items-center gap-x-3">
                {facebook_link && (
                  <Link
                    href={facebook_link}
                    aria-label="Facebook"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* Facebook SVG Icon */}
                  </Link>
                )}
                {twitter_link && (
                  <Link
                    href={twitter_link}
                    aria-label="Twitter"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* Twitter SVG Icon */}
                  </Link>
                )}
                {linkedin_link && (
                  <Link
                    href={linkedin_link}
                    aria-label="LinkedIn"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* LinkedIn SVG Icon */}
                  </Link>
                )}
                {instagram_link && (
                  <Link
                    href={instagram_link}
                    aria-label="Instagram"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* Instagram SVG Icon */}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Part 4 will go here */}
      <div className="screen mdl:hidden">
        <div className="h-[14rem] w-[14rem] rounded-full bg-white top-7 mx-auto relative overflow-hidden">
          <Image
            src={featured_image_url || "/images/placeholder.png"}
            alt={name}
            width={1200}
            height={1200}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="w-full bg-[#DC8940] py-10 rounded-xl">
          <div className="space-y-2 pl-6 text-center">
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <div className="text-white flex flex-col md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">Designation:</h5>
              <p> {designation} </p>
            </div>
            <div className="text-white flex flex-col md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">Experience:</h5>
              <p> {experience} years</p>
            </div>
            <div className="text-white flex flex-col md:gap-x-2">
              <h5 className="text-white font-semibold text-lg ">
                Qualifications:
              </h5>
              <p> {qualifications}</p>
            </div>
            <div className="text-white flex flex-col md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">
                Specialization:
              </h5>
              <p> {specialization}</p>
            </div>
            <div className="text-white flex gap-x-4 mt-4">
              <div className="flex items-center gap-x-3 mx-auto">
                {facebook_link && (
                  <Link
                    href={facebook_link}
                    aria-label="Facebook"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* Facebook SVG Icon */}
                  </Link>
                )}
                {twitter_link && (
                  <Link
                    href={twitter_link}
                    aria-label="Twitter"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* Twitter SVG Icon */}
                  </Link>
                )}
                {linkedin_link && (
                  <Link
                    href={linkedin_link}
                    aria-label="LinkedIn"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* LinkedIn SVG Icon */}
                  </Link>
                )}
                {instagram_link && (
                  <Link
                    href={instagram_link}
                    aria-label="Instagram"
                    className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {/* Instagram SVG Icon */}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCom;
