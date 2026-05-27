"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { gaEvent } from "@/lib/analytics/ga4";

export function TrackedLink({
  event,
  params,
  onClick,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  event: string;
  params?: Record<string, string | number | boolean | null | undefined>;
}) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        gaEvent(event, params);
        onClick?.(e);
      }}
    />
  );
}

