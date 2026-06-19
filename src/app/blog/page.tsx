import type { Metadata } from "next";
import Link from "next/link";
import { AuthorStrip } from "@/components/AuthorStrip";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { getPostsPage } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const sp = (await searchParams) ?? {};
  const page = Number(sp.page ?? "1");
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const canonical = safePage > 1 ? `/blog?page=${safePage}` : "/blog";

  return {
    title: "Blog",
    description: "Notes from the homestead: stays, retreats, seasonal living, and quiet reflections.",
    alternates: { canonical },
    openGraph: {
      title: "Blog",
      description: "Notes from the homestead: stays, retreats, seasonal living, and quiet reflections.",
      url: canonical,
    },
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const page = Number(sp.page ?? "1");
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const pageSize = 15;
  const { posts, hasMore } = await getPostsPage({ page: safePage, pageSize });

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Notes from the homestead."
        intro="Search-led guides, seasonal notes, and practical articles on retreats, stays, and slower countryside living."
      />
      <Band variant="cream">
        <Section>
          <div className="mb-12 reveal max-w-3xl text-foreground/75 font-light leading-relaxed">
            Looking for a place to start? Explore our main{" "}
            <Link href="/retreats" className="text-accent hover:underline">
              retreats in Norfolk
            </Link>{" "}
            page or browse the guides below for solo retreats, women&apos;s retreats, and countryside stay planning.
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="reveal border border-border overflow-hidden">
                {p.coverImage && (
                  <div className="aspect-[16/9] border-b border-border bg-foreground/5">
                    <img src={p.coverImage} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-8 md:p-10">
                  <h2 className="font-serif text-2xl md:text-3xl leading-tight">
                    <Link href={`/blog/${p.slug}`} className="hover:text-accent transition-colors">
                      {p.title}
                    </Link>
                  </h2>
                  {p.excerpt && <p className="mt-4 text-foreground/75 font-light">{p.excerpt}</p>}
                  <div className="mt-8">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center justify-center border border-border bg-foreground text-background px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {posts.length === 0 && <p className="text-foreground/70 font-light">No posts yet.</p>}
          </div>

          {hasMore && (
            <div className="mt-14 flex justify-center">
              <Link
                href={`/blog?page=${safePage + 1}`}
                className="border border-border bg-background px-6 py-4 text-xs uppercase tracking-[0.25em] text-foreground/80 hover:border-accent hover:text-foreground transition-colors"
              >
                Read more
              </Link>
            </div>
          )}

          <div className="mt-12">
            <AuthorStrip />
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
