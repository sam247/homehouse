import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics/ga4";
import { SITE } from "@/lib/site";
import { getSiteUrl } from "@/lib/siteUrl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-next",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif-next",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = getSiteUrl();
const BUSINESS_ID = `${SITE_URL}/#homehouse-homestead`;
const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "LodgingBusiness"],
  "@id": BUSINESS_ID,
  name: SITE.name,
  url: SITE_URL,
  image: `${SITE_URL}${SITE.heroPoster}`,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Norfolk",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.instagram.com/homehouse888",
    "https://www.google.com/search?kgmid=%2Fg%2F11ywlljc6j&q=Home%20House%20Homestead",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Home House Homestead — Peaceful Norfolk Guest House & Retreats",
    template: `%s — ${SITE.name}`,
  },
  description:
    "A peaceful countryside guest house and homestead in the heart of Norfolk. Stays, retreats, workshops and events for those seeking rest and reconnection.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    images: [SITE.heroPoster],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE.heroPoster],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <SeoJsonLd data={BUSINESS_JSON_LD} />
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
