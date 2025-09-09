"use client";

import CommonHeading from "@/components/ui/CommonHeading";
import FeaturedCard from "@/components/ui/FeaturedCard";
import { TestSeriesCategory } from "@/types";

import { fetchData } from "@/utils/apiUtils";
import React, { useEffect, useState } from "react";

// Tab interface
interface Tab {
  id: string;
  label: string;
}

const TestSeriesT: React.FC = () => {
  const [testSeriesData, setTestSeriesData] = useState<TestSeriesCategory[]>(
    []
  );
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTestSeries, setActiveTestSeries] = useState<string>("");

  useEffect(() => {
    const fetchTestSeriesData = async () => {
      const response = await fetchData<TestSeriesCategory[]>(
        "/test-series-categories"
      );
      setTestSeriesData(response || []);
      // Include all categories regardless of test_series
      const derivedTabs = response?.map((category) => ({
        id: category.slug,
        label: category.name,
      }));

      setTabs(derivedTabs!);

      if (derivedTabs!.length > 0) {
        setActiveTestSeries(derivedTabs![0].id);
      }
    };

    fetchTestSeriesData();
  }, []);

  const selectedCategory = testSeriesData.find(
    (category: TestSeriesCategory) => category.slug === activeTestSeries
  );

  const displayedCourses = selectedCategory?.test_series || [];

  return (
    <div className="screen padding-yx space-y-12">
      {/* Heading */}
      <div className="w-max mx-auto">
        <CommonHeading title="Test Series" />
      </div>

      {/* Tabs */}
      <div className="flex max-sm:flex-col gap-7 mx-auto w-max">
        {tabs.map((data) => (
          <div
            key={data.id}
            onClick={() => setActiveTestSeries(data.id)}
            className="cursor-pointer"
          >
            <h1 className="text-xl">{data.label}</h1>
            <div
              className={`h-[3px] w-[80%] sm:mx-auto ${
                data.id === activeTestSeries
                  ? "bg-gradient-to-tr from-[#FFA4A8] to-[#FFC593] rounded-full transition-all duration-300"
                  : ""
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses &&
          displayedCourses.map((course) => (
            <FeaturedCard
              type="test-series"
              heading={course.heading}
              slug={course.slug}
              faculties={course.faculties?.map((data) => data)}
              href={course.slug}
              duration={course.duration}
              featured_image_url={
                course.featured_image_url ?? "/images/placeholder.png"
              }
              short_description={course.short_description}
              video_lectures={course.video_lectures}
              questions_count={course.questions_count}
              price={course.price}
              testSeries
            />
          ))}
      </div>
    </div>
  );
};

export default TestSeriesT;
