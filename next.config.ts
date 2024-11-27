import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"], // Add the hostname for external images
  },
};

export default nextConfig;
