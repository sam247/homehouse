import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9X8N3NVR1B" />
        <Script id="ga4">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9X8N3NVR1B');`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
