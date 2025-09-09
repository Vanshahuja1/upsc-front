import React from "react";
import Video from "./ui/Video";
import { CommonHeading2 } from "@/components/common/CommonHeading2";

const DemoClass = () => {
  return (
    <section className="screen padding-yx ">
      <div className="mx-auto w-max">
        <CommonHeading2 title="Demo Class" />
      </div>
      <Video />
    </section>
  );
};

export default DemoClass;
