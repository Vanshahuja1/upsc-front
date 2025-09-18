"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import PButton from "@/components/common/PButton";
import { toast } from "react-toastify";
import { OrderFormSchema } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";


const addressSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits"),
  email: z.string().email("Invalid email"),
  pin_code: z.string().min(5, "Pincode is required"),
  address: z.string().min(5, "Address is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  additionalInfo: z.string().optional(),
  country: z.string().min(2, "Country is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;
const AddressPage = () => {
  const { courses } = useCartStore();
  const router = useRouter();

  // Get default values from user data
  const getUserDefaultValues = (): Partial<AddressFormData> => {
    try {
      const userDataString = localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        return {
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.mobile || userData.phone || "",
          country: "India",
        };
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return {
      country: "India",
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: getUserDefaultValues(),
  });

  const onSubmit = async (data: AddressFormData) => {
  try {
    console.log("Form data submitted:", data);
    
    // Get user ID from localStorage
    const userDataString = localStorage.getItem('user');
    if (!userDataString) {
      toast.error("User not logged in. Please login first.");
      return;
    }
    
    const userData = JSON.parse(userDataString);
    const userId = userData.id;
    
    if (!userId) {
      toast.error("User ID not found. Please login again.");
      return;
    }
    
    console.log("Raw cart courses:", courses);
    
    // ✅ Enhanced filtering with validation
    const course_slugs = courses
      .filter((c) => c.type === "course" && c.slug && typeof c.slug === 'string' && c.slug.trim() !== "")
      .map((c) => c.slug.trim());
      
    const test_series_slugs = courses
      .filter((c) => c.type === "test_series" && c.slug && typeof c.slug === 'string' && c.slug.trim() !== "")
      .map((c) => c.slug.trim());

    // ✅ Validate we have at least some courses
    if (course_slugs.length === 0 && test_series_slugs.length === 0) {
      toast.error("No valid courses found in cart");
      return;
    }

    // Create payload with frontend_user_id and all required fields
    const payload = {
      frontend_user_id: userId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      pin_code: data.pin_code,
      city: data.city,
      state: data.state,
      country: data.country,
      course_slugs: course_slugs,
      test_series_slugs: test_series_slugs,
      promo_code_applied: null,
      discount_amount: 0
    };

    // ✅ Debug logging
    console.log("Final payload:", JSON.stringify(payload, null, 2));
    console.log("Course slugs count:", course_slugs.length);
    console.log("Test series slugs count:", test_series_slugs.length);

    // Get user token for authorization
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      toast.error("Authentication token not found. Please login again.");
      return;
    }

    const response = await axios.post<OrderFormSchema>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-api-key": "ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    console.log("Order submitted:", response.data);
    toast.success("Order placed successfully!");
    router.push("/cart/payment");
    
  } catch (error: any) {
    console.error("Failed to submit order:", error.response?.data || error);
    
    // ✅ Better error logging
    if (error.response?.data?.errors) {
      console.log("Validation errors:", error.response.data.errors);
      
      // Log specific field errors
      Object.keys(error.response.data.errors).forEach(field => {
        console.log(`${field}:`, error.response.data.errors[field]);
      });
    }
    
    toast.error(
      error.response?.data?.message ||
        "Failed to submit form. Please try again."
    );
  }
};
  return (
    <div className="min-h-screen bg-[#FFF7F0] px-4 md:px-8 lg:px-16 py-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-xl font-semibold mb-6">
          Add Your Delivery Address
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg p-6 md:p-8 shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name*
              </label>
              <input
                {...register("name")}
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number*
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address*
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Pincode*
              </label>
              <input
                {...register("pin_code")}
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.pin_code && (
                <p className="text-red-500 text-sm">
                  {errors.pin_code.message}
                </p>
              )}
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Address*
              </label>
              <input
                {...register("address")}
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                State*
              </label>
              <input
                {...register("state")}
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                City*
              </label>
              <input
                {...register("city")}
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Country*
              </label>
              <input
                {...register("country")}
                className="w-full p-3 border border-gray-200 bg-[#CDCDCD]/20 rounded-md focus:ring-[#FF7B07]"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex sm:justify-end max-sm:justify-center mt-6">
            <PButton type="submit" disabled={!isValid}>
              Proceed
            </PButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
