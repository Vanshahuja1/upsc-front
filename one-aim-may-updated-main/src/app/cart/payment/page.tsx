"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

const PaymentPage = () => {
  const router = useRouter();
  const { courses, coupon } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateOrderSummary = () => {
    const coursePrice = courses.reduce(
      (total, course) => total + course.price,
      0
    );
    const discountAmount = (coursePrice * (coupon.percentage || 0)) / 100;
    const taxes = (coursePrice - discountAmount) * 0;
    const totalPayable = coursePrice - discountAmount + taxes;

    return {
      coursePrice,
      discount: discountAmount,
      taxes,
      processingFee: 0,
      totalPayable,
      itemCount: courses.length,
    };
  };

  const orderSummary = isClient
    ? calculateOrderSummary()
    : {
        coursePrice: 0,
        discount: 0,
        taxes: 0,
        processingFee: 0,
        totalPayable: 0,
        itemCount: 0,
      };
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_live_vegmIuWT1fULsb",
      amount: orderSummary.totalPayable * 100,
      currency: "INR",
      name: "One Aim",
      description: `Payment for ${orderSummary.itemCount} courses`,
      image: "/images/logo.png",
      handler: function (response: RazorpayPaymentResponse) {
        window.location.href = "/cart/thank-you";
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "One Aim Corporate Office",
      },
      theme: {
        color: "#FF7B07",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: "💳", amount: `₹${orderSummary.totalPayable.toFixed(2)}` },
    { id: "cards", name: "Debit/Credit Cards", icon: "💳", amount: `₹${orderSummary.totalPayable.toFixed(2)}` },
    { id: "wallets", name: "Wallets", icon: "👛", amount: `₹${orderSummary.totalPayable.toFixed(2)}` },
    { id: "netbanking", name: "Netbanking", icon: "🏦", amount: `₹${orderSummary.totalPayable.toFixed(2)}` },
  ];
  return (
    <div>
      <div className="h-[88.7vh] flex items-center bg-[#FFF7F0] px-4 md:px-8 lg:px-16 ">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-screen-md mx-auto">
            <div>
              <h1 className="text-xl font-semibold mb-6">Order Summary</h1>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-4">
                  Price Details ({orderSummary.itemCount} items)
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Course Price</span>
                    <span>₹{orderSummary.coursePrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Discount (if any)</span>
                    <span>₹{orderSummary.discount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes (18% GST)</span>
                    <span>₹{orderSummary.taxes.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span>₹{orderSummary.processingFee.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Payable</span>
                      <span className="text-[#FF7B07]">
                        ₹{orderSummary.totalPayable.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-max mx-auto">
                  <button
                    onClick={handleRazorpayPayment}
                    className="mt-4 bg-black text-white py-2 inline-block rounded-full px-12 text-center w-max shadow-lg hover:bg-primaryred transition-all duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
