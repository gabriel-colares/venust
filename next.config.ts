import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
      {
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
