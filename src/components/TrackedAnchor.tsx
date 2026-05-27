"use client";

import type { ComponentPropsWithoutRef } from "react";
import { gaEvent } from "@/lib/analytics/ga4";

export function TrackedAnchor({
  href,
  event,
  params,
  onClick,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  event: string;
  params?: Record<string, string | number | boolean | null | undefined>;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        gaEvent(event, params);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
