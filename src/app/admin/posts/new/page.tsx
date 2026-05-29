import { PostEditor } from "@/components/admin/PostEditor";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="w-full">
      <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">New</div>
      <h1 className="mt-3 font-serif text-4xl leading-tight">Post</h1>
      <PostEditor action={`${ADMIN_ENTRY_PATH}/posts/create`} />
    </div>
  );
}
