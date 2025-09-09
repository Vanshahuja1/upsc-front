"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Button from "./ui/Button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CommonHeading2 } from "./common/CommonHeading2";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (
        !imageRef.current ||
        !contentRef.current ||
        !statsRef.current ||
        !decorRef.current ||
        !containerRef.current
      )
        return;

      // Initial state
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set(statsRef.current.children, {
        scale: 0,
        opacity: 0,
      });

      gsap.set(decorRef.current.children, {
        opacity: 0,
        rotate: -45,
      });

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.5"
        )
        .to(
          statsRef.current.children,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "<"
        )
        .to(
          decorRef.current.children,
          {
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] "
    >
      <div className="screen padding-yx ">
        <div className="relative" ref={containerRef}>
          {/* Container  */}
          <div className="screen flex flex-col md:flex-row items-center gap-8 md:gap-4">
            {/* Left Container  */}
            <div className="flex-1" ref={imageRef}>
              <div className="relative h-full w-full md:w-[90%] mx-auto">
                <Image
                  src={"/images/about/about-image-2.png"}
                  alt="about-image"
                  width={1850}
                  height={250}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute max-sm:-top-9 top-0 left-1/2 -translate-x-1/2 h-20 w-20 md:h-28 md:w-28 border border-yellow-400 bg-white flex flex-col items-center justify-center rounded-full shadow-md">
                  <p className="text-[#FFBF00] font-bold text-xl md:text-2xl">
                    50K+
                  </p>
                  <p className="text-xs md:text-sm">Users</p>
                </div>
              </div>
            </div>
            {/* Right Container  */}
            <div className="w-full md:flex-1 relative">
              <div ref={contentRef}>
                <hgroup>
                  <CommonHeading2
                    title="Who we are"
                    desc="Welcome to One Aim Academy, where your success is our mission. Our expert instructors and comprehensive courses are designed to help you reach your academic and professional goals."
                  />
                </hgroup>
                <div className="mt-5 md:mt-7">
                  <Button
                    href="/about"
                    className="text-sm md:text-base text-white"
                  >
                    Know More
                  </Button>
                </div>
              </div>
              <div ref={statsRef} className="relative h-20 md:h-auto">
                <div className="absolute max-sm:-top-[26rem] -top-[26rem] shadow-front-colored right-[5%] h-20 w-20 md:h-28 md:w-28 border border-[#DA232A] bg-white flex flex-col items-center justify-center rounded-full shadow-md">
                  <p className="text-[#DA232A]  font-bold text-xl md:text-2xl">
                    100K+
                  </p>
                  <p className="text-xs md:text-sm">Users</p>
                </div>
                <div className="absolute max-sm:left-40 left-60  max-sm:-top-[2rem] -top-[3rem] shadow-front-colored  h-20 w-20 md:h-28 md:w-28 border border-[#FF7B07] bg-white flex flex-col items-center justify-center rounded-full shadow-md">
                  <p className="text-[#FF7B07] font-bold text-xl md:text-2xl">
                    50K+
                  </p>
                  <p className="text-xs md:text-sm">Users</p>
                </div>
              </div>
            </div>
          </div>
          <div ref={decorRef} className="hidden sm:block">
            <div className="absolute -left-6 top-1/4 hidden md:block">
              <Image
                src={"/images/icons/book.png"}
                alt="Book decoration"
                width={120}
                height={120}
                className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
              />
            </div>
            <div className="absolute -right-6 md:-right-12 bottom-[30%] hidden md:block">
              <Image
                src={"/images/icons/Pencil.png"}
                alt="Pencil decoration"
                width={150}
                height={120}
                className="w-20 h-16 md:w-28 md:h-24 lg:w-36 lg:h-28"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
