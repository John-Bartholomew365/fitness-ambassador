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
    unoptimized: true,
  },
  serverExternalPackages: ['mongoose'],
  // DO NOT ADD htmlLimitedBots - this breaks Next.js 16
};

export default nextConfig;