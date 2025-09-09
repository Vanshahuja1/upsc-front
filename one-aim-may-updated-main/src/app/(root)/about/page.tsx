import Banner from "@/components/common/Banner";
import React from "react";
import OurStory from "./components/OurStory";
import OurValues from "./components/OurValues";
import Team from "@/components/Team";
import WhatWeOffer from "./components/WhatWeOffer";
import Community from "./components/Community";
import Testimonials from "@/components/Testimonials";

import Link from "next/link";

const AboutUs = () => {
  return (
    <main className="w-full bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] overflow-x-clip">
      <Banner title="About Us" desp="Empowering Lives, One Step at a Time">
        <Link href="/">Home</Link>
        <span>{">"}</span>
        <span className="text-primaryred">About Us</span>
      </Banner>
      <OurStory />
      <OurValues />
      <WhatWeOffer />
      <Team />
      <Community />
      <Testimonials />
    </main>
  );
};

export default AboutUs;
