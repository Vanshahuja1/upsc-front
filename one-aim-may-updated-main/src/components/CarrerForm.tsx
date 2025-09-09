"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";

// Zod schema for validation
export const careerSchema = z.object({
  job_opening_id: z.string().min(1, "Please select a job opening"),
  name: z.string().min(1, "Full name is required").max(255),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(1, "Phone number is required").max(20),
  location: z.string().max(255),
  qualifications: z.string().max(500),
  experience: z.string().max(255),
  message: z.string().max(255),
  resume: z
    .any()
    .refine((files) => files && files.length > 0 && files[0] instanceof File, {
      message: "Resume file is required",
    })
    .refine(
      (files) =>
        files &&
        files.length > 0 &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
          "image/gif",
        ].includes(files[0].type),
      { message: "Only PDF, DOC, DOCX, or image files are allowed" }
    )
    .refine(
      (files) => files && files.length > 0 && files[0].size < 5 * 1024 * 1024,
      {
        message: "File size must be under 5MB",
      }
    ),
});

export type Career = z.infer<typeof careerSchema>;

interface CareerFormProps {
  jobOpenings: { id: number; designation: string }[];
}

const CareerForm = ({ jobOpenings }: CareerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumePreview, setResumePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Career>({
    resolver: zodResolver(careerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: Career) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("job_opening_id", data.job_opening_id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("location", data.location);
    formData.append("qualifications", data.qualifications);
    formData.append("experience", data.experience);
    formData.append("message", data.message);
    formData.append("resume", data.resume[0]);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/career-applications`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
        }
      );

      toast.success("Your application has been sent successfully!");
      reset();
      setResumePreview(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resumeFile = watch("resume");

  return (
    <form
      className="bg-white py-12 px-4 sm:px-8 md:px-12 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border-b border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border-b border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Phone<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full p-2 border-b border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full p-2 border-b border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            qualification
          </label>
          <input
            type="text"
            {...register("qualifications")}
            className="w-full p-2 border-b border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          />
          {errors.qualifications && (
            <p className="text-red-500 text-sm mt-1">
              {errors.qualifications.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Experience
          </label>
          <input
            type="text"
            {...register("experience")}
            className="w-full p-2 border-b border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          />
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">
              {errors.experience.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Message
          </label>
          <textarea
            {...register("message")}
            className="w-full p-2 border border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            rows={4}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Resume<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            {...register("resume")}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif"
            className="w-full p-2 border-b border-gray-300 text-gray-700"
            disabled={isSubmitting}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type.startsWith("image/")) {
                setResumePreview(URL.createObjectURL(file));
              } else {
                setResumePreview(null);
              }
            }}
          />
          {errors.resume && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.resume.message)}
            </p>
          )}

          {resumeFile?.length > 0 && !errors.resume && (
            <div className="mt-2">
              <p className="text-green-500 text-sm">
                File selected: {resumeFile[0].name} (
                {Math.round(resumeFile[0].size / 1024)} KB)
              </p>
              {resumeFile[0].type.startsWith("image/") && (
                <div className="mt-2 w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
                  <img
                    src={URL.createObjectURL(resumeFile[0])}
                    alt="Resume Preview"
                    className="w-full h-full object-cover"
                    onLoad={() =>
                      URL.revokeObjectURL(URL.createObjectURL(resumeFile[0]))
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Job Opening<span className="text-red-500">*</span>
          </label>
          <select
            {...register("job_opening_id")}
            className="w-full p-2 border border-gray-300 focus:border-[#FF7B07] focus:outline-none rounded-sm"
            disabled={isSubmitting}
          >
            <option value="">Select a job</option>
            {jobOpenings.map((job) => (
              <option key={job.id} value={job.id}>
                {job.designation}
              </option>
            ))}
          </select>
          {errors.job_opening_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.job_opening_id.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default CareerForm;
