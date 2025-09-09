import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import Banner from "@/components/common/Banner";
import { CommonHeading2 } from "@/components/common/CommonHeading2";
import {
  ClockIcon2,
  CollaborativeIcon,
  EducationIcon,
  MountainIcon,
  SalaryIcon,
  TargetIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import CarrerForm from "@/components/CarrerForm";
import { fetchData } from "@/utils/apiUtils";
import { JobOpening } from "@/types";

const CareerPage = async () => {
  let data: JobOpening[] | null = null;
  const resp = await fetchData<JobOpening[]>("/job-openings");
  data = resp || null;

  const benefits = [
    {
      id: 1,
      title: "Impactful Work",
      description: "Shape the future of civil servants through education",
      icon: <TargetIcon />,
    },
    {
      id: 2,
      title: "Competitive Salary",
      description: "Attractive compensation and benefits",
      icon: <SalaryIcon />,
    },
    {
      id: 3,
      title: "Flexible Work Options",
      description: "Balance professional and personal life",
      icon: <ClockIcon2 />,
    },
    {
      id: 4,
      title: "Growth Opportunities",
      description: "Learn, develop, and advance your career",
      icon: <MountainIcon />,
    },
    {
      id: 5,
      title: "Collaborative Environment",
      description: "Work with talented professionals",
      icon: <CollaborativeIcon />,
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Content Creator",
      location: "New Delhi, India",
      responsibilities: [
        "Create engaging UPSC preparation content",
        "Develop study materials and resources",
        "Collaborate with subject matter experts",
      ],
      requirements: [
        "Experience in educational content creation",
        "Strong knowledge of UPSC syllabus",
        "Excellent writing and communication skills",
      ],
      icon: <EducationIcon />,
    },
    {
      id: 2,
      title: "Digital Marketer",
      location: "New Delhi, India",
      responsibilities: [
        "Develop and execute digital marketing strategies",
        "Manage social media platforms and content",
        "Analyze campaign performance and optimize results",
      ],
      requirements: [
        "2+ years of digital marketing experience",
        "Knowledge of SEO, SEM, and social media marketing",
        "Strong analytical and creative skills",
      ],
      icon: <EducationIcon />,
    },
    {
      id: 3,
      title: "Content Creator",
      location: "New Delhi, India",
      responsibilities: [
        "Create engaging UPSC preparation content",
        "Develop study materials and resources",
        "Collaborate with subject matter experts",
      ],
      requirements: [
        "Experience in educational content creation",
        "Strong knowledge of UPSC syllabus",
        "Excellent writing and communication skills",
      ],
      icon: <EducationIcon />,
    },
  ];

  return (
    <div className="bg-[#FFE6D0] min-h-screen bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] ">
      {/* Breadcrumb */}
      <Banner title="Career" desp="Join Our Team & Be a Part of One Aim!">
        <div className="flex items-center text-sm">
          <Link href="/" className="hover:text-[#FF7B07]">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-[#FF7B07]">Career</span>
        </div>
      </Banner>

      {/* Hero Section */}
      <section>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center screen padding-yx">
            <CommonHeading2
              title="Join Our Team "
              desc=" Are you passionate about teaching, content creation, or
                mentoring UPSC aspirants? Join One Aim and contribute to shaping
                the future of civil servants! We are looking for dedicated
                educators, mentors, and professionals who can help UPSC
                aspirants achieve their dreams."
            />
            <div className="flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-[34rem] ">
                <div className="w-full h-full bg-red-100 overflow-hidden  rounded-full ">
                  <Image
                    src="/images/career/career.png"
                    alt="Career at One Aim"
                    width={2400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-lightorange shadow-[0_0_10px_10px_rgba(243,187,138,48)] rounded-full h-16 w-16 flex items-center justify-center cursor-pointer hover:bg-[#FF7B07]/90 transition-all">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work with Us */}
      <section>
        <div className="screen padding-bx">
          <div className="mx-auto w-max">
            <CommonHeading2 title="Why Work with Us?" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mdl:grid-cols-5 gap-10 bg-[#FFE6D0]">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="px-5 py-16 rounded-lg text-center bg-[#FFE6D0] group hover:bg-lightorange hover:scale-110 duration-500 transition-all hover:shadow-[0_0_10px_10px_rgba(243,187,138,0.6)]"
              >
                <div className="h-10 flex justify-center mb-3">
                  <div className="rounded-full flex items-center justify-center group-hover:text-white text-orange duration-300 transition-all">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-medium sm:text-lg text-sm mb-1 group-hover:text-white text-black duration-300 transition-all">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-base group-hover:text-white text-black duration-300 transition-all">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section>
        <div className="screen padding-bx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {data?.map((job, i) => (
              <div
                key={job.id}
                className={`${
                  i === 1
                    ? "flex flex-col !text-orange justify-center !bg-[#DC8940]/30"
                    : "h-max mt-auto"
                } bg-white p-6 rounded-t-3xl shadow-lg`}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-orange mb-2 xl:text-3xl">
                  {job?.designation}
                </h3>
                <p className="mb-4">{job?.location}</p>

                <div className="mb-4">
                  <div dangerouslySetInnerHTML={{ __html: job.content }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Application Form */}
      <section>
        <div className="screen padding-bx">
          <div className="w-max mx-auto">
            <CommonHeading2 title="Career Application Form" />
          </div>
          {/* Pass the required jobOpenings prop here */}
          <CarrerForm jobOpenings={data || []} />
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
