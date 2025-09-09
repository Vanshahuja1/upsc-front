"use client";

import CommonHeading from "@/components/ui/CommonHeading";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CommonHeading2 } from "@/components/common/CommonHeading2";

// Card Data
const offerings = [
  {
    title: "IAS Preparation",
    description: "Prepare for the UPSC exams with comprehensive ",
    image: "/images/about/we-offer.png",
    bgImage: "/images/bg/about-bg.png",
    bgColor: "bg-white",
    textColor: "text-white",
  },
  {
    title: "IAS Preparation",
    description: "Prepare for the UPSC exams with comprehensive ",
    image: "/images/about/we-offer.png",
    bgImage: "/images/bg/about-bg-2.png",
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    title: "IAS Preparation",
    description: "Prepare for the UPSC exams with comprehensive ",
    image: "/images/about/we-offer.png",
    bgImage: "/images/bg/about-bg.png",
    bgColor: "bg-white",
    textColor: "text-white",
  },
  {
    title: "IAS Preparation",
    description: "Prepare for the UPSC exams with comprehensive ",
    image: "/images/about/we-offer.png",
    bgImage: "/images/bg/about-bg-2.png",
    bgColor: "bg-white",
    textColor: "text-black",
  },
];

const WhatWeOffer = () => {
  return (
    <section className="bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] padding-yx relative">
      <div className="screen">
        <div className="w-max mx-auto">
          <CommonHeading2 title="What We Offer" />
        </div>
        <div className="relative px-12 max-sm:px-0 ">
          {/* Custom navigation buttons */}
          <button
            className="custom-prev-button group absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-primaryred group-hover:text-white" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            spaceBetween={20}
            slidesPerView={3}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
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
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="!py-10 !pt-5 !pl-5 !pr-5"
          >
            {offerings.map((member) => (
              <SwiperSlide key={member.title}>
                <div className="transform transition-transform hover:scale-[1.02] duration-300">
                  <WhatWeOfferCard
                    bgImage={member.bgImage}
                    title={member.title}
                    description={member.description}
                    image={member.image}
                    bgColor={
                      member.title === "Personal Development"
                        ? "bg-[#DC8940]"
                        : "bg-[#ffffff]"
                    }
                    textColor={member.textColor}
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
          {/* Next Button  */}
          <button
            className="custom-next-button group absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-primaryred group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;

interface WhatWeOfferCardProps {
  title: string;
  description: string;
  image: string;
  bgColor?: string;
  textColor?: string;
  bgImage?: string;
}
// Card Component
const WhatWeOfferCard: React.FC<WhatWeOfferCardProps> = ({
  title,
  description,
  image,
  bgColor,
  textColor,
  bgImage,
}) => {
  return (
    <div>
      <div
        className={`relative flex flex-col items-center justify-center  h-[50vh] lg:h-[60vh] overflow-x-hidden   rounded-lg `}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h4
          className={`text-xl font-semibold text-center ${
            textColor || "text-white"
          }`}
        >
          {title}
        </h4>
        <div className="my-4">
          <Image
            src={image}
            width={200}
            height={200}
            alt={title}
            className=""
          />
        </div>
        <p
          className={`text-center text-sm w-[20ch] md:w-[28ch] lg:w-[28ch] xl:text-md 2xl:text-lg ${
            textColor || "text-white"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
