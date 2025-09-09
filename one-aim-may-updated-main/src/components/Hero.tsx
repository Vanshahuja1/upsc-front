"use client";
import Image from "next/image";
import React from "react";
import MagneticButton from "./ui/MagnaticButton";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE]  relative"
    >
      <div className="screen padding-x">
        <div className="max-sm:h-[42px] w-full absolute bottom-0 left-0">
          <Image
            src={"/images/hero/hero-style.png"}
            alt=""
            height={1200}
            width={1200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className=" relative pt-[100px] pb-[200px] max-sm:pt-[50px] max-sm:pb-[100px] screen">
          {/* Background decorative elements */}
          <div className="hero-bg-element absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#FFC107]/10 blur-3xl"></div>
          <div className="hero-bg-element absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#DA232A]/10 blur-3xl"></div>

          <section className="h-full  w-full  relative z-10">
            <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-auto max-sm:gap-10 items-center h-full ">
              <div className="w-full  max-sm:space-y-5 ">
                <div className="flex flex-wrap items-center gap-x-3 text-xl max-sm:text-lg font-semibold uppercase">
                  <h3>Welcome to</h3>
                  <div className="arrow-container border border-primaryred w-28 max-sm:w-[8rem] h-8 rounded-full flex items-center justify-center">
                    <Image
                      src={"/images/icons/arrow.svg"}
                      alt="arrow"
                      width={72}
                      height={72}
                    />
                  </div>{" "}
                  <h3>{"One Aim"}</h3>
                </div>

                <hgroup className="space-y-7 pb-11 pt-5 max-sm:pb-7 max-sm:pt-3">
                  <div className="text-primaryred heroHeading overflow-hidden">
                    <h1>Achieve Your Dreams</h1>
                    <h1>With One Aim</h1>
                  </div>
                  <p className="text-xl max-sm:text-lg max-w-[52ch] font-medium">
                    Transform your future with our expert-led courses. Join
                    thousands of successful students who have achieved their
                    goals with One Aim.
                  </p>
                </hgroup>

                {/* Button Container  */}
                <div className="space-x-5 flex items-center ">
                  <div className="w-max">
                    <MagneticButton
                      href="/course"
                      backgroundColor="#333333"
                      className="bg-primaryred  sm:text-sm   text-white font-semibold"
                    >
                      Explore Courses
                    </MagneticButton>
                  </div>
                  <div className="w-max">
                    <Button
                      href="/contact-us"
                      className="bg-transparent  !hover:text-primaryred ring-[1px] ring-black font-medium hover:ring-primaryred hover:bg-transparent hover:text-primaryred"
                    >
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full max-sm:pt-0">
                <div className="relative h-full w-full">
                  <div className="absolute h-full w-full -translate-x-1/2 left-[60%] top-[60%] -translate-y-1/2 animate-spin-slow max-sm:left-1/2 max-sm:top-1/2">
                    <Image
                      src={"/images/icons/line.svg"}
                      width={740}
                      height={840}
                      alt="hero-image"
                      className="w-[80%] h-[80%] max-sm:w-[70%] max-sm:h-[70%]"
                    />
                  </div>
                  <div className="h-[90%] w-[90%] mx-auto relative z-30 max-sm:h-auto max-sm:hidden max-sm:justify-center max-sm:items-center">
                    <Image
                      src={"/images/hero/hero-image.png"}
                      width={540}
                      height={240}
                      alt="hero-image"
                      className="w-full h-full max-sm:w-4/5 max-sm:h-auto max-sm:object-contain"
                      priority
                    />
                  </div>

                  {/* Animated highlights */}
                  <div className="absolute top-1/4 right-1/3 w-10 h-10 animate-pulse-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path
                        d="M50,2 L52,30 L70,12 L60,40 L85,30 L65,50 L95,60 L65,70 L85,90 L55,75 L60,98 L45,80 L35,98 L40,70 L10,85 L35,60 L2,50 L35,40 L15,20 L45,30 L35,2 Z"
                        fill="#FFC107"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile scroll indicator */}
          <a
            href="#about"
            className="hidden max-sm:block absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce z-40"
          >
            <div className="w-8 h-12 rounded-full border-2 border-primaryred flex items-center justify-center">
              <div className="w-1.5 h-3 bg-primaryred rounded-full animate-scroll-indicator"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
