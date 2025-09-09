"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const ProfileCards = () => {
  return (
    <div className="relative w-full ">
      <div className="h-[35vh] bg-red-400 relative">
        <div>
          <div className="h-40 w-40 rounded-full"></div>
        </div>
        <div className="w-[70%] h-full bg-purple-700 flex items-center ml-auto left-24">
          <div className="   space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Prof. Rajiv Bansal
            </h1>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">Designation:</h5>
              <p> Senior Science Instructor</p>
            </div>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">Experience:</h5>
              <p> 23 years</p>
            </div>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg ">
                Qualifications:
              </h5>
              <p> M.Sc. in Botany, B.Ed.</p>
            </div>
            <div className="text-white flex flex-col md:flex-row md:gap-x-2">
              <h5 className="text-white font-semibold text-lg">
                Specialization:
              </h5>
              <p> Science Education</p>
            </div>
            <div className="text-white flex gap-x-4 mt-4">
              <div className="flex items-center gap-x-3">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#DC8940] hover:text-gray-200"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#DC8940] hover:text-gray-200"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#DC8940] hover:text-gray-200"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#DC8940] hover:text-gray-200"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCards;
