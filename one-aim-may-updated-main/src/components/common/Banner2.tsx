import Image from "next/image";
import React from "react";

interface Banner2Prop {
  title: string;
  desp?: string;
  children?: React.ReactNode;
  className?: string;
  className2?: string;
}

const Banner2 = ({
  title,
  desp,
  children,
  className,
  className2,
}: Banner2Prop) => {
  return (
    <section
      className={` bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFE5E5] h-[30vh] flex-center space-y-4 relative ${className2}`}
    >
      <hgroup className="space-y-5">
        <h2 className="heading text-primaryred relative w-max  mx-auto">
          <span className={`relative z-20 ${className}`}>{title}</span>{" "}
          <Image
            src={"/images/icons/button-style.svg"}
            alt="style"
            width={140}
            height={120}
            className="absolute top-5 right-5"
          />
        </h2>
        <p className="text-xl text-center max-sm:text-md font-semibold">
          {desp}
        </p>
      </hgroup>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">{children}</div>
    </section>
  );
};

export default Banner2;
