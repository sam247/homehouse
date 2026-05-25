import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminServer";
import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Blog</div>
            <h1 className="mt-3 font-serif text-4xl leading-tight">New post</h1>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
          >
            Back
          </Link>
        </div>

        <PostEditor action="/admin/posts/create" />
      </div>
    </main>
  );
}
