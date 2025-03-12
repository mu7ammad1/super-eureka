import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tjdtfpzcspfqgtoqpckp.supabase.co",
        port: "", // Leave empty unless using a custom port
        pathname: "/storage/v1/object/public/photos/**", // Adjust path as needed
      },
    ],
  },
};

export default nextConfig;
