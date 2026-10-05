import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SeoJsonLd } from "@/components/SeoJsonLd";
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
        {/*
          Marks the document as scripted so the .reveal scroll animation can be
          scoped to html.js. Without JavaScript the CSS leaves content visible
          rather than stuck at opacity:0.
          Google Analytics is deliberately not loaded here — it is injected by
          the consent banner once the visitor accepts.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
