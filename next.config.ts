import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <-- Dodaj tę linijkę tutaj
  images: {
    unoptimized: true, // <-- BARDZO WAŻNE DLA EXPORTU NA ZWYKŁY HOSTING
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;