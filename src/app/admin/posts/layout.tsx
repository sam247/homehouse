import type { ReactNode } from "react";
import { PostsStudioLayout } from "@/components/admin/PostsStudioLayout";

export const dynamic = "force-dynamic";

export default async function AdminPostsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  return <PostsStudioLayout activeId={id}>{children}</PostsStudioLayout>;
}

