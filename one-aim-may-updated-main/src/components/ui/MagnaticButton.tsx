"use client";
import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

interface MagneticButtonProps {
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
  [key: string]: any; // For additional HTML attributes
}

export default function MagneticButton({
  children,
  href,
  backgroundColor = "#455CE9",
  className = "",
  ...attributes
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!buttonRef.current || !circleRef.current) return;

    // Initialize GSAP timeline for hover animation
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circleRef.current,
        {
          top: "-25%",
          width: "150%",
          duration: 0.4,
          ease: "power3.in",
        },
        "enter"
      )
      .to(
        circleRef.current,
        {
          top: "-150%",
          width: "125%",
          duration: 0.25,
        },
        "exit"
      );

    // Magnetic effect
    const xTo = gsap.quickTo(buttonRef.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(buttonRef.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        buttonRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      timeoutId.current = setTimeout(() => {
        timeline.current?.play();
      }, 300);
    };

    const handleMouseEnter = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      timeline.current?.tweenFromTo("enter", "exit");
    };

    const button = buttonRef.current;
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    // Cleanup
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <div
      onClick={() => router.push(href)}
      ref={buttonRef}
      className={`md:px-6 md:py-4 px-3 py-4  text-sm
        relative flex items-center justify-center 
        rounded-full  
        cursor-pointer 
        overflow-hidden
        group
        ${className}
      `}
      {...attributes}
    >
      <div className="relative z-10 transition-colors duration-400 group-hover:text-white">
        {children}
      </div>
      <div
        ref={circleRef}
        className="absolute w-full h-[150%] rounded-full top-full"
        style={{ backgroundColor }}
      />
    </div>
  );
}
