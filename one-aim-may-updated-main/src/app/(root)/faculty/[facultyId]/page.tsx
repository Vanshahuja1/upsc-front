import Banner2 from "@/components/common/Banner2";
import FacultyCom from "@/components/common/FacultyCom";
import CourseShow from "@/components/CourseShow";
import Testimonials from "@/components/Testimonials";
import { TestSeriesShow } from "@/components/TestSeries";
import { TypeFacultyShow } from "@/types";
import { fetchData } from "@/utils/apiUtils";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const FacultyPage = async ({
  params,
}: {
  params: Promise<{ facultyId: string }>;
}) => {
  const { facultyId } = await params;

  let facultyData: TypeFacultyShow | null = null; // Variable to hold the found blog

  const resp = await fetchData<TypeFacultyShow>(`/faculties/${facultyId}`);
  facultyData = resp || null;
  console.log(facultyData?.test_series);

  if (!facultyData) {
    return notFound();
  }

  return (
    <div>
      <div>
        <Banner2 title="Faculty Details">
          <div className="flex gap-x-2">
            <Link href="/">Home</Link>
            <span>{">"}</span>
            <Link href="/faculty">Faculty</Link>
            <span>{">"}</span>
            <span>Faculty Details</span>
            <span>{">"}</span>
            <span className="text-primaryred">{facultyData?.name}</span>
          </div>
        </Banner2>
        <FacultyCom {...facultyData} />
        <div className="space-y-4 screen pb-9 border-b-2 border-[#000000]/5 padding-tx">
          <h2 className="text-primaryred heading2 relative mb-4  w-max mx-auto">
            About Me
          </h2>
          <p className="text-center text-xl leading-9">
            {facultyData?.long_description}
          </p>
        </div>
        {facultyData.courses.length > 0 && (
          <div className="space-y-6 padding-yx">
            <h2 className="text-primaryred heading2 pb-6 relative  w-max mx-auto">
              Courses
            </h2>
            <CourseShow data={facultyData.courses} />
            {/* <div className="flex max-sm:flex-col   gap-x-7 mx-auto w-max">
            <div className="  flex flex-col  px-4 py-6  items-center group space-y-4 ">
              <div className="h-16 w-16 p-2 transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]  rounded-full bg-white">
                <Image
                  src="/images/icons/work.svg"
                  alt="science"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg w-[22ch] font-semibold text-center">
                Comprehensive Science for Competitive Exams
              </p>
            </div>
            <div className=" md:border-x md:border-x-orange max-sm:border-y max-sm:border-y-orange flex flex-col  group px-4 py-6 items-center space-y-4 ">
              <div className="h-16 w-16 p-2 transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]  rounded-full bg-white">
                <Image
                  src="/images/icons/botany.svg"
                  alt="science"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg w-[22ch] font-semibold text-center">
                Botany Specialization Modules
              </p>
            </div>
            <div className="flex flex-col  px-4 py-6 items-center  group space-y-4  ">
              <div className="h-16 w-16 p-2  rounded-full bg-white transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]">
                <Image
                  src="/images/icons/literacy.svg"
                  alt="science"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg w-[22ch] font-semibold text-center">
                Practical Science Workshops
              </p>
            </div>
          </div> */}
          </div>
        )}

        {facultyData.test_series?.length! > 0 && (
          <div className="space-y-6 padding-yx">
            <h2 className="text-primaryred heading2 pb-6 relative  w-max mx-auto">
              Test Series
            </h2>
            <TestSeriesShow data={facultyData.test_series || []} />
            {/* <div className="flex max-sm:flex-col   gap-x-7 mx-auto w-max">
            <div className="  flex flex-col  px-4 py-6  items-center group space-y-4 ">
              <div className="h-16 w-16 p-2 transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]  rounded-full bg-white">
                <Image
                  src="/images/icons/work.svg"
                  alt="science"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg w-[22ch] font-semibold text-center">
                Comprehensive Science for Competitive Exams
              </p>
            </div>
            <div className=" md:border-x md:border-x-orange max-sm:border-y max-sm:border-y-orange flex flex-col  group px-4 py-6 items-center space-y-4 ">
              <div className="h-16 w-16 p-2 transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]  rounded-full bg-white">
                <Image
                  src="/images/icons/botany.svg"
                  alt="science"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg w-[22ch] font-semibold text-center">
                Botany Specialization Modules
              </p>
            </div>
            <div className="flex flex-col  px-4 py-6 items-center  group space-y-4  ">
              <div className="h-16 w-16 p-2  rounded-full bg-white transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]">
                <Image
                  src="/images/icons/literacy.svg"
                  alt="science"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg w-[22ch] font-semibold text-center">
                Practical Science Workshops
              </p>
            </div>
          </div> */}
          </div>
        )}

        <div>
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
