"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PButton from "@/components/common/PButton";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";
import { Discount } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fetchData } from "@/utils/apiUtils";

const Cart = () => {
  const router = useRouter();
  // Use the cart store to get courses and actions
  const { courses, removeCourse, clearCart, coupon, applyCoupon } =
    useCartStore(); // Added coupon and applyCoupon from store

  const { register, handleSubmit, reset } = useForm<Discount>();

  const handleCoupon: SubmitHandler<Discount> = async (
    coupanData: Discount
  ) => {
    try {
      const response = await fetch('https://admin.theoneaim.co.in/api/v1/promos/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
        },
        body: JSON.stringify({
          code: coupanData.code
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        // Apply the coupon with the correct structure
        applyCoupon({
          code: data.promo.code,
          percentage: data.promo.percentage
        } as Discount);
        toast.success("Coupon Applied Successfully");
      } else {
        toast.error("Invalid Coupon Code");
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      toast.error("Invalid Coupon Code");
    } finally {
      reset();
    }
  };
  console.log(courses);

  // Separate courses and test series based on the type field
  const courseItems = courses.filter(item => item.type === 'course');
  const testSeriesItems = courses.filter(item => item.type === 'test_series');

  // Calculate price details based on courses in cart
  const calculatePriceDetails = () => {
    const coursePrice = courses.reduce(
      (total, course) => total + (course.price || 0),
      0
    );
    const discount = (coursePrice * coupon.percentage!) / 100;

    const processingFee = 0;
    const totalPayable = coursePrice - discount + processingFee;

    return {
      coursePrice,
      discount,
      processingFee,
      totalPayable,
    };
  };

  const priceDetails = calculatePriceDetails();

  // Function to render cart header
  const renderCartHeader = () => {
    const courseCount = courseItems.length;
    const testSeriesCount = testSeriesItems.length;
    
    if (courseCount === 0 && testSeriesCount === 0) {
      return (
        <h1 className="text-xl font-semibold mb-3">
          <span className="text-orange">0 Items</span> in Cart
        </h1>
      );
    }

    const headerParts = [];
    
    if (courseCount > 0) {
      headerParts.push(
        <span key="courses" className="text-orange">
          {courseCount} {courseCount === 1 ? "Course" : "Courses"}
        </span>
      );
    }
    
    if (testSeriesCount > 0) {
      headerParts.push(
        <span key="testSeries" className="text-orange">
          {testSeriesCount} {testSeriesCount === 1 ? "Test Series" : "Test Series"}
        </span>
      );
    }

    return (
      <h1 className="text-xl font-semibold mb-3">
        {headerParts.reduce((prev, curr, index) => 
          index === 0 ? [curr] : [...prev, " and ", curr], 
          [] as React.ReactNode[]
        )}{" "}
        in Cart
      </h1>
    );
  };

  return (
    <div>
      <div className="min-h-screen bg-[#FFF7F0] px-4 md:px-8 lg:px-16 py-8">
        <div className="container mx-auto max-w-6xl">
          {renderCartHeader()}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {courses.length > 0 &&
                courses.map((course, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 mb-4 shadow">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 h-32 relative">
                        <div className="w-full h-full bg-gray-200 rounded-md overflow-hidden">
                          {/* Replace with actual images */}
                          <div className="w-full h-full bg-gray-300 ">
                            <Image
                              src={course.featured_image_url || course.image || "/images/placeholder.png"}
                              alt={course.heading}
                              fill
                              className="object-cover rounded-2xl"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {course.heading}
                        </h3>
                        
                        {/* Show duration for both courses and test series */}
                        {course.duration && (
                          <div className="text-sm text-orange bg-orange/10 px-2 rounded-full w-max mt-1">
                            {course.type === 'test_series' ? `Duration: ${course.duration}` : course.duration}
                          </div>
                        )}
                        
                        {/* Show faculty for both courses and test series */}
                        {course.faculty && (
                          <div className="text-sm text-orange bg-orange/10 px-2 rounded-full w-max mt-3">
                            {course.faculty
                              .map((faculty) => faculty)
                              .join(", ")}
                          </div>
                        )}
                        
                        {/* Additional info for test series */}
                        {course.type === 'test_series' && (
                          <>
                            {course.testCount && (
                              <div className="text-sm text-orange bg-orange/10 px-2 rounded-full w-max mt-1">
                                {course.testCount} Tests
                              </div>
                            )}
                            {course.subjects && (
                              <div className="text-sm text-orange bg-orange/10 px-2 rounded-full w-max mt-1">
                                {course.subjects.join(", ")}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="text-xl text-[#FF7B07] font-semibold">
                          ₹{course.price}
                        </div>
                        <button
                          onClick={() => removeCourse(course.slug)}
                          className="mt-2 ring-[0.7px] rounded-full ring-primaryred px-3 py-1 text-md hover:bg-primaryred hover:text-white duration-200 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {courses.length === 0 && (
                <div className="bg-white rounded-lg p-8 mb-4 shadow text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Your cart is empty
                  </h3>
                </div>
              )}
            </div>

            {/* Price and Coupon */}
            {courses.length > 0 && (
              <div className="lg:col-span-1">
                {/* Coupon Section */}
                <div className="bg-lightorange rounded-lg py-8 px-10 mb-4 text-white relative overflow-hidden">
                  <div className="h-20 w-40 bg-[#FFF7F0] rounded-b-full absolute -rotate-90 -left-20 top-1/2 transform -translate-y-1/2"></div>
                  <div className="h-20 w-40 bg-[#FFF7F0] rounded-b-full absolute rotate-90 -right-20 top-1/2 transform -translate-y-1/2"></div>

                  <div className="text-center">
                    {/* <h2 className="text-xl font-bold mb-1">Flat 10% Off</h2> */}
                    <p className="mb-3">Save More on Your UPSC Preparation!</p>
                    {/* <p className="font-semibold">Use Code: 10off</p> */}
                  </div>

                  <div className="mt-4 relative z-40">
                    <div className="h-10 border-t border-dashed border-white opacity-30 my-3"></div>
                    
                    {/* Show applied coupon or input field */}
                    {coupon.code ? (
                      <div className="bg-white bg-opacity-20 rounded-md p-3 mb-3">
                        <div className="flex justify-between items-center text-white">
                          <div>
                            <p className="text-sm font-semibold">Applied: {coupon.code}</p>
                            <p className="text-xs">Save {coupon.percentage}%</p>
                          </div>
                          <button
                            onClick={() => applyCoupon({ code: "", percentage: 0 } as Discount)}
                            className="text-white hover:text-red-200 text-sm underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="w-full p-2 rounded-md text-black text-sm"
                          placeholder="Enter your Coupon Code here"
                          {...register("code", {
                            required: "Coupon code is required",
                            minLength: {
                              value: 3,
                              message: "Coupon code must be at least 3 characters",
                            },
                          })}
                        />
                        <div className="flex justify-center">
                          <PButton onClick={handleSubmit(handleCoupon)}>
                            Apply here
                          </PButton>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="absolute z-10 left-0 bottom-0">
                    <Image
                      src="/images/cart/cart.png"
                      alt="course-bg"
                      width={120}
                      height={100}
                    />
                  </div>
                </div>

                {/* Price Details */}
                <div className="bg-white border border-lightorange rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Course Price</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Course Price</span>
                      <span>₹{priceDetails.coursePrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        Discount {coupon.code ? `(${coupon.code})` : "(if any)"}
                      </span>
                      <span className={priceDetails.discount > 0 ? "text-green-600" : ""}>
                        -₹{priceDetails.discount.toFixed(2)}
                      </span>
                    </div>

                    {/* <div className="flex justify-between">
                      <span>Taxes (18% GST)</span>
                      <span>₹{priceDetails.taxes.toFixed(2)}</span>
                    </div> */}

                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>₹{priceDetails.processingFee.toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Payable</span>
                        <span className="text-[#FF7B07]">
                          ₹{priceDetails.totalPayable.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <PButton
                      className={`${
                        priceDetails.totalPayable === 0
                          ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                          : ""
                      }`}
                      disabled={priceDetails.totalPayable === 0}
                      onClick={() => router.push("/cart/address")}
                    >
                      Proceed
                    </PButton>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={clearCart}
                      className="text-primaryred hover:underline text-sm"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;