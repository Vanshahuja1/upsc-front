import About from "@/components/About";
import Blog from "@/components/Blog";
import { FAQ } from "@/components/common/FAQ";
import Course from "@/components/Course";
import FeaturedCourse from "@/components/common/FeaturedCourse";
import FilteredCourse from "@/components/FilteredCourse";

import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Moto from "@/components/Moto";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="overflow-x-clip relative">
      <Hero />
      <About />
      <Course />
      <WhyChooseUs />
      <FeaturedCourse />
      <Info />
      <Team />
      <FilteredCourse />
      <Moto />
      <Testimonials />
      <Blog />
      <FAQ className="padding-yx" />
    </main>
  );
}
