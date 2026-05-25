import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Home House Homestead",
  description: "Notes from the homestead: stays, retreats, seasonal living, and quiet reflections.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Notes from the homestead."
        intro="Occasional reflections, seasonal notes, and updates."
      />
      <Section>
        <div className="grid gap-8 md:gap-10">
          {posts.map((p) => (
            <article key={p.slug} className="reveal border border-border p-8 md:p-10">
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                <Link href={`/blog/${p.slug}`} className="hover:text-accent transition-colors">
                  {p.title}
                </Link>
              </h2>
              {p.excerpt && <p className="mt-4 text-foreground/75 font-light">{p.excerpt}</p>}
              <div className="mt-6">
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-xs uppercase tracking-[0.25em] text-accent hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-foreground/70 font-light">No posts yet.</p>
          )}
        </div>
      </Section>
    </PageShell>
  );
}
