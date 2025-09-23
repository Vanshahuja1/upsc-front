"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get email from URL parameters
    const emailParam = searchParams.get('email');
    
    if (emailParam) {
      setEmail(emailParam);
    }
    
    // If no email is provided, redirect to login
    if (!emailParam) {
      router.push('/auth/login');
    }
  }, [searchParams, router]);

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!otp || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://admin.theoneaim.co.in/api/v1/auth/password/reset-otp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-api-key": "ak_y6d4lk60QIrkdu23knAdJLeyabdEerT5",
        },
        body: JSON.stringify({
          email,
          otp,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        console.log("Password reset successful:", data);
        // Redirect to login after success
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex md:flex-row h-full">
        {/* Left Form Section */}
        <div className="lg:w-[50%] xl:w-[40%] 2xl:w-[60%] w-full flex flex-col justify-center px-6 sm:px-12 md:px-28 py-10 relative">
          {/* Logo */}
          <div className="absolute top-0 bottom-8 left-8">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="w-32 h-32 object-contain"
            />
          </div>

          <h1 className="text-3xl text-center font-bold mb-8">
            Reset Your Password
          </h1>

          {/* Success/Error Messages */}
          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Email Display */}
          {email && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
              <p className="text-sm">Resetting password for: <strong>{email}</strong></p>
              <p className="text-xs mt-1">Enter the OTP sent to your email and your new password below.</p>
            </div>
          )}

          {/* Reset Password Form */}
          <form onSubmit={handleResetPassword} className="space-y-6">
            <input
              type="text"
              placeholder="Enter OTP from email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
              required
              maxLength={6}
            />
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-7 pr-12 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full pl-7 pr-12 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-[#961313] hover:bg-black text-white transition-all duration-500 px-7 py-3 w-full rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-[#961313] hover:text-[#FF7B07] transition-colors underline"
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Right Image Section - hidden on mobile */}
        <div className="hidden lg:block lg:w-[50%] xl:w-[60%] 2xl:w-[50%] h-full">
          <img
            src="/images/auth/login-image.png"
            alt="Reset Password"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}