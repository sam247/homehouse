declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA4_MEASUREMENT_ID = "G-9X8N3NVR1B";

export function gaEvent(
  name: string,
  params?: Record<string, string | number | boolean | null | undefined>,
) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  window.gtag("event", name, params ?? {});
}

export function gaPageView(pagePath: string) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}
