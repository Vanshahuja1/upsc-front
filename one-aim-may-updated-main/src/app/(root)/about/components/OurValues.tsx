import { CommonHeading2 } from "@/components/common/CommonHeading2";
import Image from "next/image";
import React from "react";

const OurValue = [
  {
    title: "Integrity",
    desc: "We believe in honesty, transparency, and ethical practices in everything we do.",
    img: "/images/about/m-1.png",
  },
  {
    title: "Growth",
    desc: "We are committed to continuous learning and improvement, both for ourselves and for our students.",
    img: "/images/about/m-2.png",
  },
  {
    title: "Community",
    desc: "We foster a supportive and inclusive environment where everyone can thrive.",
    img: "/images/about/m-3.png",
  },
  {
    title: "Impact",
    desc: "We strive to create meaningful, lasting change in the lives of those we serve.",
    img: "/images/about/m-4.png",
  },
];

const OurValues = () => {
  return (
    <section className="bg-[#FFF5EE] relative ">
      <div className="h-5 w-5 rounded-full absolute top-1/2 left-10 bg-[#5D8AA8]/30"></div>
      <div className="h-5 w-5 rounded-full absolute top-[10%] left-[40%] bg-[#741316]/30"></div>
      <div className="h-5 w-5 rounded-full absolute top-[92%] left-1/2 bg-[#FFC107]/30"></div>
      <div className="h-5 w-5 rounded-full absolute top-[80%] left-[80%] bg-[#229D88]/30"></div>
      <div className="h-5 w-5 rounded-full absolute top-[30%] left-[90%] bg-[#5D8AA8]/30"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0  right-0">
        <Image
          src={"/images/about/v1.png"}
          alt="v1"
          width={1200}
          height={120}
          className="w-full h-full"
        />
      </div>
      <div className="bg-[#FFEDDD] w-[85%]  mx-auto rounded-[100%] h-16 absolute  left-1/2 -translate-x-1/2 -top-4"></div>
      <div className="bg-[#FFEDDD] rounded-t-[4rem] rounded-b-[4rem] md:rounded-t-[10rem] md:rounded-b-[10rem]">
        <div className="screen  padding-yx">
          <div className="mx-auto w-max">
            <CommonHeading2 title="Our Values" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 mdl:grid-cols-4 gap-y-5 gap-x-12">
            {OurValue.map((data) => (
              <Card title={data.title} desc={data.desc} img={data.img} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#FFEDDD] w-[85%] mx-auto rounded-[100%] h-12 absolute  left-1/2 -translate-x-1/2  -bottom-2"></div>
    </section>
  );
};

export default OurValues;

const Card = ({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: any;
}) => {
  return (
    <div
      className="relative hover:scale-105 duration-500 transition-all bg-white  py-16 sm:py-20 px-5 sm:px-10 rounded-2xl space-y-3 
                before:content-[''] before:absolute before:top-1/2 before:-left-2 sm:before:-left-4 before:-translate-y-1/2 before:w-[20px] sm:before:w-[40px] before:rounded-[50%] before:h-[95%] before:bg-white 
                after:content-[''] after:absolute after:top-1/2 after:-right-2 sm:after:-right-4 after:-translate-y-1/2 after:w-[20px] sm:after:w-[40px] after:rounded-[50%] after:h-[95%] after:bg-white "
    >
      <div className="h-16 w-16 rounded-full p-5 bg-[#F5F5F5]">
        <Image
          src={img}
          alt="image"
          width={320}
          height={120}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
        <p className="w-full ">{desc}</p>
      </div>
    </div>
  );
};
