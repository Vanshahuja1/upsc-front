"use client";
import React, { useEffect, useRef, useState } from "react";
import FeaturedCard from "../ui/FeaturedCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaClipboardList } from "react-icons/fa";
import Button from "../ui/Button";
import Link from "next/link";
import {
  VideoIcon,
  SubjectIcon,
  NewQuestion,
  MentorshipIcon,
  QuestionIcon,
} from "@/components/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  BiBook,
  BiFile,
  BiQuestionMark,
  BiUser,
  BiVideo,
} from "react-icons/bi";
import { CommonHeading2 } from "./CommonHeading2";

import { Course } from "@/types";
import { fetchData } from "@/utils/apiUtils";
import { toast } from "react-toastify";

const FeaturedCourse = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const swiperRef = useRef(null);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetchData<Course[]>("/courses");
      const filterCourse = response?.filter((course) => course.featured);
      setFeaturedCourses(filterCourse || []);
    };

    fetchCourses();
  }, []);

  return featuredCourses.length > 0 ? (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] relative"
    >
      <div className="w-[80%]"></div>
      <div className="bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] rounded-t-[12rem] max-md:rounded-t-[6rem] max-sm:rounded-t-[3rem] max-sm:pt-[60px] pt-[100px]">
        <div className="screen  max-sm:space-y-8 padding-x">
          <div className="w-max mx-auto" ref={headingRef}>
            <CommonHeading2 title="Featured Courses" />
          </div>

          <div className="relative px-12 max-sm:px-7 " ref={swiperRef}>
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
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              style={{
                padding: "0px 10px 50px 10px",
              }}
            >
              {featuredCourses.map((course, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full transform transition-transform hover:scale-[1.02] duration-300">
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

          {/* View all courses button */}
          <div className="h-full w-max mx-auto mt-5">
            <Link href="/course" passHref>
              <Button className="text-white mt-10">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default FeaturedCourse;
