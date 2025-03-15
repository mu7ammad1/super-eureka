import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tjdtfpzcspfqgtoqpckp.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/*/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**", // لتغطية صور بروفايل Google
      },
    ],
  },
};

export default nextConfig;