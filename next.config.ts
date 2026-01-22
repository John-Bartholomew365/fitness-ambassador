// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fitness-ambassador-api.onrender.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Consider adding this if you have issues with external images
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
};

export default nextConfig;