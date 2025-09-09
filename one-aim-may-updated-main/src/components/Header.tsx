"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPhoneAlt,
  FaQuora,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { IoIosArrowForward, IoMdMail } from "react-icons/io";
import { FaFacebookF, FaSquareXTwitter } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Button from "./ui/Button";
import gsap from "gsap";
import CustomDropdown from "./ui/CustomDropdown";
import { usePathname } from "next/navigation";

import Link from "next/link";
import {
  AboutIcon,
  BagIcon,
  ContactIcon,
  CourseIcon,
  FAQIcon,
  HomeIcon,
  LogoutIcon,
  NotificationIcon,
  SupportIcon,
  TestSeriesIcon,
} from "./icons";
import { useCartStore } from "@/store/cartStore";
import { OrganizationInfo } from "@/types";
import { fetchData } from "@/utils/apiUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const { courses } = useCartStore();
  const [apiData, setApiData] = useState<OrganizationInfo>();

  // Navigation items
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/course", label: "Courses" },
    { href: "/test-series", label: "Test Series" },
    { href: "/contact-us", label: "Contact" },
  ];

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      setAuthLoading(true);
      const token = localStorage.getItem('token'); // or however you store your token
      
      const response = await fetch('/api/auth/check-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsLogIn(data.authenticated || false);
      } else {
        setIsLogIn(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLogIn(false);
    } finally {
      setAuthLoading(false);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  // Scroll handler: hides header if scrolling down, shows if scrolling up (or near top)
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;

    // If user scrolled down more than 5px and passed 100px, hide header.
    // If user scrolled up more than 5px OR is near top, show header.
    if (scrollY > 100 && delta > 5) {
      setHeaderVisible(false);
    } else if (delta < -5 || scrollY < 100) {
      setHeaderVisible(true);
    }

    setLastScrollY(scrollY);
  }, [lastScrollY]);

  // Fetch organization info + add/remove scroll listener + check auth
  useEffect(() => {
    const load = async () => {
      const data = await fetchData<OrganizationInfo>("/company");
      setApiData(data);
    };
    load();
    checkAuthStatus();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Animate mobile menu when it opens
  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-menu-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, [isMenuOpen]);

  return (
    <header className="z-50 sticky top-0">
      {/* RED TOP BAR: hide/show via translate-y */}
      {(apiData?.phones?.[0]?.number ||
        apiData?.emails?.[0]?.email ||
        apiData?.social_media?.facebook_link ||
        apiData?.social_media?.instagram_link ||
        apiData?.social_media?.linkedin_link ||
        apiData?.social_media?.twitter_link ||
        apiData?.social_media?.youtube_link) && (
        <div
          className={`
            header-top
            bg-primaryred text-white py-[8px]
            transform transition-transform duration-300 ease-in-out
            ${headerVisible ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <div className="bg-primaryred sm:space-x-3 flex justify-between items-center screen padding-x">
            <div className="hidden sm:block">
              <div className="flex gap-x-4">
                {apiData?.phones?.[0]?.number && (
                  <div className="flex items-center gap-x-2">
                    <FaPhoneAlt />
                    <Link href={`tel:${apiData.phones[0].number}`}>
                      {apiData.phones[0].number}
                    </Link>
                  </div>
                )}
                {apiData?.emails?.[0]?.email && (
                  <div className="flex items-center gap-x-2">
                    <IoMdMail />
                    <a href={`mailto:${apiData.emails[0].email}`}>
                      {apiData.emails[0].email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="max-sm:mx-auto">
              <ul className="flex items-center gap-x-2">
                {apiData?.social_media?.facebook_link && (
                  <Link
                    href={apiData.social_media.facebook_link}
                    target="_blank"
                    className="bg-white inline-block p-1.5 rounded-full"
                  >
                    <FaFacebookF className="h-4 w-4 text-primaryred group-hover:text-white duration-300 ease-in-out" />
                  </Link>
                )}
                {apiData?.social_media?.instagram_link && (
                  <Link
                    href={apiData.social_media.instagram_link}
                    target="_blank"
                    className="bg-white inline-block p-1.5 rounded-full"
                  >
                    <FaInstagram className="h-4 w-4 text-primaryred group-hover:text-white duration-300 ease-in-out" />
                  </Link>
                )}
                {apiData?.social_media?.twitter_link && (
                  <Link
                    href={apiData.social_media.twitter_link}
                    target="_blank"
                    className="bg-white inline-block p-1.5 rounded-full"
                  >
                    <FaSquareXTwitter className="h-4 w-4 text-primaryred group-hover:text-white duration-300 ease-in-out" />
                  </Link>
                )}
                {apiData?.social_media?.linkedin_link && (
                  <Link
                    href={apiData.social_media.linkedin_link}
                    target="_blank"
                    className="bg-white inline-block p-1.5 rounded-full"
                  >
                    <FaLinkedin className="h-4 w-4 text-primaryred group-hover:text-white duration-300 ease-in-out" />
                  </Link>
                )}
                {apiData?.social_media?.youtube_link && (
                  <Link
                    href={apiData.social_media.youtube_link}
                    target="_blank"
                    className="bg-white inline-block p-1.5 rounded-full"
                  >
                    <FaYoutube className="h-4 w-4 text-primaryred group-hover:text-white duration-300 ease-in-out" />
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* WHITE MAIN HEADER: also hide/show via translate-y */}
      <div
        className={`
          desktop-heading bg-white relative transition-transform duration-300 ease-in-out
          ${
            headerVisible
              ? "translate-y-0"
              : "-translate-y-[45%] lg:-translate-y-[45%]"
          }
        `}
      >
        <div className="screen py-2 flex items-center justify-between padding-x">
          {/* Logo */}
          <div className="w-52">
            <Link href="/">
              <Image
                src={apiData?.logo_url || "/logo.png"}
                alt={apiData?.name || "Company Logo"}
                width={220}
                height={180}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav>
            <ul className="xl:flex gap-x-10 hidden">
              {navItems.map((item, index) => {
                const isActive = path === item.href;
                return (
                  <li key={index} className="group relative cursor-pointer">
                    <a
                      href={item.href}
                      className={`relative z-50 ${
                        isActive
                          ? "text-primaryred font-bold"
                          : "group-hover:text-primaryred"
                      }`}
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-16 w-16">
                        <Image
                          src="/images/icons/button-style.svg"
                          alt="style-1"
                          width={120}
                          height={120}
                          className="h-full w-full"
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Buttons - Show different content based on auth status */}
          <div className="hidden xl:flex xl:items-center space-x-5">
            {!authLoading && (
              <>
                {isLogIn ? (
                  // Show cart when logged in
                  <Link
                    href={"/cart"}
                    className="h-12 w-12 p-3 bg-[#FF7B07]/20 group hover:bg-primaryred duration-300 ease-in-out rounded-full flex-center relative cursor-pointer"
                  >
                    <BagIcon className="h-7 w-7 text-black group-hover:text-white duration-300 ease-in-out" />
                    <div className="h-5 w-5 text-white absolute bg-[#DC8940] top-1 rounded-full right-0 text-sm flex items-center justify-center">
                      {courses.length}
                    </div>
                  </Link>
                ) : (
                  // Show login button when not logged in
                  <Button
                    href="/auth/login"
                    className="!py-3 !px-8 hover:bg-primaryred !text-white"
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="xl:hidden">
            <button
              onClick={toggleMenu}
              className="text-primaryred p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <IoMdClose className="h-8 w-8" />
              ) : (
                <RiMenu3Line className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 w-[80%] h-screen bg-white shadow-lg z-[1999] overflow-y-auto px-4"
        >
          <div className="flex flex-col">
            <div className="p-4 flex justify-end">
              <button
                onClick={toggleMenu}
                className="text-primaryred p-2 focus:outline-none"
              >
                <IoMdClose className="h-8 w-8" />
              </button>
            </div>
            <div className="w-52">
              <Link href="/">
                <Image
                  src={apiData?.logo_url || "/logo.png"}
                  alt={apiData?.name || "Company Logo"}
                  width={220}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col h-[70%] mt-10 space-y-8">
            <div className="flex items-start gap-4 mobile-menu-item">
              <div className="text-orange hover:text-red-700">
                <HomeIcon />
              </div>
              <Link href="/" className="hover:text-red-700 font-semibold">
                Home
              </Link>
            </div>
            <div className="flex gap-4 mobile-menu-item">
              <div className="text-orange hover:text-red-700">
                <AboutIcon />
              </div>
              <Link href="/about" className="hover:text-red-700 font-semibold">
                About
              </Link>
            </div>
            <div className="flex gap-4 mobile-menu-item">
              <div className="text-orange hover:text-red-700">
                <CourseIcon />
              </div>
              <Link href="/course" className="hover:text-red-700 font-semibold">
                Courses
              </Link>
            </div>
            <div className="flex gap-4 mobile-menu-item">
              <div className="text-orange hover:text-red-700">
                <TestSeriesIcon />
              </div>
              <Link
                href="/test-series"
                className="hover:text-red-700 font-semibold"
              >
                Test Series
              </Link>
            </div>
            <div className="flex gap-4 mobile-menu-item">
              <div className="text-orange hover:text-red-700">
                <ContactIcon />
              </div>
              <Link
                href="/contact-us"
                className="hover:text-red-700 font-semibold"
              >
                Contact Us
              </Link>
            </div>
            {isLogIn && (
              <div className="flex gap-4 mobile-menu-item">
                <div className="text-orange hover:text-red-700 relative">
                  <BagIcon />
                  {courses.length > 0 && (
                    <div className="h-5 w-5 text-white absolute bg-[#DC8940] -top-2 rounded-full -right-2 text-sm flex items-center justify-center">
                      {courses.length}
                    </div>
                  )}
                </div>
                <Link href="/cart" className="hover:text-red-700 font-semibold">
                  Cart
                </Link>
              </div>
            )}
            {/* Mobile Login Button - only show when not logged in */}
            {!authLoading && !isLogIn && (
              <div className="flex gap-4 mobile-menu-item">
                <div className="text-orange hover:text-red-700">
                  <LogoutIcon />
                </div>
                <Link href="/auth/login" className="hover:text-red-700 font-semibold">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;