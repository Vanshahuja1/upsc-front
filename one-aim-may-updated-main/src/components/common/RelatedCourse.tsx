"use client";
import React from "react";
import { CommonHeading2 } from "./CommonHeading2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import FeaturedCard from "../ui/FeaturedCard";
import { Course } from "@/types";

interface RelatedCourseProps {
  courses: Course[];
}

const RelatedCourse: React.FC<RelatedCourseProps> = ({ courses }) => {
  return (
    <div className="relative screen padding-bx">
      <div className="mx-auto w-max">
        <CommonHeading2 title="Related Courses" />
      </div>
      {/* Course Content Cards Swiper */}
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
          {courses.length > 0 ? (
            courses.map((course, id) => (
              <SwiperSlide key={id}>
                <FeaturedCard
                  type="course"
                  heading={course.heading}
                  slug={course.slug}
                  href={course.slug}
                  duration={course.duration}
                  faculties={course.faculties}
                  featured_image_url={course.featured_image_url}
                  short_description={course.short_description}
                  video_lectures={course.video_lectures}
                  questions_count={course.questions_count}
                  price={course.price}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center py-12 h-64 flex flex-col items-center justify-center bg-gray-50 rounded-2xl">
                <p className="text-gray-500">
                  No courses available in this category yet.
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className="swiper-pagination flex justify-center mt-5"></div>
        <button
          className="custom-content-next-button group absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
          aria-label="Next slide"
        >
          <FaChevronRight className="text-primaryred group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default RelatedCourse;
