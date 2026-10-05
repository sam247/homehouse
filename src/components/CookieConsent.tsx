"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent, loadAnalytics } from "@/lib/consent";
import { gaPageView } from "@/lib/analytics/ga4";

/**
 * Bottom-left cookie notice. Shown only until the visitor makes a choice;
 * analytics stays switched off until "Accept analytics" is pressed.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Runs after mount so the server-rendered HTML is never blocked by this.
    if (readConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const decide = (value: "granted" | "denied") => {
    writeConsent(value);
    if (value === "granted") {
      loadAnalytics();
      // gtag is configured with send_page_view:false, so record this first view
      // explicitly — otherwise the page the consent was given on is never counted.
      gaPageView(window.location.pathname + window.location.search);
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm border border-[var(--deep)]/20 bg-[var(--cream)] p-5 text-[var(--deep)] shadow-lg sm:bottom-6 sm:left-6"
    >
      <p className="font-serif text-lg leading-tight">Cookies</p>
      <p className="mt-2 text-sm font-light leading-relaxed text-[var(--deep)]/80">
        We use a small amount of analytics to understand which pages help people. Nothing is set until you choose.
        Read our{" "}
        <Link href="/privacy" className="text-[var(--clay)] underline hover:no-underline">
          privacy notice
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="border border-[var(--deep)] bg-[var(--deep)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--cream)] transition-colors hover:bg-[var(--clay)] hover:border-[var(--clay)]"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="border border-[var(--deep)]/30 px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-[var(--deep)]"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
