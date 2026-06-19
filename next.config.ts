import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/events", destination: "/events-and-workshops", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/contact-1", destination: "/contact", permanent: true },
      { source: "/testimonials", destination: "/reviews", permanent: true },
      { source: "/hhh-mentorships", destination: "/retreats", permanent: true },
      { source: "/new-page", destination: "/retreats", permanent: true },
      { source: "/new-page-1", destination: "/community", permanent: true },
    ];
  },
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
