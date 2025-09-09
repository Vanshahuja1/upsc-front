"use client";
import React, { useEffect, useState } from "react";

import BlogCard from "./ui/BlogCard";
import { CommonHeading2 } from "./common/CommonHeading2";

import { fetchData } from "@/utils/apiUtils";
import { Blogs } from "@/types";

const Blog = () => {
  const [blogData, setBlogData] = useState<Blogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      const resp = await fetchData<Blogs[]>("/blogs");
      setBlogData(resp || []);
    };
    fetchBlogs();
  }, []);
  return blogData.length > 0 ? (
    <section className="bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE]">
      <div className="screen  padding-bx">
        <div className="mx-auto w-max">
          <CommonHeading2 title="Latest Updates" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-sm:space-y-6 gap-x-6">
          {blogData.map((blog) => (
            <BlogCard
              key={blog.title}
              blogSlug={blog.slug}
              title={blog.title}
              featured_image_url={blog.featured_image_url}
              publish_date={blog.publish_date}
              short_description={blog.short_description}
            />
          ))}
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default Blog;
