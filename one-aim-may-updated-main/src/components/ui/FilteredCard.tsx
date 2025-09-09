import Image from "next/image";
import React from "react";

const FilteredCard = ({
  title,
  subHeading,
  slug,
}: {
  title: string;
  subHeading: string;
  slug: string;
}) => {
  return (
    <div className="bg-white rounded-[4rem]">
      <div className="space-y-5 p-10">
        <div className="bg-[#FBD5B5]/20 h-16 w-16 p-3 rounded-full">
          <Image
            src={"/images/icons/exam.svg"}
            alt="exam-icon"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bg-[#FBD5B5]/20 space-y-6 py-14 px-7 rounded-[4rem]">
          <hgroup className="space-y-3">
            <h2 className="text-3xl font-medium">{title}</h2>
            <p className="text-lg">{subHeading}</p>
          </hgroup>
          <a
            className="text-[#FFC107] font-semibold flex items-center gap-x-2"
            href={`/test-series/${slug}`}
          >
            Read More{" "}
            <span>
              <Image
                src={"/images/icons/arrow-right-3.svg"}
                alt="arrow-right"
                width={24}
                height={24}
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilteredCard;
