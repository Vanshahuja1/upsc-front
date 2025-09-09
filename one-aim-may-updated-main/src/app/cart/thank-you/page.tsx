"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Footer from "@/components/Footer";
import PButton from "@/components/common/PButton";

const ThankYouPage = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="py-24 bg-[#FFF7F0] px-4 md:px-8 lg:px-16 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 mb-8">
              Your payment has been processed successfully. You will receive an
              email confirmation shortly.
            </p>

            <div className="mb-8 mx-auto max-w-md p-4 border rounded-lg bg-gray-50">
              <p className="font-medium mb-2">Order Details:</p>
              <p className="text-gray-600">
                Order ID: #ORD-{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p className="text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-center">
              <PButton href="/">Continue Shopping</PButton>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYouPage;
