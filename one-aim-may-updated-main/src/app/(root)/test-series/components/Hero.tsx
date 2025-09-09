import { CommonHeading2 } from "@/components/common/CommonHeading2";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row padding-yx screen">
        <div className="w-full md:w-1/2">
          <div>
            <Image
              src={"/images/test-series/test-series.png"}
              alt="test-series.png"
              width={1010}
              height={210}
            />
          </div>
        </div>
        <div className="flex-[1.3]  my-auto">
          <CommonHeading2 title="Crack UPSC Smarters" />
          <div className="space-y-3">
            <hgroup className="space-y-1">
              <h3 className="text-2xl font-medium">
                Real Exam Experience & Expert Evaluation{" "}
              </h3>
              <p>
                Our UPSC Test Series provides a real exam-like environment with
                high-quality questions, in-depth explanations, and expert
                evaluation to enhance your preparation.
              </p>
            </hgroup>
            <hgroup className="space-y-1">
              <h3 className="text-2xl font-medium">
                Comprehensive Coverage & Performance Tracking:
              </h3>
              <p>
                Our UPSC Test Series provides a real exam-like environment with
                high-quality questions, in-depth explanations, and expert
                evaluation to enhance your preparation.
              </p>
            </hgroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
