import Image from "next/image";
import React from "react";
import { CgPlayButton } from "react-icons/cg";
import { CiClock2 } from "react-icons/ci";

const Video = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <div className="flex-1">
        <div className=" h-[60vh]">
          <div className="h-full w-full rounded-2xl overflow-hidden relative after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-black after:opacity-50 after:z-20">
            <Image
              src={"/images/course/course-bg.png"}
              alt="video"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
            <div className="bg-white h-20 w-20 rounded-full absolute top-0 z-30 flex-center absolute-center">
              <CgPlayButton className="h-full w-full text-[#FF7B07]" />
            </div>
          </div>
        </div>
        <div className="flex justify-between py-3">
          <p className="text-[#FF7B07]">Instructor Name</p>
          <div className="flex gap-x-2 items-center">
            <div className="h-5 w-5 text-[#FF7B07]">
              <CiClock2 className="h-full w-full" />
            </div>
            <p>45 min</p>
          </div>
        </div>
        <hgroup>
          <h2 className="text-md md:text-2xl font-medium">
            Foundation Course (Prelims + Mains)
          </h2>
          <h3 className="text-gray-700">
            {" "}
            Introduction to UPSC Exam Structure
          </h3>
        </hgroup>
      </div>
      <div className="flex-[0.4] space-y-5">
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
};

export default Video;

const VideoCard = () => {
  return (
    <div>
      {/* Video Card  */}
      <div className="flex gap-3 bg-white rounded-2xl overflow-hidden">
        <div className="flex-[0.34]">
          <div className="w-full h-28">
            <Image
              src={"/images/course/course-bg.png"}
              width={210}
              height={210}
              alt="image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* Video Info  */}
        <div className="flex-[0.5] my-auto">
          <h6>Introduction to UPSC & Exam Pattern (10 mins)</h6>
        </div>
      </div>
    </div>
  );
};
