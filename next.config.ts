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
    ],
  },
};

export default nextConfig;