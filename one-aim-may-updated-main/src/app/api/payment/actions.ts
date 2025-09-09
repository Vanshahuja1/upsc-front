"use server";

import { Course } from "@/types";

type OrderResponse = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
};

export async function createRazorpayOrder(courses: Course[]) {
  try {
    // Calculate the total amount
    const coursePrice = courses.reduce(
      (total, course) => total + course.price,
      0
    );
    const taxes = coursePrice * 0.18; // 18% GST
    const totalPayable = coursePrice + taxes;

    // Convert to paisa (Razorpay uses smallest currency unit)
    const amountInPaisa = Math.round(totalPayable * 100);

    // Generate a unique receipt ID
    const receipt = `receipt_${Date.now()}`;

    // Make a request to Razorpay API to create an order
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Use Basic Auth with your Razorpay API key and secret
        Authorization: `Basic ${Buffer.from(
          `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountInPaisa,
        currency: "INR",
        receipt: receipt,
        payment_capture: 1, // Auto-capture payment
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create Razorpay order");
    }

    const orderData = await response.json();

    return {
      id: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      receipt: orderData.receipt,
    };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Payment initialization failed");
  }
}

export async function verifyPayment(
  paymentId: string,
  orderId: string,
  signature: string
) {
  try {
    // Create a HMAC SHA256 hash
    const crypto = require("crypto");
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    // Verify that the generated signature matches the signature from Razorpay
    const isAuthentic = generatedSignature === signature;

    if (!isAuthentic) {
      throw new Error("Payment verification failed");
    }

    // If verification is successful, you can update your database here
    // For example, mark the order as paid, create a receipt, etc.

    return { success: true };
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw new Error("Payment verification failed");
  }
}
