import Accordian from "@/components/common/Accordian";
import Banner2 from "@/components/common/Banner2";
import { CommonHeading2 } from "@/components/common/CommonHeading2";
import CourseFAQ from "@/components/common/CourseFAQ";
import FacultyCom from "@/components/common/FacultyCom";
import { FAQ } from "@/components/common/FAQ";
import RelatedCourse from "@/components/common/RelatedCourse";
import CourseEnrollCard from "@/components/ui/CourseEnrollCard";
import { SingleCourse } from "@/types";
import { fetchData } from "@/utils/apiUtils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;

  let courseData: SingleCourse | null = null;
  const resp = await fetchData<SingleCourse>(`/courses/${courseId}`);
  courseData = resp || null;

  if (!courseData) return notFound();

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] overflow-x-hidden">
     
     
    <h1 className="text-2xl text-center text-red-600 mt-4">Hello Worldgg</h1>


      <Banner2 title={`${courseData.heading}`}>
        <Link href={"/"}>Home</Link>
        <span>{">"}</span>
        <Link href={"/course"}>Courses</Link>
        <span>{">"}</span>
        <p className="text-primaryred">{courseData.slug}</p>
      </Banner2>
      <div className=" w-full flex flex-col md:flex-row  gap-8">
        {/* Left Content Column */}
        <div className="w-full flex flex-col padding-bottom">
          {/* Course Overview */}
          <div className="flex flex-col lg:flex-row gap-5 screen  padding-bx">
            <div className="space-y-10 w-full lg:w-2/3">
              <CommonHeading2
                title="Course Overview"
                desc={courseData.short_description}
              />

              {/* Course Features & Benefits */}
              <section className="w-full space-y-10">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: courseData?.content || "",
                  }}
                ></div>
              </section>
              
               <section className="w-full space-y-10">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: courseData?.extra_content || "",
                  }}
                ></div>
              </section>
            </div>
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
              <CourseEnrollCard
                type="course"
                heading={`${courseData.heading}`}
                instructors={courseData?.faculties.map((data) => data.name)}
                slug={courseData.slug}
                duration={courseData?.duration}
                question={courseData?.questions_count}
                videoLacture={courseData?.video_lectures}
                image={courseData?.featured_image_url}
                price={courseData?.price}
                languages={courseData?.language}
                timeTable={courseData?.timetable_url}
                studyMaterial={courseData?.study_materials} //  updated for multiple files
                features={[
                  "PDFs, Notes, Mock Tests",
                  "Online (Live + Recorded)",
                ]}
            
                enrollmentDeadline={courseData?.enrolment_deadline_date || ""}
                contactPhone="+91 8955249714"
                contactAddress="🏢 No-123, Omega, Anukampa, Near Sanskrit College, Bhankrota, Jaipur."

                
              />
            </div>
          </div>

          <FacultyCom {...courseData.faculties[0]} />

          <Accordian
            long_description={
              courseData.faculties[0]?.long_description ||
              "No description available"
            }
          />

          <CourseFAQ faqs={courseData.course_course_contents || []} />
          <RelatedCourse courses={courseData.related_courses} />
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default page;
