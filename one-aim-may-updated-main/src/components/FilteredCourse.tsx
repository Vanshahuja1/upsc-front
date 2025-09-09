"use client";
import React, { useState, useEffect } from "react";
import FilteredCard from "./ui/FilteredCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CommonHeading2 } from "./common/CommonHeading2";
import { fetchData } from "@/utils/apiUtils";
import { TestSeries } from "@/types";

const FilteredCourse = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [testSeries, setTestSeries] = useState<TestSeries[] | null>(null);

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Fetch data on mount
    const fetchTestSeriesData = async () => {
      const resp = await fetchData<TestSeries[]>("/test-series");
      setTestSeries(resp || null);
    };

    fetchTestSeriesData();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const curveHeight = Math.min(120, dimensions.width * 0.08);

  return testSeries?.length! > 0 ? (
    <div className="bg-gradient-to-b relative">
      <div className="bg-[#FFE4CD] w-[85%] mx-auto rounded-[100%] h-16 absolute left-1/2 -translate-x-1/2 -top-4"></div>

      <section className="bg-[#FFE4CD] padding-x max-sm:pt-[70px] py-[100px] relative rounded-b-[12rem] max-sm:rounded-b-[2rem] rounded-t-[12rem] max-sm:rounded-t-[2rem]">
        <div className="screen padding-x">
          <div className="w-max mx-auto">
            <CommonHeading2 title="Test Series" />
          </div>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              className="custom-prev-button group absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-[#DC8940] hover:text-white transition-colors duration-300"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-[#DC8940] group-hover:text-white" />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Mousewheel, FreeMode]}
              spaceBetween={20}
              slidesPerView={3}
              freeMode
              grabCursor
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
              className="pb-12"
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
            >
              {testSeries?.map((data, index) => (
                <SwiperSlide key={index}>
                  <FilteredCard
                    title={data.heading}
                    subHeading={data.sub_heading}
                    slug={data.slug}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="custom-next-button group absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full shadow-lg flex items-center justify-center hover:bg-[#DC8940] hover:text-white transition-colors duration-300"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-[#DC8940] group-hover:text-white" />
            </button>
          </div>

          <div className="bg-[#FFF4EC] w-[85%] mx-auto rounded-[100%] h-16 absolute left-1/2 -translate-x-1/2 -bottom-12"></div>
        </div>
      </section>
    </div>
  ) : (
    <></>
  );
};

export default FilteredCourse;
