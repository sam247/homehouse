import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">New</div>
      <h1 className="mt-3 font-serif text-4xl leading-tight">Post</h1>
      <PostEditor action="/admin/posts/create" />
    </div>
  );
}
