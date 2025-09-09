"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FaChevronDown } from "react-icons/fa";
import { CommonHeading2 } from "@/components/common/CommonHeading2";
import axios from "axios";
import { FAQType } from "@/types";
import { fetchData } from "@/utils/apiUtils";

export const FAQ: React.FC<{ className?: string }> = ({ className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [faqData, setFaqData] = useState<FAQType[]>([]);

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      gsap.fromTo(
        contentRefs.current[openIndex],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    const fetchFAQ = async () => {
      const resp = await fetchData<FAQType[]>("/faqs");
      setFaqData(resp || []);
    };

    fetchFAQ();
  }, [openIndex]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return faqData.length > 0 ? (
    <div className={`screen mx-auto   ${className}`}>
      <div className="w-max mx-auto hidden md:block ">
        <CommonHeading2 title="Frequently Asked Questions (FAQs)" />
      </div>
      <div className="w-max mx-auto  md:hidden ">
        <CommonHeading2 title="FAQ" />
      </div>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white px-4 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-4 text-lg font-medium text-orange-500"
            >
              {faq.question}
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
              className="overflow-hidden"
              style={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
            >
              <div className="p-4 text-gray-700">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};
