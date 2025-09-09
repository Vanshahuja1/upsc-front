import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({
  title,
  short_description,
  publish_date,
  featured_image_url,
  blogSlug,
}: {
  title: string;
  short_description: string | null;
  publish_date: string;
  featured_image_url: string;
  blogSlug?: string;
}) => {
  return (
    <div className="space-y-3 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0px_10px_20px_rgba(0,0,0,0.25)] rounded-lg overflow-hidden cursor-pointer group p-8">
      <div className="overflow-hidden">
        <Link
          href={`/blog/${blogSlug}`}
          className=" h-52 w-full inline-block rounded-2xl overflow-hidden"
        >
          <Image
            src={featured_image_url || "/images/placeholder.png"}
            alt="blog"
            width={440}
            height={340}
            className="transition-transform duration-500 group-hover:scale-105  h-full w-full object-cover "
          />
        </Link>
      </div>
      {/* Info  */}
      <div className="pl-3 pb-4">
        <p className="text-[#FFC107]">{publish_date}</p>
        <hgroup className="space-y-1 pt-1 pb-3">
          <Link href={`/blog/${blogSlug}`}>
            <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-[#FF7B07]">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 line-clamp-2">{short_description}</p>
        </hgroup>
        <div className="flex items-center gap-x-2">
          <a
            href={`/blog/${blogSlug}`}
            className="text-[#FF7B07] text-lg font-semibold transition-all duration-300 group-hover:underline"
          >
            Read More{" "}
          </a>
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            <Image
              src={"/images/icons/arrow-4.svg"}
              alt="arrow"
              width={34}
              height={34}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
