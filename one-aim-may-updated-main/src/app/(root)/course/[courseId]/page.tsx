"use client";

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

// Component to render content with YouTube iframe support
const ContentRenderer = ({ content }: { content: string | TrustedHTML }) => {
  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Function to convert YouTube URLs to iframes
  const processContent = (htmlContent: string) => {
    // First, try to find standalone YouTube URLs
    const youtubeUrlRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+)/g;
    
    let processedContent = htmlContent.replace(youtubeUrlRegex, (match) => {
      const videoId = getYouTubeVideoId(match);
      if (videoId) {
        return `<div class="youtube-container" style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 20px 0;">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>`;
      }
      return match;
    });

    // Also check if content already contains iframe or embed codes and enhance them
    processedContent = processedContent.replace(/<iframe[^>]*src="[^"]*youtube[^"]*"[^>]*>/g, (match) => {
      // If it's already an iframe, wrap it in responsive container if not already wrapped
      if (!match.includes('youtube-container')) {
        return `<div class="youtube-container" style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 20px 0;">
          ${match.replace(/style="[^"]*"/, 'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"')}
        </div>`;
      }
      return match;
    });

    return processedContent;
  };

  // Convert content to string if it's TrustedHTML
  const contentString = typeof content === 'string' ? content : content?.toString() || '';

  return (
    <div
      className="blog-content youtube-content"
      dangerouslySetInnerHTML={{
        __html: processContent(contentString),
      }}
    />
  );
};

const page = ({ params }: { params: Promise<{ courseId: string }> }) => {
  const [courseData, setCourseData] = React.useState<SingleCourse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [courseId, setCourseId] = React.useState<string>("");

  React.useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const resolvedParams = await params;
        setCourseId(resolvedParams.courseId);
        
        const resp = await fetchData<SingleCourse>(`/courses/${resolvedParams.courseId}`);
        console.log("course data", resp);
        setCourseData(resp || null);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
                <ContentRenderer content={courseData?.content || ""} />
              </section>
              
               <section className="w-full space-y-10">
                <ContentRenderer content={courseData?.extra_content || ""} />
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
