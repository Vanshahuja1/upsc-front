import Banner from "@/components/common/Banner";
import Link from "next/link";
import React from "react";
import DemoClass from "./components/DemoClass";
import Testimonials from "@/components/Testimonials";

import Course from "./components/Course";
import { FAQ } from "@/components/common/FAQ";

const Courses = () => {
  return (
    <section>
      <Banner
        title="Courses"
        desp="Master Your UPSC Preparation with Expert-Led Courses"
      >
        <Link href="/">Home</Link>
        <span>{">"}</span>
        <span className="text-primaryred">Courses</span>
      </Banner>
      <Course />

      <Testimonials />
      <FAQ className="padding-yx" />
    </section>
  );
};

export default Courses;
