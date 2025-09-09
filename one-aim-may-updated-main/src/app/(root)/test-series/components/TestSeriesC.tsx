"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { CommonHeading2 } from "@/components/common/CommonHeading2";

const testSeriesData = [
  {
    id: 1,
    title: "Exam-oriented questions",
    icon: "/images/test-series/exam.png",
  },
  {
    id: 2,
    title: "Full-length & topic-wise practice",
    icon: "/images/test-series/brain.png",
  },
  {
    id: 3,
    title: "Track strengths & weaknesses",
    icon: "/images/test-series/track.png",
  },
  {
    id: 4,
    title: "Model answers for better learning",
    icon: "/images/test-series/conversations.png",
  },
  {
    id: 5,
    title: "Compete nationwide",
    icon: "/images/test-series/refresh.png",
  },
  {
    id: 6,
    title: "Compete nationwide",
    icon: "/images/test-series/refresh.png",
  },
];

const TestSeriesC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="screen padding-x">
      <div className="w-max mx-auto ">
        <CommonHeading2 title=" Why Join Our UPSC Test Series?" />
      </div>
      <div className="relative  ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={20}
          slidesPerView={3}
          grabCursor={true}
          centeredSlides={true}
          watchSlidesProgress={true}
          onSlideChange={handleSlideChange}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            type: "bullets",
          }}
          navigation={{
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            991: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="!pb-20"
        >
          {testSeriesData.map((data, index) => (
            <SwiperSlide
              key={data.id}
              className={`${data.id % 2 === 0 ? "mt-0" : "mt-16"}`}
            >
              <TestSeriesCard data={data} isActive={index === activeIndex} />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default TestSeriesC;

const TestSeriesCard = ({
  data,
  isActive,
}: {
  data: any;
  isActive: boolean;
}) => {
  return (
    <div
      className={`h-72 rounded-[2rem] overflow-hidden transition-all duration-300 ${
        isActive ? "scale-105" : "scale-95 opacity-90"
      }`}
    >
      <div
        className={`${
          isActive ? "bg-white" : "bg-[#FFDBBB]"
        }  h-1/2 flex-center`}
      >
        <div className="h-12 w-12">
          <Image
            src={data.icon}
            alt="exam"
            height={210}
            width={210}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div
        className={`${
          isActive ? "bg-lightorange" : "bg-white"
        } h-1/2 flex items-center relative transition-all duration-300`}
      >
        <div
          className={`w-full h-7  rounded-[62%] absolute -top-3 ${
            isActive ? "bg-white" : "bg-[#FFDBBB]"
          }`}
        ></div>
        <p
          className={` text-xl font-semibold pl-5 text-center w-full  ${
            isActive ? "text-white" : "text-orange"
          }`}
        >
          {data.title}
        </p>
      </div>
    </div>
  );
};
