"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";

import { toast } from "react-toastify";
import { CartStore, Course } from "@/types";
import {
  BiBook,
  BiQuestionMark,
  BiTime,
  BiUser,
  BiVideo,
  BiLock,
} from "react-icons/bi";

interface FeaturedCardProps extends Course {
  testSeries?: boolean;
  href: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  type,
  slug,
  sub_heading,
  language,
  duration,
  video_lectures,
  questions_count,
  price,
  short_description,
  featured,
  sequence,
  featured_image_url,
  content,
  study_material_url,
  timetable_url,
  course_course_contents,
  course_course_faqs,
  faculties,
  testSeries = false,
  href,
  heading,
}) => {
  const { addCourse } = useCartStore();
  const router = useRouter();
  
  // State for user authentication and course access
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCourseAccess, setHasCourseAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if user is logged in and has course access on component mount
  useEffect(() => {
    checkUserAuthStatus();
    if (isLoggedIn) {
      checkCourseAccess();
    }
  }, [isLoggedIn, slug]);

  // Function to check if user is authenticated
  const checkUserAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }

  // Function to check if user has access to this course
  const checkCourseAccess = async () => {
    if (!isLoggedIn) return;

    setIsCheckingAccess(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/cart/add`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          courseSlug: slug,
          courseType: testSeries ? 'test-series' : 'course'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHasCourseAccess(data.hasAccess);
      } else {
        setHasCourseAccess(false);
      }
    } catch (error) {
      console.error('Error checking course access:', error);
      setHasCourseAccess(false);
    } finally {
      setIsCheckingAccess(false);
    }
  };

  // Handle adding course to cart
  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.info("Please login to add items to cart");
      // Store current URL to redirect back after login
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/auth/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      // API call to add course to cart
      const token = localStorage.getItem('token');
      console.log("Token for cart add", token);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/cart/add`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          courseSlug: slug,
          courseType: type,
          courseHeading: heading,
          faculty: Array.isArray(faculties) ? faculties.map((data) => data.name) : [],
          duration: duration,
          price: price,
          image: featured_image_url,
        }),
      });

      if (response.ok) {
        // Ensure type is properly cast to CartStore type
        const courseType: 'course' | 'test_series' = testSeries ? 'test_series' : 'course';
        
        // Also add to local cart store for UI updates
        const cartStore: CartStore = {
          type: courseType, // Use the properly typed variable
          slug: slug,
          heading: heading,
          faculty: Array.isArray(faculties) ? faculties.map((data) => data.name) : [],
          duration: duration,
          price: price,
          image: featured_image_url,
        };
        addCourse(cartStore);
        toast.success("Item is added to your cart");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle read more click
  const handleReadMore = () => {
    if (!isLoggedIn) {
      toast.info("Please login to view course details");
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
      return;
    }

    if (!hasCourseAccess) {
      toast.warning("You need to purchase this course to access the content");
      return;
    }

    // Navigate to course page
    router.push(`${testSeries ? `/test-series/${href}` : `/course/${href}`}`);
  };

  return (
    <div className="h-full bg-white rounded-[2rem] max-sm:rounded-[1.5rem] p-5 sm:p-6 space-y-4 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-b-[rgba(239,68,68,0.1)] flex flex-col">
      {/* Tags */}
      <div className="flex justify-between flex-wrap gap-2 sm:gap-3">
        {duration && (
          <div className="flex-shrink-0">
            <h6 className="text-xs max-sm:text-[0.65rem] py-1.5 sm:py-2 bg-gradient-to-tr from-[#FFE9E9] to-[#FFF5EC] text-[#FF7B07] px-3 sm:px-5 rounded-full font-semibold whitespace-nowrap">
              {duration}
            </h6>
          </div>
        )}
        <div className="inline-flex gap-x-1.5">
          {faculties &&
            faculties.map((data, i) => (
              <h4
                key={i}
                className="text-xs flex items-center px-3 bg-gradient-to-tr from-[#FFE9E9] to-[#FFF5EC] text-[#FF7B07] rounded-full font-semibold"
              >
                <p>{data.name}</p>
              </h4>
            ))}
        </div>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl group">
        {/* Pricing Tag */}
        <div className="absolute top-3 right-[1px] bg-primaryred z-30 text-white text-sm py-1 px-5 rounded-l-full font-semibold">
          ₹ {price || 0}
        </div>
        <div className="aspect-video relative cursor-pointer" onClick={() => {
          // Allow preview of course image and basic info without authentication
          if (!isLoggedIn || !hasCourseAccess) {
            toast.info(isLoggedIn ? "Purchase this course to access full content" : "Login to view course details");
          }
        }}>
          <Image
            src={featured_image_url || "/images/placeholder.png"}
            alt={heading || "Course"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          {(!isLoggedIn || !hasCourseAccess) && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <BiLock className="text-white text-4xl" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Information */}
      <div className="space-y-4 pl-1 flex flex-col">
        <hgroup className="space-y-3 flex-grow">
          <h3 className="text-xl sm:text-2xl font-semibold line-clamp-2">
            {heading || heading}
          </h3>
          <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
            {short_description}
          </p>
        </hgroup>

        {/* Features List */}
        <ul className="space-y-2">
          {duration && (
            <li className="flex gap-2 items-center">
              <span className="text-lg text-primary">
                <BiTime size={20} />
              </span>
              <span className="text-sm sm:text-base">{`${duration} Duration`}</span>
            </li>
          )}
          {video_lectures && (
            <li className="flex gap-2 items-center">
              <span className="text-lg text-primary">
                <BiVideo size={20} />
              </span>
              <span className="text-sm sm:text-base">{`${video_lectures} Video Lectures`}</span>
            </li>
          )}
          {questions_count && (
            <li className="flex gap-2 items-center">
              <span className="text-lg text-primary">
                <BiQuestionMark size={20} />
              </span>
              <span className="text-sm sm:text-base">{`${questions_count} Questions`}</span>
            </li>
          )}

          <li className="flex gap-2 items-center">
            <span className="text-lg text-primary">
              <BiBook size={20} />
            </span>
            <span className="text-sm sm:text-base">{"Study Material"}</span>
          </li>
          {faculties?.[0]?.name && (
            <li className="flex gap-2 items-center">
              <span className="text-lg text-primary">
                <BiUser size={20} />
              </span>
              <span className="text-sm sm:text-base">{`Faculty: ${faculties[0].name}`}</span>
            </li>
          )}
        </ul>

        {/* Buttons */}
        <div className="flex lg:flex-row flex-col justify-between gap-3">
          <div className="mt-auto pt-2 lg:w-max w-full">
            <button
              onClick={handleReadMore}
              disabled={isCheckingAccess}
              className={`${
                isLoggedIn && hasCourseAccess
                  ? 'bg-black hover:bg-primaryred active:bg-primaryred'
                  : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
              } transition-all duration-300 px-6 md:px-5 py-2 rounded-full text-white text-sm sm:text-base flex items-center justify-center group w-full`}
              aria-label={`Read more about ${heading || "this course"}`}
            >
              {isCheckingAccess ? (
                <span>Checking Access...</span>
              ) : (
                <>
                  <span>
                    {isLoggedIn && hasCourseAccess ? 'Read More' : 
                     isLoggedIn ? 'Purchase Required' : 'Login Required'}
                  </span>
                  {!isLoggedIn || !hasCourseAccess ? (
                    <BiLock className="ml-2 w-4 h-4" />
                  ) : (
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </>
              )}
            </button>
          </div>
          
          <div className="mt-auto pt-2 lg:w-max w-full">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-primaryred hover:bg-red-600 active:bg-red-700 disabled:bg-gray-400 transition-all duration-300 px-6 md:px-5 py-2 w-full rounded-full text-white text-sm sm:text-base flex items-center justify-center group"
              aria-label={`Add ${heading || "this course"} to cart`}
            >
              <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
              {!isAddingToCart && (
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;