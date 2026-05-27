import type { ReactNode } from "react";
import { AvailabilityStudioLayout } from "@/components/admin/AvailabilityStudioLayout";

export default async function Layout({ children }: { children: ReactNode }) {
  return <AvailabilityStudioLayout>{children}</AvailabilityStudioLayout>;
}

