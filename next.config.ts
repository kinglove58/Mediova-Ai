import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "https://pcgyiujgndleayfmwmwm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
