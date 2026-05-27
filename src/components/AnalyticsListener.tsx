"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { gaPageView } from "@/lib/analytics/ga4";

export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!pathname) return;
    const pagePath = search ? `${pathname}?${search}` : pathname;
    gaPageView(pagePath);
  }, [pathname, search]);

  return null;
}

