import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home House Homestead — Peaceful Norfolk Guest House & Retreats",
  description:
    "A peaceful countryside guest house and homestead in the heart of Norfolk. Stays, retreats, workshops and events for those seeking rest and reconnection.",
  openGraph: {
    type: "website",
    siteName: "Home House Homestead",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
