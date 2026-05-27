import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics/ga4";

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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} />
        <Script id="ga4">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}', { send_page_view: false });`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
