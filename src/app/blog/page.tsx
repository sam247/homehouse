import type { Metadata } from "next";
import Link from "next/link";
import { AuthorStrip } from "@/components/AuthorStrip";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { getGuidePosts, getJournalPosts } from "@/lib/blog";

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
    description: "Planning guides for Norfolk retreats and countryside stays, plus journal notes from the homestead.",
    alternates: { canonical },
    openGraph: {
      title: "Blog",
      description: "Planning guides for Norfolk retreats and countryside stays, plus journal notes from the homestead.",
      url: canonical,
    },
  };
}

function PostGrid({ posts }: { posts: Awaited<ReturnType<typeof getGuidePosts>> }) {
  if (posts.length === 0) {
    return <p className="text-foreground/70 font-light">Nothing here yet.</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <article key={p.slug} className="reveal border border-border overflow-hidden">
          {p.coverImage && (
            <div className="aspect-[16/9] border-b border-border bg-foreground/5">
              <img src={p.coverImage} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-8 md:p-10">
            <h3 className="font-serif text-2xl md:text-3xl leading-tight">
              <Link href={`/blog/${p.slug}`} className="hover:text-accent transition-colors">
                {p.title}
              </Link>
            </h3>
            {p.excerpt && <p className="mt-4 text-foreground/75 font-light">{p.excerpt}</p>}
            <div className="mt-8">
              <Link
                href={`/blog/${p.slug}`}
                className="inline-flex items-center justify-center border border-border bg-foreground text-background px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
              >
                Read guide
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function BlogIndexPage() {
  const [guides, journal] = await Promise.all([getGuidePosts(), getJournalPosts()]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Guides and journal notes from the homestead."
        intro="Practical planning guides sit alongside personal reflections from Home House Homestead in rural Norfolk."
      />
      <Band variant="cream">
        <Section>
          <div className="mb-12 reveal max-w-3xl text-foreground/75 font-light leading-relaxed">
            Looking for a place to start? Explore our main{" "}
            <Link href="/retreats" className="text-accent hover:underline">
              retreats in Norfolk
            </Link>{" "}
            page, compare{" "}
            <Link href="/norfolk-holidays" className="text-accent hover:underline">
              quieter Norfolk holidays
            </Link>
            , or browse the guides below for solo retreats, women&apos;s retreats, and countryside stay planning.
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">Planning guides</h2>
              <PostGrid posts={guides} />
            </div>

            {journal.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">Journal</h2>
                <p className="mb-8 max-w-3xl text-foreground/75 font-light leading-relaxed">
                  Personal reflections written by Hawa Hummingbird — experiential notes from life at the homestead,
                  separate from the practical guides above.
                </p>
                <PostGrid posts={journal} />
              </div>
            )}
          </div>

          <div className="mt-12">
            <AuthorStrip />
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
