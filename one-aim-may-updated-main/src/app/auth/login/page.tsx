"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("login"); // "login", "forgot", "reset"

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        console.log("Login successful:", data);
        console.log("User data:", data.user);
        console.log("Token:", data.token);
        
        // Save user data and token to localStorage
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        
        // You can redirect user here or handle success as needed
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email. Please check your inbox.");
        console.log("Forgot password successful:", data);
        // Move to reset step if token is provided, or stay on forgot step
        if (data.reset_token) {
          setResetToken(data.reset_token);
          setStep("reset");
        }
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!newPassword || !confirmNewPassword) {
      setError("Please fill in both password fields");
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token: resetToken,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! You can now login with your new password.");
        console.log("Password reset successful:", data);
        // Reset form and go back to login
        setTimeout(() => {
          setStep("login");
          setNewPassword("");
          setConfirmNewPassword("");
          setResetToken("");
          setMessage("");
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

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setResetToken("");
    setMessage("");
    setError("");
    setStep("login");
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
            {step === "login" && "Welcome Back"}
            {step === "forgot" && "Forgot Password"}
            {step === "reset" && "Reset Password"}
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

          {/* Login Form */}
          {step === "login" && (
            <div className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
              />
              
              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setStep("forgot")}
                  className="text-[#961313] hover:text-[#FF7B07] transition-colors text-sm underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="bg-[#961313] hover:bg-black text-white transition-all duration-500 px-7 py-3 w-full rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          )}

          {/* Forgot Password Form */}
          {step === "forgot" && (
            <div className="space-y-6">
              <p className="text-gray-600 text-center mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
              />
              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="bg-[#961313] hover:bg-black text-white transition-all duration-500 px-7 py-3 w-full rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("login")}
                  className="text-[#961313] hover:text-[#FF7B07] transition-colors underline"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Reset Password Form */}
          {step === "reset" && (
            <div className="space-y-6">
              <p className="text-gray-600 text-center mb-6">
                Enter your new password below.
              </p>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
                required
              />
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="bg-[#961313] hover:bg-black text-white transition-all duration-500 px-7 py-3 w-full rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[#961313] hover:text-[#FF7B07] transition-colors underline"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {step === "login" && (
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="underline text-[#961313] hover:text-[#FF7B07] transition-colors"
              >
                Sign Up
              </a>
            </p>
          )}
        </div>

        {/* Right Image Section - hidden on mobile */}
        <div className="hidden lg:block lg:w-[50%] xl:w-[60%] 2xl:w-[50%] h-full">
          <img
            src="/images/auth/login-image.png"
            alt="Bookshelf"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}