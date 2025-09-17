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
  const { courses, coupon, clearCart } = useCartStore();
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

    try {
      // Get user token and user data from localStorage
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('user');
      
      if (!token || !userDataString) {
        alert("Authentication required. Please login again.");
        return;
      }

      const userData = JSON.parse(userDataString);
      const userId = userData.id;

      if (!userId) {
        alert("User ID not found. Please login again.");
        return;
      }

      // Prepare course slugs and test series slugs
      const course_slugs = courses
        .filter((c) => c.type === "course" && c.slug)
        .map((c) => c.slug);
        
      const test_series_slugs = courses
        .filter((c) => c.type === "test_series" && c.slug)
        .map((c) => c.slug);

      // Create order first to get dynamic order ID
      console.log("Creating order...");
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          frontend_user_id: userId,
          name: userData.name || "User Name",
          email: userData.email || "user@example.com",
          phone: userData.mobile || userData.phone || "0000000000",
          address: "Default Address",
          pin_code: "000000",
          city: "Default City",
          state: "Default State",
          country: "India",
          course_slugs: course_slugs,
          test_series_slugs: test_series_slugs,
          promo_code_applied: coupon.code || null,
          discount_amount: (orderSummary.coursePrice * (coupon.percentage || 0)) / 100,
          status: 'pending', // Initial status as pending
          total_amount: orderSummary.totalPayable,
        }),
      });

      if (!orderResponse.ok) {
        const orderError = await orderResponse.json();
        console.error('Failed to create order:', orderError);
        alert("Failed to create order. Please try again.");
        return;
      }

      const orderData = await orderResponse.json();
      console.log("Order response:", orderData); // Debug log
      
      // Extract order_number from the correct path based on your API response
      const dynamicOrderId = orderData.data?.order?.order_number || 
                           orderData.data?.order_id || 
                           orderData.order_id;

      if (!dynamicOrderId) {
        console.error('No order ID received from backend. Response structure:', orderData);
        alert("Failed to get order ID. Please try again.");
        return;
      }

      console.log("Order created successfully with ID:", dynamicOrderId);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderSummary.totalPayable * 100,
        currency: "INR",
        name: "One Aim",
        description: `Payment for ${orderSummary.itemCount} courses`,
        image: "/images/logo.png",
        handler: async function (response: RazorpayPaymentResponse) {
          try {
            // Confirm payment with backend using dynamic order ID
            console.log("Confirming payment with backend...");
            const paymentConfirmResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${dynamicOrderId}/payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-api-key': 'ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                transaction_id: response.razorpay_order_id || response.razorpay_payment_id,
                status: "Success",
                payment_signature: response.razorpay_signature || ""
              }),
            });

            const paymentConfirmResult = await paymentConfirmResponse.json();
            
            if (!paymentConfirmResponse.ok || !paymentConfirmResult.success) {
              console.error('Payment confirmation failed:', paymentConfirmResult);
              alert("Payment confirmation failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
              return;
            }

            console.log("Payment confirmed successfully");

            // Update order status to completed in backend (optional, depends on your backend logic)
            // This step might be handled automatically by the payment confirmation endpoint

            // Set refresh flags for course access checking
            const courseSlugsThatNeedRefresh = courses.map(course => course.slug);
            localStorage.setItem('purchasedCourses', JSON.stringify(courseSlugsThatNeedRefresh));
            localStorage.setItem('courseAccessRefreshTimestamp', Date.now().toString());
            
            // Clear cart and redirect to success page
            clearCart();
            window.location.href = "/cart/thank-you";
            
          } catch (error) {
            console.error('Payment processing error:', error);
            alert("Payment processing failed. Please contact support.");
          }
        },
        prefill: {
          name: userData.name || "",
          email: userData.email || "",
          contact: userData.mobile || userData.phone || "",
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
      
    } catch (error) {
      console.error('Order creation error:', error);
      alert("Failed to create order. Please try again.");
    }
  };  const paymentMethods = [
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
