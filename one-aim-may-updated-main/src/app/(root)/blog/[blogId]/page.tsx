import Image from "next/image";
import React from "react";
import BlogCard from "@/components/ui/BlogCard";

import { socialLinks, socialLinks2 } from "@/constant/page";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { TypeBlogShow } from "@/types";
import { fetchData } from "@/utils/apiUtils";
import { notFound } from "next/navigation";

const categories = [
  { name: "Study resources", count: 15 },
  { name: "Exam advice", count: 8 },
  { name: "General knowledge", count: 12 },
  { name: "Student success", count: 9 },
];

const instagramPosts = [
  "/images/blog/blog-show.png",
  "/images/blog/blog-2.png",
  "/images/blog/blog.png",
  "/images/blog/blog-show.png",
  "/images/blog/blog-2.png",
  "/images/blog/blog.png",
  "/images/blog/blog-show.png",
  "/images/blog/blog-2.png",
  "/images/blog/blog.png",
];

const BlogId = async ({ params }: { params: Promise<{ blogId: string }> }) => {
  const { blogId } = await params;

  let currentBlog: TypeBlogShow | null = null;

  const resp = await fetchData<TypeBlogShow>(`/blogs/${blogId}`);
  currentBlog = resp || null;

  if (!currentBlog) {
    return notFound();
  }
  return (
    <div className="bg-[#FFF5EE]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 ">
            <div className="border-b border-gray-400 pb-8">
              {/* Image Container */}
              <div className="mb-6">
                <div className="h-[500px] overflow-hidden rounded-2xl">
                  <Image
                    src={currentBlog.featured_image_url}
                    alt="blog"
                    width={1270}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <p className=" font-semibold text-[#FFC107] text-lg ">
                    {currentBlog.publish_date}
                  </p>
                </div>
              </div>

              {/* Content Container */}
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              ></div>
              <div>
                {/* <h1 className="text-3xl font-bold mb-4">
                  Top Strategies for Cracking IAS Prelims
                </h1>
                <p className="text-gray-600 mb-8">
                  The IAS prelims exam is the first hurdle in the journey to
                  becoming a civil servant. It's a test of both knowledge and
                  strategy. In this article, we will explore the top strategies
                  to help you crack the IAS prelims with confidence.
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">
                      1. Understand the Exam Pattern
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Before diving into your preparation, it's crucial to
                      understand the exam pattern. The IAS prelims consist of
                      two papers:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                      <li>
                        <span className="font-medium">
                          General Studies Paper I:
                        </span>{" "}
                        Covers subjects like History, Geography, Polity,
                        Economy, Environment, and Current Affairs.
                      </li>
                      <li>
                        <span className="font-medium">
                          General Studies Paper II (CSAT):
                        </span>{" "}
                        Tests your aptitude, logical reasoning, and
                        comprehension skills.
                      </li>
                    </ul>
                    <h3 className="text-xl font-semibold mt-4 mb-2">
                      Key Points:
                    </h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>
                        Paper I is worth 200 marks, and Paper II is qualifying
                        in nature, requiring a minimum of 33% to pass.
                      </li>
                      <li>
                        Negative marking is applicable, so accuracy is
                        essential.
                      </li>
                    </ul>
                  </div>

                  <div className="  border-primaryred p-5 ">
                    <h2 className="text-2xl font-semibold mb-3">
                      2. Create a Study Schedule
                    </h2>
                    <p className="text-gray-600 mb-4">
                      A well-structured study schedule is the backbone of
                      effective preparation. Allocate specific time slots for
                      each subject and stick to your timetable.
                    </p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">Tips:</h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>
                        Divide your day into study sessions with breaks in
                        between to avoid burnout.
                      </li>
                      <li>
                        Focus on covering the entire syllabus at least once
                        before moving on to revision.
                      </li>
                      <li>
                        Include time for current affairs and newspaper reading
                        in your daily routine.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold mb-3">
                      3. Focus on High-Yield Topics
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Not all topics carry the same weight. Identify high-yield
                      topics that are frequently asked in the exam and
                      prioritize them in your preparation.
                    </p>

                    <h3 className="text-xl font-semibold mt-4 mb-2">
                      High-Yield Subjects:
                    </h3>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>
                        <span className="font-medium">History:</span> Modern
                        Indian History, Freedom Struggle
                      </li>
                      <li>
                        <span className="font-medium">Geography:</span> Indian
                        and World Geography, Physical Geography
                      </li>
                      <li>
                        <span className="font-medium">Polity:</span> Indian
                        Constitution, Governance, Political System
                      </li>
                      <li>
                        <span className="font-medium">Economy:</span> Economic
                        Development, Current Economic Events
                      </li>
                      <li>
                        <span className="font-medium">Environment:</span>{" "}
                        Biodiversity, Climate Change, Environmental Issues
                      </li>
                    </ul>
                  </div>
                </div> */}

                {/* Social Share */}
                {/* <div className="flex gap-2 my-8">
                <button className="bg-blue-600 text-white p-2 rounded-full">
                  <FaFacebook />
                </button>
                <button className="bg-blue-400 text-white p-2 rounded-full">
                  <FaTwitter />
                </button>
                <button className="bg-blue-700 text-white p-2 rounded-full">
                  <FaLinkedin />
                </button>
              </div> */}
              </div>
            </div>

            {/* Recent Articles */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentBlog.related_blogs.map((relatedBlog) => (
                  <BlogCard
                    key={relatedBlog.title}
                    title={relatedBlog.title}
                    short_description={relatedBlog.short_description}
                    featured_image_url={relatedBlog.featured_image_url}
                    publish_date={relatedBlog.publish_date}
                    blogSlug={relatedBlog.slug}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            {/* Search */}
            {/* <div>
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border-b bg-transparent text-orange placeholder:text-orange border-orange/70  py-2 pl-2 focus:outline-none focus:border-orange"
                />
                <button className="absolute right-3 top-1/2 text-orange transform -translate-y-1/2 ">
                  <FaSearch />
                </button>
              </div>
            </div> */}

            {/* Categories */}
            {/* <div>
              <h3 className="text-xl font-medium mb-4 text-orange">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-400 border-dashed pb-2"
                  >
                    <a href="#" className="text-gray-700 hover:text-orange">
                      {category.name}
                    </a>
                    <span className="text-gray-500 text-sm">
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Instagram Section */}
            {/* <div>
              <h3 className="text-xl font-medium mb-4 text-orange">
                Instagram
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {instagramPosts.map((post, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded"
                  >
                    <Image
                      src={post}
                      alt={`Instagram post ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div> */}
            {/* Tags Section  */}
            {/* <div>
              <h3 className="text-xl font-medium  text-orange mb-4">Tags</h3>
              <div className="flex gap-x-4">
                <div className="bg-white rounded-lg py-2 px-4">
                  <p>Civil Services</p>
                </div>
                <div className="bg-white rounded-lg py-2 px-4">
                  <p>Mock Tests</p>
                </div>
                <div className="bg-white rounded-lg py-2 px-4">
                  <p>Live Classes</p>
                </div>
              </div>
            </div> */}
            {/* Latest Tweets  */}
            {/* <div>
              <h3 className="text-xl font-medium  text-orange mb-4">
                Latest Tweets
              </h3>
              <p>
                Dreaming of a successful career in civil services? Join our live
                batches at One Aim and turn your dreams into reality! 🏆
                #CivilServices #UPSCPreparation #DreamBig"
              </p>
            </div> */}
            {/* Follow us  */}
            <div>
              <h3 className="text-xl font-medium  text-orange mb-4">
                Follow us
              </h3>
              <div>
                <ul className="flex gap-x-4">
                  {socialLinks2.map((link, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-orange group hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      <a
                        href={link.href}
                        aria-label={`Social link ${index + 1}`}
                      >
                        {link.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // For now, the component will render with undefined currentBlog if not found or error occurred.
  // You would typically add a check here: if (!currentBlog) { return <div>Blog not found</div>; }
};

export default BlogId;
