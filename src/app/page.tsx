import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Section, Zigzag } from "@/components/PageShell";
import { HeroVideo } from "@/components/HeroVideo";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Testimonials } from "@/components/Testimonials";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPostsPage } from "@/lib/blog";
import { REVIEWS } from "@/lib/reviews";
import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";

const IMG = {
  house: "https://images.squarespace-cdn.com/content/v1/65b8fafefbcaa00609260091/06fd4543-bca8-49c6-a18c-477e7be6d903/BFF79E36-7628-446B-93E5-C9F4337EE353.jpg",
  interior1: "/photos/shed-bench.webp",
  garden: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
};

export const metadata: Metadata = {
  title: {
    absolute: "Wellness Retreat & Countryside Stay in Norfolk | Home House Homestead",
  },
  description:
    "Escape to a peaceful wellness retreat in Norfolk. Enjoy bespoke countryside stays, nature, quiet reflection and restorative experiences at Home House Homestead.",
  openGraph: {
    title: "Wellness Retreat & Countryside Stay in Norfolk | Home House Homestead",
    description:
      "Escape to a peaceful wellness retreat in Norfolk. Enjoy bespoke countryside stays, nature, quiet reflection and restorative experiences at Home House Homestead.",
    images: [IMG.house],
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

const offers = [
  "A character-filled flint farmhouse rooted in slower living",
  "Quiet gardens, open fields, and wild edges to wander",
  "Simple comforts, calm rooms, and space to read, rest, and breathe",
  "Optional 1-to-1 sessions on request (Sufi Healing and mentorship, breathwork, bodywork, sound bathing)",
  "A personal welcome for solo guests, couples, families and small groups",
];

const FAQ = [
  {
    q: "What is Home House Homestead?",
    a: "Home House Homestead is a peaceful countryside guest house and homestead in rural Norfolk. It’s a calm place for bespoke stays and quiet retreats, with personal hosting and space to slow down in nature.",
  },
  {
    q: "Is Home House Homestead suitable for solo retreats?",
    a: "Yes. Many guests come for solo retreats and quiet reflection. Stays are unhurried and flexible, with plenty of time for walking, reading, resting, and being outdoors.",
  },
  {
    q: "How far is the homestead from Norwich?",
    a: "We’re based in rural Norfolk, with Norwich as the nearest major city and rail hub. Travel time varies by route, and we’ll share clear directions and arrival details once you enquire.",
  },
  {
    q: "What can I expect during my stay?",
    a: "A warm farmhouse atmosphere, quiet rooms, and time in the gardens and surrounding countryside. Your stay is bespoke: you can keep it simple and restful, or request optional meals and 1-to-1 sessions.",
  },
  {
    q: "Can I book a peaceful countryside retreat in Norfolk?",
    a: "Yes. You can book a bespoke countryside stay at the homestead, and you can also explore scheduled retreats and gatherings when available. The best next step is to send a stay enquiry with your dates.",
  },
  {
    q: "Is Home House Homestead open year-round?",
    a: "Stays are available across much of the year, subject to availability and seasonal scheduling. If you’re planning a particular season, please enquire and we’ll confirm what’s possible for your dates.",
  },
] as const;

export default async function HomePage() {
  const { posts } = await getPostsPage({ page: 1, pageSize: 3 });
  const SITE_URL = getSiteUrl();
  const BUSINESS_ID = `${SITE_URL}/#homehouse-homestead`;

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      ...REVIEWS.slice(0, 5).map((r, idx) => ({
        "@type": "Review",
        "@id": `${SITE_URL}/#review-${idx + 1}`,
        itemReviewed: { "@id": BUSINESS_ID },
        author: { "@type": "Person", name: r.name },
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.text,
      })),
    ],
  };

  return (
    <PageShell>
      <SeoJsonLd data={homeJsonLd} />
      <HeroVideo />
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Section className="text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--clay)] mb-6 reveal">
            Welcome
          </p>
          <p className="font-serif text-4xl md:text-5xl leading-tight reveal">
            Slow down, reconnect with nature, and enjoy a peaceful countryside retreat in rural Norfolk.
          </p>
          <p className="mt-8 text-lg font-light text-[var(--deep)]/80 leading-relaxed reveal">
            Home House Homestead offers bespoke stays and restorative retreats designed to help you
            rest, recharge, and return home refreshed.
          </p>
          <p className="mt-6 text-lg font-light text-[var(--deep)]/80 leading-relaxed reveal">
            A home away from home.
          </p>
          <p className="mt-2 text-lg font-light text-[var(--deep)]/80 leading-relaxed reveal">
            A place to remember the home that lives within your heart.
          </p>
        </Section>
      </div>
      <div className="bg-background text-foreground">
        <Zigzag
          eyebrow="What we offer"
          title="A Homestead, Not a Hotel"
          image={IMG.house}
          body={
            <>
              <p>
                A home away from home where you can be cared for and deeply nourished as you remember that
                true home lives within the heart.
              </p>
              <ul className="space-y-3 mt-6">
                {offers.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="text-accent mt-2 w-4 h-px shrink-0" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </>
          }
        />
      </div>
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Zigzag
          reverse
          eyebrow="Stays and retreats"
          title="Wellness Retreats & Countryside Stays"
          image={IMG.garden}
          body={
            <>
              <p>
                A gentle invitation to step away from the busyness of everyday life for a peaceful bespoke
                countryside stay or small wellness retreat designed to help you slow down, rest deeply,
                reconnect with nature, and remember the feeling of home within yourself.
              </p>
              <p>
                Whether you&apos;re seeking solitude, creative space, quiet reflection, or simply a few days
                of being cared for, you&apos;ll find a warm welcome waiting for you here in the Norfolk
                countryside.
              </p>
              <p>
                You can enquire about a peaceful countryside retreat for yourself, or explore our{" "}
                <Link href="/events-and-workshops" className="text-accent hover:underline">
                  retreats and workshops in Norfolk
                </Link>{" "}
                when scheduled.
              </p>
              <p>
                For accommodation details, see{" "}
                <Link href="/stays" className="text-accent hover:underline">
                  bespoke countryside stays at the homestead
                </Link>{" "}
                or{" "}
                <Link href="#stay-enquiry" className="text-accent hover:underline">
                  send a stay enquiry
                </Link>{" "}
                and we’ll reply personally.
              </p>
            </>
          }
        />
      </div>
      <div className="bg-background text-foreground">
        <Section>
          <div className="max-w-3xl mx-auto text-center reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Why guests choose us</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Why Guests Choose Home House Homestead
            </h2>
            <p className="mt-6 text-foreground/75 font-light leading-relaxed">
              More than a place to stay, Home House offers a personal welcome, a slower pace, space to rest,
              reconnect, and remember the feeling of home within yourself.
            </p>
            <p className="mt-4 text-foreground/75 font-light leading-relaxed">
              Guests often arrive seeking rest and leave feeling nourished, grounded, and renewed.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
            <ul className="reveal grid gap-3 text-foreground/85 font-light">
              {[
                "Peaceful rooms and unhurried mornings",
                "Gardens, open fields, and space to reconnect with nature",
                "Home-cooked meals prepared with love and care",
                "A welcoming setting for solo retreats, creative retreats and quiet getaways",
                "Space to slow down, exhale fully, reflect, and simply be",
                "Many guests return for the sense of home, connection, and ease they find here",
              ].map((p) => (
                <li key={p} className="border-b border-border pb-3">
                  {p}
                </li>
              ))}
            </ul>
            <div className="reveal space-y-4 text-foreground/75 font-light leading-relaxed">
              <p>
                Read more in our{" "}
                <Link href="/reviews" className="text-accent hover:underline">
                  guest reviews
                </Link>{" "}
                or get in touch via our{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  contact page
                </Link>{" "}
                if you’d like help choosing dates.
              </p>
              <p>
                If you’ve stayed before, mention it in your enquiry — we’ll do our best to help you
                find the right window for a return visit.
              </p>
            </div>
          </div>
        </Section>
      </div>
      <Testimonials headingTag="h3" />
      <div className="bg-[var(--cream)] text-[var(--deep)]">
        <Zigzag
          eyebrow="Local area"
          title="Explore the Norfolk Countryside"
          image={IMG.interior1}
          body={
            <>
              <p>
                Home House Homestead is set in rural Norfolk — ideal for quiet walks, big skies, and
                time close to wildlife. Many guests explore the{" "}
                <strong className="font-normal">Norfolk Broads</strong>, coastal walks, and local
                villages during their stay.
              </p>
              <p>
                For inspiration, browse our{" "}
                <Link href="/blog" className="text-accent hover:underline">
                  journal notes from the homestead
                </Link>{" "}
                or take a look at the{" "}
                <Link href="/gallery" className="text-accent hover:underline">
                  photo gallery
                </Link>{" "}
                before you arrive.
              </p>
            </>
          }
        />
      </div>
      <div className="bg-[var(--sage)] text-[var(--deep)]">
        <Section className="py-14 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--clay)] mb-4">
                Retreats
              </p>
              <p className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl">
                Planning a retreat in Norfolk?
              </p>
              <p className="mt-5 text-[var(--deep)]/80 font-light max-w-2xl leading-relaxed">
                Explore upcoming retreats and restorative gatherings at Home House Homestead.
              </p>
            </div>
            <Button
              asChild
              className="rounded-none bg-[var(--deep)] text-[var(--cream)] hover:bg-[var(--clay)] hover:text-[var(--cream)] h-12 px-8 font-light tracking-[0.18em] uppercase text-xs"
            >
              <Link href="/events-and-workshops">Book a retreat</Link>
            </Button>
          </div>
        </Section>
      </div>
      <div className="bg-[var(--cream)] text-[var(--deep)] border-y border-border">
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--clay)] mb-4">Journal</p>
              <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                Notes from the homestead.
              </h3>
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
      <div className="bg-background text-foreground border-y border-border">
        <Section className="py-20 md:py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 reveal">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/75 font-light leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
      </div>
      <section id="stay-enquiry" className="bg-background">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="font-serif text-4xl md:text-5xl reveal text-foreground">
            Come and have a bespoke stay tailored for you.
          </p>
          <p className="mt-6 text-foreground/75 font-light reveal">
            For individuals, small groups and families. We reply personally.
          </p>
          <div className="mt-10 reveal">
            <EnquiryDrawer
              source="home_bespoke_cta"
              trigger={
                <Button className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                  Send a stay enquiry
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
