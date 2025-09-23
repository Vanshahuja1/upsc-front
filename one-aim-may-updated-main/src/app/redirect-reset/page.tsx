"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RedirectResetPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL parameters
    const email = searchParams.get('email');
    
    // Redirect to localhost reset page with email parameter
    const localUrl = `http://localhost:3000/reset-password${email ? `?email=${email}` : ''}`;
    
    // Show message and redirect
    console.log('Redirecting to:', localUrl);
    window.location.href = localUrl;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#961313] mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Redirecting...</h2>
        <p className="text-gray-600">Taking you to the password reset page</p>
        <p className="text-sm text-gray-500 mt-4">
          If you're not redirected automatically, 
          <a href="http://localhost:3000/reset-password" className="text-[#961313] underline ml-1">
            click here
          </a>
        </p>
      </div>
    </div>
  );
}