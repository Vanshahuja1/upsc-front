"use client";
import React from "react";
import Button from "./ui/Button";

const HomeHero = () => {
  return (
    <div className="screen padding-x py-20 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primaryred mb-4">
        Welcome to One Aim
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
        Your journey to success starts here
      </p>
      <Button href="/courses" className="!py-3 !px-8 !text-white">
        Get Started
      </Button>
    </div>
  );
};

export default HomeHero;
