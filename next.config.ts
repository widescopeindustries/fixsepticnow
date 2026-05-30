import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.veteranownedbusiness.com" },
    ],
  },
};

export default nextConfig;
