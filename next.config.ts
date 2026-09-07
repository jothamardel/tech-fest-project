import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        // Vercel Blob CDN (legacy images still referenced in some components)
        protocol: "https",
        hostname: "77iiucovgsphsggt.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        // Google Drive HD photos (shared folder)
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/d/**",
      },
    ],
  },
};

export default nextConfig;
