import Image from "next/image";
import React from "react";

export const CommonHeading2 = ({
  title,
  desc,

  className,
}: {
  title: string;
  desc?: string;
  className?: string;
  content?: any;
}) => {
  return (
    <hgroup className="space-y-3">
      <div className="text-primaryred heading2 relative    w-max max-sm:w-full ">
        <span
          className={`relative text-center leading-7 z-10 w-full md:mb-10 mb-4 inline-block break-words whitespace-normal overflow-wrap-break-word ${className}`}
        >
          {title}
        </span>
        <div className="h-20 max-sm:hidden w-20 md:h-32 md:w-32 absolute top-1/2 -translate-y-1/2 -right-20 -translate-x-1/2">
          <Image
            src={"/images/icons/button-style.svg"}
            alt="style-1"
            width={120}
            height={120}
            className="h-full w-full"
          />
        </div>
      </div>
      {desc ?? <p className="text-lg w-[95%]">{desc}</p>}
    </hgroup>
  );
};
