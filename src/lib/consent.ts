import { GA4_MEASUREMENT_ID } from "@/lib/analytics/ga4";

/**
 * Cookie/analytics consent.
 *
 * The choice is stored in localStorage rather than a cookie so that nothing at
 * all is written to the device before the visitor decides. Google Analytics is
 * only injected once consent has actually been granted.
 */

export const CONSENT_STORAGE_KEY = "hhh-cookie-consent";
export const CONSENT_EVENT = "hhh-consent-change";

export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Safari private mode and similar can throw on access.
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Ignore — the banner still closes for this session.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function analyticsLoaded() {
  return typeof document !== "undefined" && Boolean(document.getElementById("ga4-script"));
}

/** Injects gtag.js. Safe to call repeatedly. */
export function loadAnalytics() {
  if (typeof window === "undefined") return;
  if (analyticsLoaded()) return;

  window.dataLayer = window.dataLayer || [];
  const gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });
}

/** Loads Analytics if (and only if) the visitor previously accepted. */
export function loadAnalyticsIfConsented() {
  if (readConsent() === "granted") loadAnalytics();
}
