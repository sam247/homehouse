import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/amanda", destination: "/admin" },
      { source: "/amanda/:path*", destination: "/admin/:path*" },
    ];
  },
  async headers() {
    const noIndex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/amanda", headers: noIndex },
      { source: "/amanda/:path*", headers: noIndex },
      { source: "/admin", headers: noIndex },
      { source: "/admin/:path*", headers: noIndex },
    ];
  },
};

export default nextConfig;
