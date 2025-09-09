import axios from "axios";
import Banner from "@/components/common/Banner";
import Link from "next/link";
import { CommonHeading2 } from "@/components/common/CommonHeading2";
import TeamCard from "@/components/ui/TeamCard";
import {
  EducationIcon,
  IndustryIcon,
  PassionIcon,
  TeachingIcon,
} from "@/components/icons";
import { Faculty } from "@/types";
import { fetchData } from "@/utils/apiUtils";
import { notFound } from "next/navigation";

const facultyHighlights = [
  {
    id: 1,
    title: "Highly qualified and experienced educators",
    icon: <EducationIcon />,
  },
  {
    id: 2,
    title: "Personalized teaching approach",
    icon: <TeachingIcon />,
  },
  {
    id: 3,
    title: "Industry experts with real-world knowledge",
    icon: <IndustryIcon />,
  },
  {
    id: 4,
    title: "Passionate about student success",
    icon: <PassionIcon />,
  },
];

const FacultyPage = async () => {
  let teamMemberList: Faculty[] | null = null;

  const resp = await fetchData<Faculty[]>("/faculties");
  teamMemberList = resp || null;
  if (!teamMemberList) return notFound();

  return (
    <main className="bg-[#FFF7F0]">
      {/* Banner Section */}
      <Banner title="Faculty" desp="Meet Our Expert Faculty at One Aim">
        <Link href="/" className="hover:text-[#FF7B07]">
          Home
        </Link>
        <span>{">"}</span>
        <span className="text-[#FF7B07]">Faculty</span>
      </Banner>

      {/* Faculty Intro Section */}
      <section>
        <div className="screen padding-tx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#C1151B] mb-4">
                Meet Our Expert Faculty at One Aim
              </h2>
              <p className="text-gray-700 mb-6">
                At One Aim, we take pride in our team of experienced and
                dedicated educators who are committed to providing high-quality
                education. Our faculty members bring years of expertise in their
                respective fields, ensuring students receive the best guidance
                and mentorship.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-9 max-sm:gap-14">
              {facultyHighlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className={` px-4 py-12 group bg-white text-lightorange rounded-3xl shadow-sm  space-y-4 hover:bg-lightorange duration-500 hover:text-white font-medium  hover:-rotate-[10deg]`}
                >
                  <div className="h-14 w-14  rounded-full p-2 group-hover:bg-white/20 bg-lightorange/10  flex items-center justify-center">
                    {highlight.icon}
                  </div>
                  <h2 className=" text-xl leading-6">{highlight.title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty & Mentors Section */}
      <section>
        <div className="screen padding-yx">
          <div className="text-center  w-max mx-auto ">
            <CommonHeading2 title="Faculty & Mentors!" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMemberList.map((faculty) => (
              <div key={faculty.slug} className="h-full">
                <TeamCard
                  name={faculty.name}
                  designation={faculty.designation || ""}
                  experience={faculty.experience || ""}
                  qualification={faculty.qualifications || ""}
                  specialization={faculty.designation || ""}
                  description={faculty.short_description || ""}
                  image={faculty.featured_image_url || ""}
                  facultSlug={faculty.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Faculty Section */}
      <div>
        <section className="padding-bx screen hidden md:block">
          <div className="box p-5 flex  items-center max-sm:h-[30vh] md:h-[35vh]">
            <CommonHeading2
              title="Join Our Faculty"
              desc="Are you passionate about teaching and shaping the future? We're
              always looking for talented educators to join our team. If you're
              interested, send your resume to [Insert HR Email]."
            />
          </div>
        </section>
        <section className="padding-bx block md:hidden">
          <div className=" p-5 bg-[#f8e7d9] rounded-2xl flex justify-center items-center max-sm:h-[30vh] md:h-[35vh]">
            <CommonHeading2
              title="Join Our Faculty"
              desc="Are you passionate about teaching and shaping the future? We're
              always looking for talented educators to join our team. If you're
              interested, send your resume to [Insert HR Email]."
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default FacultyPage;
