"use client";
import { Course, TestSeries } from "@/types";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedCard from "./ui/FeaturedCard";
import { FaChevronRight } from "react-icons/fa";
import { notFound } from "next/navigation";

export const TestSeriesShow = ({ data }: { data: TestSeries[] }) => {
  console.log(data);
  return (
    <div className="relative px-12 max-sm:px-7">
      <button
        className="custom-content-prev-button group absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-primaryred group-hover:text-white" />
      </button>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-content-next-button",
          prevEl: ".custom-content-prev-button",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
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
            slidesPerView: 3,
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
        }}
        style={{
          padding: "0px 10px 50px 10px",
        }}
      >
        {data.map((course) => (
          <SwiperSlide key={course.slug}>
            <FeaturedCard
              type="test-series"
              heading={course.heading}
              slug={course.slug}
              faculties={course.faculties?.map((data) => data)}
              href={course.slug}
              duration={course.duration}
              featured_image_url={
                course.featured_image_url ?? "/images/placeholder.png"
              }
              short_description={course.short_description}
              video_lectures={course.video_lectures}
              questions_count={course.questions_count}
              price={course.price}
              testSeries
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination flex justify-center mt-5"></div>
      <button
        className="custom-content-next-button group absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-primaryred group-hover:text-white" />
      </button>
    </div>
  );
};
