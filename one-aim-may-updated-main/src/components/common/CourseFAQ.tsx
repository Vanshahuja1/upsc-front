"use client";
import React, { useState, useRef } from "react";
import { CommonHeading2 } from "./CommonHeading2";
import { CourseContent } from "@/types"; // Renamed to avoid conflict, and using correct type
import { FaChevronDown } from "react-icons/fa"; // Import the icon

interface CourseFAQProps {
  faqs: CourseContent[];
}

const CourseFAQ: React.FC<CourseFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null; // Or some placeholder if no FAQs are provided
  }

  return (
    <div>
      <div className="screen padding-bx space-y-2">
        <div className="mx-auto w-max">
          <CommonHeading2 title="Course Content" />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white px-4 rounded-lg shadow-md">
              <button
                onClick={() => toggleFAQIndex(index)}
                className="w-full flex justify-between items-center py-4 text-lg font-medium text-left text-gray-700 hover:text-orange-500 focus:outline-none"
              >
                <span className="text-orange">{faq.title}</span>
                <FaChevronDown
                  className={`transition-transform transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  opacity: openIndex === index ? 1 : 0,
                  // Optional: remove transform or adjust for smoother animation if preferred
                  // transform: openIndex === index ? 'translateY(0)' : 'translateY(-10px)',
                }}
              >
                <div
                  className="p-4 text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{ __html: faq.content }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseFAQ;
