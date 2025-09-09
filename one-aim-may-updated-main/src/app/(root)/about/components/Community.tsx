"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CommonHeading2 } from "@/components/common/CommonHeading2";

const Community = () => {
  const circleRef = useRef(null);
  const centerImageRef = useRef(null);

  useEffect(() => {
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(centerImageRef.current, {
      rotation: -360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <section className="bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE]">
      <div className="screen padding-yx">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10  items-center justify-center">
          {/* Left Container  */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div
              ref={circleRef}
              className="relative aspect-square w-full max-w-[400px] md:max-w-[500px] lg:max-w-[450px] flex items-center justify-center"
            >
              {/* Outer images - hidden on mobile */}
              <div>
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 sm:w-[80px] sm:h-[80px] z-20 w-[50px] h-[50px]">
                  <Image
                    src="/images/about/image-2.png"
                    alt="image-2"
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-[80px] sm:h-[80px] z-20 w-[50px] h-[50px]">
                  <Image
                    src="/images/about/image-3.png"
                    alt="image-3"
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 sm:w-[80px] sm:h-[80px] z-20 w-[50px] h-[50px]">
                  <Image
                    src="/images/about/image-1.png"
                    alt="image-4"
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>
              {/* Circle border */}
              <div className="absolute inset-0 rounded-full border-2 border-[#DC8940]" />
              {/* Center image - always visible */}
              <div
                ref={centerImageRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] md:w-[120px] md:h-[120px] lg:w-[130px] lg:h-[130px]"
              >
                <Image
                  src="/images/image.png"
                  alt="center-image"
                  width={130}
                  height={130}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          {/* Right Container  */}
          <div className="w-full lg:w-1/2">
            <CommonHeading2 title="Our Community" className="!mb-2" />
            <div className="space-y-3">
              <hgroup className="space-y-3">
                <h5 className="font-medium text-lg max-sm:text-base">
                  At One Aim - we're more than just an organization – we're a
                  community. When you join us, you become part of a network of
                  like-
                </h5>
                <p className="font-medium text-lg max-sm:text-base">
                  Minded individuals who are committed to growth, learning, and
                  making a difference. Together, we can achieve more than we
                  ever could alone.
                </p>
              </hgroup>
              <Link
                href={"/contact-us"}
                className="bg-black inline-block text-white px-5 py-2 rounded-full w-max hover:bg-primaryred duration-200"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
