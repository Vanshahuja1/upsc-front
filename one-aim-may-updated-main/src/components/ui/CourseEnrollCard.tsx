"use client";
import React from "react";
import Image from "next/image";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import {
  CalendarIcon2,
  ClockIcon,
  DownloadIcon,
  LanguageIcon,
  LiveClassIcon,
  ScheduleIcon,
} from "../icons";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CartStore } from "@/types";

interface CourseEnrollCardProps {
  type: 'course' | 'test_series'; // Changed from string to specific union type
  heading: string;
  instructors: string[];
  price: number;
  originalPrice?: number;
  languages: string | undefined;
  features: string[];
  enrollmentDeadline: string | undefined;
  contactPhone: string;
  contactAddress: string;
  duration: string;
  image: string;
  videoLacture: string | undefined;
  question: string | undefined;
  studyMaterial?: { name: string; url: string }[]; // multiple files
  timeTable: string | undefined | null;
  slug: string;
}

const CourseEnrollCard: React.FC<CourseEnrollCardProps> = ({
  heading,
  instructors,
  studyMaterial,
  timeTable,
  image,
  price,
  originalPrice,
  languages,
  type,
  features,
  enrollmentDeadline,
  contactPhone,
  contactAddress,
  duration,
  question,
  videoLacture,
  slug,
}) => {
  const { addCourse } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    const cartStore: CartStore = {
      type: type,
      slug: slug,
      heading: heading,
      faculty: instructors?.map((data) => data),
      duration: duration,
      price: price,
      image: image,
    };
    addCourse(cartStore);
    toast.success("Items is added to your cart");
  };

  // Study Material with prefix removed and sorted
  const formattedStudyMaterial = studyMaterial
    ?.map((file) => {
      // prefix remove karna
      const cleanName = file.name.includes("_")
        ? file.name.split("_").slice(1).join("_")
        : file.name;

      // return new object with clean name
      return { ...file, name: cleanName };
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // ascending order

  return (
    <div className="flex flex-col gap-6">
      {/* Main Card */}
      <div className="bg-white py-5 rounded-lg overflow-hidden shadow-orange shadow-sm border border-[#FF7B07]/60">
        <div className="relative h-64 w-full">
          <Image
            src={image ?? "/images/placeholder.png"}
            alt="Course prep materials"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between gap-x-3">
            <div className="text-[#FF7B07] bg-gradient-to-r from-[#FFE9E9] to-[#FFF5EC] px-4 py-1 text-xs rounded-full">
              {duration}
            </div>

            <div className="flex gap-2">
              {instructors.map((data, i) => (
                <div
                  key={i}
                  className="text-[#FF7B07] bg-gradient-to-r from-[#FFE9E9] to-[#FFF5EC] px-4 py-1 text-xs rounded-full"
                >
                  {data}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-lg font-bold mb-2">{heading}</h2>

          {languages && (
            <div className="flex items-center gap-2 mb-3">
              <LanguageIcon className="text-orange h-6 w-6" />
              <span className="text-sm text-gray-700">{languages}</span>
            </div>
          )}

          {question && (
            <div className="flex items-center gap-2 mb-3">
              <ScheduleIcon className="text-orange h-6 w-6" />
              <span className="text-sm text-gray-700">{question}</span>
            </div>
          )}

          {videoLacture && (
            <div className="flex items-center gap-2 mb-3">
              <LiveClassIcon className="text-orange h-6 w-6" />
              <span className="text-sm text-gray-700">{videoLacture}</span>
            </div>
          )}

          <div className="flex items-center mt-4">
            <div>
              <span className="text-[#FF7B07]">
                <span className="text-3xl font-bold">₹{price}</span>
                <span className="text-[10px]">(Limited Period Offer)</span>
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  (₹{originalPrice})
                </span>
              )}
            </div>
          </div>

          <div className="w-max mx-auto pt-3">
            <button
              onClick={handleAddToCart}
              className="text-white py-3 px-12 rounded-full w-full bg-black hover:bg-primaryred transition-all duration-500"
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Cards */}
      {(formattedStudyMaterial?.length || enrollmentDeadline || timeTable) && (
        <div className="bg-white rounded-lg overflow-hidden p-4 shadow-orange shadow-sm">
          <div className="space-y-2">
            {/* Multiple Study Materials */}
            {formattedStudyMaterial?.map((file, index) => (
              <Link
                key={index}
                href={file.url}
                download={file.name} // download name bhi clean
                target="_blank"
                className="flex items-center gap-3 cursor-pointer border-b border-dashed hover:text-orange-500 border-gray-300 pb-2"
              >
                <div className="text-orange">
                  <DownloadIcon className="w-8 h-8" />
                </div>
                <span className="font-medium text-sm">{file.name}</span>
              </Link>
            ))}

            {enrollmentDeadline && (
              <div className="flex items-center gap-3 border-b border-dashed border-gray-300 py-2">
                <ClockIcon className="w-8 h-8 text-orange" />
                <span className="text-sm">
                  <span className="font-medium">Enrollment Deadline: </span>
                  {enrollmentDeadline}
                </span>
              </div>
            )}

            {timeTable && (
              <Link
                href={timeTable}
                target="_blank"
                className="flex items-center gap-3 cursor-pointer py-2"
              >
                <CalendarIcon2 className="h-8 w-8 text-orange" />
                <span className="font-medium text-sm">Download Timetable</span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Contact Card */}
      <div className="bg-[#DC8940]/90 text-white rounded-lg overflow-hidden shadow-sm px-4 py-8">
        <div className="mb-4 space-y-3">
          <h3 className="text-2xl font-semibold">Have any Questions?</h3>
          <p className="text-sm text-white">
            Contact us on the following details:
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaPhoneAlt size={16} />
            <span className="text-sm">{contactPhone}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt size={16} />
            <span className="text-sm">{contactAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollCard;