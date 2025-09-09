"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Validation
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!name || !username || !email || !password || !mobile) {
        setError("All fields are required for registration");
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          mobile,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setMessage("Registration successful! You can now login.");
        console.log("Registration successful:", data);
        console.log("User data:", data.user);
        
        // Clear form after successful registration
        setTimeout(() => {
          setName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setMobile("");
          setMessage("");
        }, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Registration error:", err);
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
            Create an Account
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

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-7 py-4 border border-[#FF7B07] rounded-full focus:border-[#ff7b0775] focus:outline-none focus:ring-0 transition-colors duration-200"
              required
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#961313] hover:bg-black text-white transition-all duration-500 px-7 py-3 w-full rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="underline text-[#961313] hover:text-[#FF7B07] transition-colors"
            >
              Login
            </a>
          </p>
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