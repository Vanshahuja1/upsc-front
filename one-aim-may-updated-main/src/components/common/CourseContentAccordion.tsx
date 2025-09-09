"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ContentItem {
  title: string;
  duration?: string;
  subItems?: string[];
}

interface ModuleItem {
  id: string;
  title: string;
  contents?: ContentItem[];
}

interface CourseContentAccordionProps {
  title?: string;
  modules: ModuleItem[];
}

const CourseContentAccordion: React.FC<CourseContentAccordionProps> = ({
  title = "Course Content",
  modules,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="mt-4">
        <div className="border rounded-lg overflow-hidden">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={`${index !== modules.length - 1 ? "border-b" : ""}`}
            >
              <div
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleModule(module.id)}
              >
                <p className="font-medium">{module.title}</p>
                {openId === module.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openId === module.id && module.contents && (
                <div className="p-4 bg-white">
                  <ul className="space-y-3">
                    {module.contents.map((content, i) => (
                      <li
                        key={i}
                        className="border-b border-gray-100 pb-2 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-800">
                            {content.title}
                          </p>
                          {content.duration && (
                            <span className="text-sm text-gray-500">
                              {content.duration}
                            </span>
                          )}
                        </div>
                        {content.subItems && content.subItems.length > 0 && (
                          <ul className="mt-2 ml-4 space-y-1">
                            {content.subItems.map((subItem, si) => (
                              <li
                                key={si}
                                className="text-sm text-gray-600 flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                                {subItem}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseContentAccordion;
