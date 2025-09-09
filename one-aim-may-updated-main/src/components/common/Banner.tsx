import Image from "next/image";
import React from "react";

interface BannerProp {
  title: string;
  desp?: string;
  children?: React.ReactNode;
}

const Banner = ({ title, desp, children }: BannerProp) => {
  return (
    <section className=" bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFE5E5] h-[50vh] flex-center space-y-4 relative  ">
      <div className="absolute -bottom-20 right-0 left-0 w-full">
        <Image
          src={"/images/hero/hero-style.png"}
          alt="hero-style"
          width={1200}
          height={1200}
          className="w-full h-32"
        />
      </div>
      <hgroup className="space-y-5">
        <div className="heading text-primaryred relative w-max  mx-auto">
          <h2 className="relative z-20">{title}</h2>{" "}
          <Image
            src={"/images/icons/button-style.svg"}
            alt="style"
            width={140}
            height={120}
            className="absolute top-5 right-5"
          />
        </div>
        <p className="text-xl text-center max-sm:text-md font-semibold">
          {desp}
        </p>
      </hgroup>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">{children}</div>
    </section>
  );
};

export default Banner;
