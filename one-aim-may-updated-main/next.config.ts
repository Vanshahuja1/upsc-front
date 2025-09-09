import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.theoneaim.co.in',
        
        pathname: '/storage/**',
      },
    ],
    unoptimized: true, // Disables Next.js image optimization
  },
  env: {
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_TOKEN,
    NEXT_PUBLIC_IMAGE_BASE: process.env.NEXT_PUBLIC_IMAGE_BASE,
  },
};

export default nextConfig;
