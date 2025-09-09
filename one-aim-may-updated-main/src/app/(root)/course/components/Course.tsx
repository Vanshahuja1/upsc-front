"use client";
import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from "axios";
import { CourseCategoryList } from "@/types";
import { CommonHeading2 } from "@/components/common/CommonHeading2";
import FeaturedCard from "@/components/ui/FeaturedCard";
import { fetchData } from "@/utils/apiUtils";

interface CourseCategory {
  id: string;
  label: string;
}

interface SubCourse {
  id: string;
  label: string;
}

interface CourseContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  imageSrc: string;
}

const Course: React.FC = () => {
  let [courseCategoryList, setCourseCategoryList] =
    useState<CourseCategoryList>();
  const [activeCourseCategorySlug, setActiveCourseCategorySlug] =
    useState<string>("");
  const [activeSubCategorySlug, setActiveSubCategorySlug] =
    useState<string>("");

  useEffect(() => {
    const courseDetail = async () => {
      const response = await fetchData<CourseCategoryList>(
        `/course-categories`
      );
      setCourseCategoryList(response);
      if (response && response.length > 0) {
        setActiveCourseCategorySlug(response[0].slug);
        if (response[0].children.length > 0) {
          setActiveSubCategorySlug(response[0].children[0].slug);
        }
      }
    };
    courseDetail();
  }, []);

  const handleMainCategoryClick = (slug: string) => {
    setActiveCourseCategorySlug(slug);
    const selectedCategory = courseCategoryList?.find(
      (cat) => cat.slug === slug
    );
    if (selectedCategory && selectedCategory.children.length > 0) {
      setActiveSubCategorySlug(selectedCategory.children[0].slug);
    } else {
      setActiveSubCategorySlug("");
    }
  };

  const handleSubCategoryClick = (slug: string) => {
    setActiveSubCategorySlug(slug);
  };

  const activeMainCategory = courseCategoryList?.find(
    (cat) => cat.slug === activeCourseCategorySlug
  );
  const activeSubCategory = activeMainCategory?.children.find(
    (subCat) => subCat.slug === activeSubCategorySlug
  );
  const currentCourseContent = activeSubCategory?.courses || [];

  return courseCategoryList?.length! > 0 ? (
    <section id="course" className="bg-[#FFF4D5]/40 ">
      <div className="screen padding-yx">
        <div>
          <CommonHeading2 title="Our Courses" />
          <div className="space-y-12">
            {/* Main Categories Swiper */}
            <div className="relative  max-sm:px-7">
              <button
                className="custom-main-prev-button group absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-primaryred group-hover:text-white" />
              </button>
              <Swiper
                modules={[Navigation]}
                slidesPerView="auto"
                spaceBetween={20}
                centeredSlides={false}
                navigation={{
                  nextEl: ".custom-main-next-button",
                  prevEl: ".custom-main-prev-button",
                }}
                className="px-5 md:px-10"
              >
                {courseCategoryList?.map((item) => (
                  <SwiperSlide
                    key={item.slug}
                    className="!w-auto"
                    onClick={() => handleMainCategoryClick(item.slug)}
                  >
                    <div className="cursor-pointer pr-4 py-2 text-sm md:text-base transition-all duration-300 whitespace-nowrap">
                      {item.name}
                      <div
                        className={`mt-1 mx-auto h-[3px] bg-gradient-to-tr from-[#FFA4A8] to-[#FFC593] rounded-full transition-all duration-300 ${
                          item.slug === activeCourseCategorySlug
                            ? "w-[80%]"
                            : "w-0"
                        }`}
                      ></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                className="custom-main-next-button group absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-primaryred group-hover:text-white" />
              </button>
            </div>

            {/* Sub Categories Swiper - Moved to a separate section */}
            {activeMainCategory?.children &&
              activeMainCategory.children.length > 0 && (
                <div className="relative max-sm:px-7 pl-14">
                  <button
                    className="custom-sub-category-prev-button group absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft className="text-primaryred group-hover:text-white" />
                  </button>
                  <Swiper
                    modules={[Navigation]}
                    slidesPerView="auto"
                    spaceBetween={10}
                    navigation={{
                      nextEl: ".custom-sub-category-next-button",
                      prevEl: ".custom-sub-category-prev-button",
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                    }}
                    className="px-5 md:px-10"
                  >
                    {activeMainCategory.children.map((subItem) => (
                      <SwiperSlide
                        key={subItem.slug}
                        className="!w-auto"
                        onClick={() => handleSubCategoryClick(subItem.slug)}
                      >
                        <div
                          className={`cursor-pointer px-5 py-2 rounded-lg text-sm transition-all duration-200 text-black ${
                            subItem.slug === activeSubCategorySlug
                              ? "bg-gradient-to-tr from-[#FFA4A8] to-[#FFC593] text-black shadow-md"
                              : "bg-[#FEE8D5] hover:bg-[#FEE8D5]/20"
                          }`}
                        >
                          {subItem.name}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button
                    className="custom-sub-category-next-button group absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-primaryred hover:text-white transition-colors duration-300"
                    aria-label="Next slide"
                  >
                    <FaChevronRight className="text-primaryred group-hover:text-white" />
                  </button>
                </div>
              )}

            <div className="relative px-12 max-sm:px-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {currentCourseContent.length > 0 ? (
                  currentCourseContent.map((course) => (
                    <div key={course.slug}>
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
                  ))
                ) : (
                  <div className="text-center py-12 h-64 flex flex-col items-center justify-center bg-gray-50 rounded-2xl">
                    <p className="text-gray-500">
                      No courses available in this category yet.
                    </p>
                    <button className="mt-4 bg-[#c1151b] text-white px-6 py-2 rounded-full hover:bg-[#a61016] transition-colors">
                      Request This Course
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styling for pagination bullets */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 4px;
        }
        .swiper-pagination-bullet-active {
          background: #dc8940;
          width: 10px;
          height: 10px;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  ) : (
    <></>
  );
};

export default Course;
