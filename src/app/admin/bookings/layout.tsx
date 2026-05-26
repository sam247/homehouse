import type { ReactNode } from "react";
import { BookingsStudioLayout } from "@/components/admin/BookingsStudioLayout";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id?: string }>;
}) {
  const p = (await params) ?? {};
  return <BookingsStudioLayout activeId={p.id}>{children}</BookingsStudioLayout>;
}

