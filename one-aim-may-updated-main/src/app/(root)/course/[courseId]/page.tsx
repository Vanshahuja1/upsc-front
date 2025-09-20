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

// ✅ Helper function to convert YouTube links into iframe
function convertYouTubeLinksToIframe(content: string | TrustedHTML): string {
  if (!content) return "";

  // Convert TrustedHTML to string if needed
  const contentString = typeof content === 'string' ? content : content.toString();

  // Regex for normal YouTube links
  const youtubeRegex =
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g;

  // Regex for short youtu.be links
  const shortRegex = /https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/g;

  let newContent = contentString.replace(
    youtubeRegex,
    (match, videoId) =>
      `<iframe width="50%" height="200" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>`
  );

  newContent = newContent.replace(
    shortRegex,
    (match, videoId) =>
      `<iframe width="100%" height="400" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>`
  );

  return newContent;
}

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;

  let courseData: SingleCourse | null = null;
  const resp = await fetchData<SingleCourse>(`/courses/${courseId}`);
  courseData = resp || null;

  if (!courseData) return notFound();

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] overflow-x-hidden">
      {/* <h1 className="text-2xl text-center text-red-600 mt-4">Hello Worldgg</h1> */}

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
                // desc={courseData.short_description}
              />

              {/* Course Video Series */}
              <section className="w-full">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Video Series</h3>
                  <div className="youtube-video-container" style={{
                    position: 'relative',
                    width: '100%',
                    height: '0',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <iframe 
                      width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/videoseries?si=9EUvBsncm_wIVwVF&amp;list=PL2Li3eVAuCF5wYCN14zMvhL5OZYBoo5RB" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Course Features & Benefits */}
              <section className="w-full space-y-10">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: convertYouTubeLinksToIframe(
                      courseData?.content || ""
                    ),
                  }}
                ></div>
              </section>

              <section className="w-full space-y-10">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: convertYouTubeLinksToIframe(
                      courseData?.extra_content || ""
                    ),
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
                studyMaterial={courseData?.study_materials} // ✅ updated for multiple files
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
