"use client";
import React, { useEffect, useRef, useState } from "react";
import TeamCard from "./ui/TeamCard";
import Button from "./ui/Button";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { CommonHeading2 } from "./common/CommonHeading2";
import Link from "next/link";
import axios from "axios";
import { Faculty } from "@/types";
import { fetchData } from "@/utils/apiUtils";

const Team = () => {
  // Change const to let to allow assignment
  let teamMemberList: Faculty[] | null = null;
  const [teamMember, setTeamMember] = useState<Faculty[]>();

  useEffect(() => {
    const facultyDetail = async () => {
      const resp = await fetchData<Faculty[]>("/faculties");
      setTeamMember(resp);
    };
    facultyDetail();
  }, []);
  
  return teamMember?.length! > 0 ? (
    <>
      <section className="bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] padding-yx">
        <div className="screen ">
          <div className="w-max mx-auto">
            <CommonHeading2 title="Meet Our Team" />
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
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              style={{
                padding: "0px 10px 50px 10px",
              }}
            >
              {teamMember?.map((faculty) => (
                <SwiperSlide key={faculty.slug}>
                  <div className="transform transition-transform hover:scale-[1.02] duration-300">
                    <TeamCard
                      name={faculty.name}
                      designation={faculty.designation || ""}
                      experience={faculty.experience || ""}
                      qualification={faculty.qualifications || ""}
                      specialization={faculty.designation || ""}
                      description={faculty.short_description || ""}
                      image={faculty.featured_image_url || ""}
                      facultSlug={faculty.slug}
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
        <div className="w-max mx-auto mt-5">
          <Link href="/faculty" passHref>
            <Button className="text-white mt-8">
              View All 
            </Button>
          </Link>
        </div>
      </section>
    </>
  ) : (
    <></>
  );
};

export default Team;
