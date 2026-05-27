import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Section, Zigzag } from "@/components/PageShell";
import { HeroVideo } from "@/components/HeroVideo";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { getPostsPage } from "@/lib/blog";

const IMG = {
  house: "https://images.squarespace-cdn.com/content/v1/65b8fafefbcaa00609260091/06fd4543-bca8-49c6-a18c-477e7be6d903/BFF79E36-7628-446B-93E5-C9F4337EE353.jpg",
  interior1: "/photos/shed-bench.webp",
  garden: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
  table: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
};

export const metadata: Metadata = {
  title: "Home House Homestead — A peaceful Norfolk guest house",
  description:
    "A peaceful countryside guest house in the heart of Norfolk. Stays, retreats and workshops to help you slow down, rest and reconnect.",
  openGraph: {
    title: "Home House Homestead",
    description: "Home is in your heart. A peaceful Norfolk homestead for rest and reconnection.",
    images: [IMG.house],
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

const offers = [
  "A warm, character-filled flint farmhouse dating from the 1800s",
  "Peaceful gardens, open fields, and wild spaces to explore",
  "An experience of simple living, returning to what is essential",
  "Optional home-cooked meals with organic, seasonal produce",
  "Optional 1-to-1 sessions: Sufi healing, bodywork, breathwork, sound",
  "A welcoming space for solo guests, couples, families and small groups",
];

export default async function HomePage() {
  const { posts } = await getPostsPage({ page: 1, pageSize: 3 });

  return (
    <PageShell>
      <HeroVideo />
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Section className="text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            Welcome
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            A space to breathe, slow down, and return to yourself.
          </h2>
          <p className="mt-8 text-lg font-light text-[var(--deep)]/80 leading-relaxed reveal">
            Rooted in simplicity and a symbiotic relationship with the earth and the natural
            world, we gently move towards self-sufficiency and sustainability. A quiet sense
            of connection, stillness, rest, and time to simply be.
          </p>
        </Section>
      </div>
      <div className="bg-background text-foreground">
        <Zigzag
          eyebrow="What we offer"
          title="A homestead, not a hotel."
          image={IMG.house}
          body={
            <ul className="space-y-3">
              {offers.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="text-accent mt-2 w-4 h-px shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          }
        />
      </div>
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Zigzag
          reverse
          eyebrow="The experience"
          title="Wake to birdsong. Walk under the open sky."
          image={IMG.garden}
          body={
            <>
              <p>
                Wake to birdsong. Walk barefoot on the earth. Warm yourself in the first
                sunbeams under the open sky. Or simply curl up with a cup of tea and rest.
              </p>
              <p>Here, you are free to follow your own rhythm.</p>
            </>
          }
        />
      </div>
      <Testimonials />
      <div className="bg-background text-foreground">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Perfect for</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Quiet, intentional time.
              </h2>
            </div>
            <ul className="reveal grid gap-3 text-foreground/85 font-light">
              {[
                "Rest and renewal",
                "Slowing down and stepping out of the city",
                "Nature lovers and countryside escapes",
                "Those needing quiet, ease and calm",
                "Solo retreats and quiet reflection",
                "Sufi-spirit gatherings",
                "Time alone or shared with loved ones",
                "Creative or writing retreats",
                "Gentle reconnection with nature and self",
              ].map((p) => (
                <li key={p} className="border-b border-border pb-3">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>
      <div className="bg-[var(--cream)] text-[var(--deep)] border-y border-border">
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--clay)] mb-4">Journal</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Notes from the homestead.
              </h2>
              <p className="mt-5 text-[var(--deep)]/80 font-light max-w-xl">
                Occasional reflections, seasonal notes, and quiet updates.
              </p>
            </div>
            <Button
              asChild
              className="rounded-none bg-[var(--deep)] text-[var(--cream)] hover:bg-[var(--clay)] hover:text-[var(--cream)] h-12 px-8 font-light tracking-[0.18em] uppercase text-xs"
            >
              <Link href="/blog">Visit the blog</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <article key={p.slug} className="reveal border border-border overflow-hidden bg-background text-foreground">
                {p.coverImage && (
                  <div className="aspect-[16/9] border-b border-border bg-foreground/5">
                    <img src={p.coverImage} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="font-serif text-2xl leading-tight">
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
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            {posts.length === 0 && (
              <div className="reveal border border-border bg-background text-foreground p-8 md:col-span-3">
                <div className="font-serif text-2xl leading-tight">Coming soon.</div>
                <p className="mt-4 text-foreground/75 font-light">
                  The first notes from the homestead will appear here once published.
                </p>
                <div className="mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center border border-border bg-foreground text-background px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
                  >
                    Visit the blog
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Section className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--clay)] mb-6 reveal">
            Hire the space
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight max-w-3xl mx-auto reveal">
            Hire the homestead for workshops, retreats, community and events.
          </h2>
          <div className="mt-12 grid sm:grid-cols-3 gap-6 reveal">
            {[IMG.interior1, IMG.garden, IMG.table].map((src, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden rounded-sm">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover kenburns" />
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button
              asChild
              className="rounded-none bg-[var(--deep)] text-[var(--cream)] hover:bg-[var(--clay)] hover:text-[var(--cream)] h-12 px-8 font-light tracking-[0.18em] uppercase text-xs"
            >
              <Link href="/events">Explore retreats & events</Link>
            </Button>
          </div>
        </Section>
      </div>
      <section className="bg-background border-y border-border">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="font-serif text-4xl md:text-5xl reveal text-foreground">
            Come and have a bespoke stay tailored for you.
          </h2>
          <p className="mt-6 text-foreground/75 font-light reveal">
            For individuals, small groups and families. We reply personally.
          </p>
          <div className="mt-10 reveal">
            <EnquiryDrawer
              trigger={
                <Button className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                  Begin an enquiry
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
