import { CommonHeading2 } from "@/components/common/CommonHeading2";

import Image from "next/image";
import React from "react";

const OurStory = () => {
  return (
    <section className=" bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE]">
      <div className="screen padding-yx">
        <div className="flex max-sm:flex-col max-sm:gap-y-6 gap-x-5">
          {/* Image Container  */}
          <div className="w-full md:w-1/2">
            <div className="w-[90%] mx-auto">
              <Image
                src={"/images/about/about-hero.png"}
                width={5400}
                height={1200}
                alt="about-image"
                className=" w-full h-full mx-auto object-cover"
              />
            </div>
          </div>

          {/* Information Container  */}
          <div className="w-full md:w-1/2 flex flex-col gap-y-6 justify-center">
            <CommonHeading2
              title="Our Story"
              desc="Founded in [Year], One Aim began with a simple yet powerful vision: to create a global community where individuals can learn, grow, and achieve their goals.
What started as a small initiative has now grown into a movement that impacts thousands of lives across the globe."
            />
            <div>
              <h6 className="text-xl font-semibold">
                Our journey is fueled by:
              </h6>
              <div className="space-y-4 mt-3">
                <div className="flex items-center gap-x-4">
                  <div className="h-12 w-12 bg-white p-2 rounded-full">
                    <Image
                      src={"/images/about/open-book.svg"}
                      alt="open-book"
                      width={210}
                      height={210}
                    />
                  </div>
                  <p>A passion for education and lifelong learning.</p>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="h-12 w-12 bg-white p-2 rounded-full">
                    <Image
                      src={"/images/about/handshake.svg"}
                      alt="handshake"
                      width={210}
                      height={210}
                    />
                  </div>
                  <p>A passion for education and lifelong learning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
