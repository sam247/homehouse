export const dynamic = "force-dynamic";

export default function AdminPostsPage() {
  return (
    <div className="max-w-3xl">
      <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Blog</div>
      <h1 className="mt-3 font-serif text-4xl leading-tight">Write & publish</h1>
      <p className="mt-4 text-foreground/75 font-light leading-relaxed">
        Select a post on the left, or create a new one.
      </p>
    </div>
  );
}
