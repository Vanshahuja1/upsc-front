"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CommonHeading from "./ui/CommonHeading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { CommonHeading2 } from "./common/CommonHeading2";

const Moto = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Initial state - images and content hidden
    gsap.set([leftImageRef.current, rightImageRef.current], {
      opacity: 0,
      x: isMobile ? 0 : (index) => (index === 0 ? -50 : 50),
      y: isMobile ? 50 : 0,
    });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });

    // Animation sequence
    tl.to([leftImageRef.current, rightImageRef.current], {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: isMobile ? 0.3 : 0.2,
    }).to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="bg-[#FFF4EC] padding-top relative ">
      <div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 lg:gap-8">
          {/* Left image */}
          <div
            ref={leftImageRef}
            className="w-full md:w-1/4  rounded-tr-[3rem] sm:rounded-tr-[4rem] md:rounded-tr-[6rem] lg:rounded-tr-[12rem] overflow-hidden"
          >
            <div className="relative h-[300px] md:h-full aspect-auto md:aspect-auto">
              <Image
                src={"/images/moto/vision.png"}
                alt="Our Values"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Center content */}
          <div
            ref={contentRef}
            className="w-full md:w-[45%] max-sm:px-2 h-full my-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-14 "
          >
            <div>
              <div className="mx-auto w-max">
                <CommonHeading2 title="Our Beliefs" />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-center w-full mx-auto">
                We believe in equal rights to education. We almost promote the
                idea of cohesiveness irrespective of which gender or caste a
                person belongs to.
              </p>
            </div>
            <div>
              <div className="mx-auto w-max">
                <CommonHeading2 title="Our Vision" />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-center w-full sm:max-w-[95%] md:max-w-[90%] mx-auto">
                We envision an India where there are no quotas and reservations
                in learning. One Aim is a step closer to what we want to build
                as a team.
              </p>
            </div>
          </div>

          {/* Right image */}
          <div
            ref={rightImageRef}
            className="w-full md:w-1/4 rounded-bl-[3rem] sm:rounded-bl-[4rem] md:rounded-bl-[6rem] lg:rounded-bl-[12rem] overflow-hidden"
          >
            <div className="relative h-[300px] md:h-full aspect-auto md:aspect-auto">
              <Image
                src={"/images/moto/vision-2.png"}
                alt="Our Vision"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Moto;
