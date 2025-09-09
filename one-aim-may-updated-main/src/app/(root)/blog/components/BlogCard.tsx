import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const BlogCard = ({
  image,
  date,
  title,
  description,
  link,
  className,
}: {
  image: string;
  date: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}) => {
  return (
    <div
      className={` rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <Link href={link} className="relative w-full block">
        <div className="relative w-full h-48">
          <Image
            src={image || "/images/blog/blog.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="h-4 w-4 text-[#FF8315] mr-2" />
          <span>{date}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-2">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          <Link
            href={link}
            className="flex items-center text-[#FF8315] font-medium hover:underline"
          >
            Read More
            <FaArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
