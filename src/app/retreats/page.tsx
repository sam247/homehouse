import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { RETREAT_PAGES } from "@/lib/retreatPages";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/fields.webp",
  table: "/photos/table-orchard.webp",
  pond: "/photos/pond.webp",
};

const faq = [
  {
    q: "What kinds of retreats do you offer at Home House Homestead?",
    a: "Home House Homestead offers scheduled women's retreats and events, as well as bespoke private retreats and slower restorative stays in the Norfolk countryside.",
  },
  {
    q: "Are these retreats suitable for solo guests?",
    a: "Yes. Many guests come alone for rest, reflection, healing, and time away from everyday life. Solo retreats are one of the best fits for the homestead.",
  },
  {
    q: "Do you offer retreat accommodation in Norfolk?",
    a: "Yes. Guests can stay on site in peaceful farmhouse rooms, with meals and a personal welcome. Some retreats are structured events, while others are tailored private stays.",
  },
  {
    q: "How do I choose between retreats, events, and stays?",
    a: "Choose a scheduled event if you want set dates and a shared theme. Choose a bespoke retreat if you want a more personal restorative stay. Choose stays if you mainly want accommodation and quiet time in the countryside.",
  },
] as const;

export const metadata: Metadata = {
  title: "Retreats in Norfolk | Women's, Solo & Private Retreats",
  description:
    "Explore women's retreats, solo retreats, private retreats, and restorative countryside stays at Home House Homestead in rural Norfolk.",
  openGraph: {
    title: "Retreats in Norfolk | Women's, Solo & Private Retreats",
    description:
      "Explore women's retreats, solo retreats, private retreats, and restorative countryside stays at Home House Homestead in rural Norfolk.",
    images: [IMG.hero],
    url: "/retreats",
  },
  alternates: {
    canonical: "/retreats",
  },
};

export default function RetreatsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/retreats`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Retreats", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <PageShell>
      <SeoJsonLd data={jsonLd} />
      <PageHero
        eyebrow="Retreats"
        title="Retreats in Norfolk for rest, reconnection, and slower living."
        intro="Explore women's retreats, solo retreats, private retreats, and restorative countryside stays at Home House Homestead."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div className="reveal space-y-6 text-foreground/80 font-light leading-relaxed">
              <p>
                Home House Homestead is a peaceful place for people seeking a retreat in Norfolk that feels personal,
                warm, and unhurried. Rather than a formal retreat centre, it is a lived-in homestead and guest house
                where rest, nature, and meaningful care sit at the centre of the experience.
              </p>
              <p>
                Some guests come for a scheduled women&apos;s retreat or event. Others come for a bespoke private retreat
                or a slower countryside stay with time to reflect, walk, read, and recover their own rhythm.
              </p>
              <p>
                If you already know the kind of stay you want, explore our{" "}
                <Link href="/stays" className="text-accent hover:underline">
                  guest house stays
                </Link>{" "}
                or browse{" "}
                <Link href="/events-and-workshops" className="text-accent hover:underline">
                  upcoming events and workshops
                </Link>
                . If you are also comparing quieter travel options, visit{" "}
                <Link href="/norfolk-holidays" className="text-accent hover:underline">
                  Norfolk holidays
                </Link>
                . If you want help deciding, send an enquiry and we&apos;ll guide you.
              </p>
            </div>

            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Best fit for</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                <li className="border-b border-border pb-3">Women seeking deep rest and reconnection</li>
                <li className="border-b border-border pb-3">Solo guests looking for a quiet retreat in Norfolk</li>
                <li className="border-b border-border pb-3">Small private groups wanting a bespoke countryside retreat</li>
                <li className="border-b border-border pb-3">Guests who prefer a personal homestead setting over a hotel</li>
              </ul>
              <div className="mt-8 grid gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/events-and-workshops">View scheduled retreats</Link>
                </Button>
                <EnquiryDrawer
                  source="retreats_page"
                  trigger={
                    <Button
                      variant="outline"
                      className="rounded-none border-foreground/30 bg-transparent"
                    >
                      Enquire about a private retreat
                    </Button>
                  }
                />
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="max-w-3xl reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Retreat types</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Choose the retreat shape that fits you best.</h2>
            <p className="mt-6 text-foreground/75 font-light leading-relaxed">
              This page brings together the main retreat formats people search for before booking with Home House
              Homestead.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {RETREAT_PAGES.map((item) => (
              <article key={item.slug} className="reveal border border-border p-8">
                <h3 className="font-serif text-2xl leading-tight">{item.navLabel}</h3>
                <p className="mt-4 text-foreground/75 font-light leading-relaxed">{item.metadataDescription}</p>
                <div className="mt-6">
                  <Link href={`/retreats/${item.slug}`} className="text-sm text-accent hover:underline">
                    Explore this retreat page
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 reveal text-sm font-light text-foreground/70">
            Want practical planning advice as well? Visit the{" "}
            <Link href="/blog" className="text-accent hover:underline">
              blog and retreat guides
            </Link>
            .
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">How it works</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">A slower, more personal retreat experience.</h2>
              <div className="mt-6 space-y-4 text-[var(--deep)]/80 font-light leading-relaxed">
                <p>
                  Retreats at Home House are shaped around quiet hospitality, nourishing meals, and time close to the
                  land. Depending on the format, your stay may include shared rest spaces, home-cooked food, gentle
                  practices, or 1-to-1 sessions by arrangement.
                </p>
                <p>
                  For scheduled dates and themed gatherings, visit{" "}
                  <Link href="/events-and-workshops" className="text-accent hover:underline">
                    Events & Workshops
                  </Link>
                  . For accommodation-led retreat stays, visit{" "}
                  <Link href="/stays" className="text-accent hover:underline">
                    Stays
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="reveal grid gap-4">
              <div
                className="aspect-[16/10] rounded-sm bg-cover bg-center"
                style={{ backgroundImage: `url(${IMG.table})` }}
              />
              <div
                className="aspect-[16/10] rounded-sm bg-cover bg-center"
                style={{ backgroundImage: `url(${IMG.pond})` }}
              />
            </div>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Retreat questions, answered simply.</h2>
          </div>
          <div className="mt-12 grid gap-6">
            {faq.map((item) => (
              <article key={item.q} className="reveal border border-border p-8">
                <h3 className="font-serif text-2xl leading-tight">{item.q}</h3>
                <p className="mt-4 text-foreground/75 font-light leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="text-center max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 reveal">Next step</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight reveal">
            Ready to plan a retreat in Norfolk?
          </h2>
          <p className="mt-6 text-[var(--deep)]/80 font-light leading-relaxed reveal">
            Tell us whether you want a scheduled retreat, a private retreat, or a restorative countryside stay and
            we&apos;ll point you in the right direction.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row reveal">
            <EnquiryDrawer
              source="retreats_bottom_cta"
              trigger={<Button className="rounded-none">Enquire now</Button>}
            />
            <Button asChild variant="outline" className="rounded-none border-foreground/30 bg-transparent">
              <Link href="/reviews">Read guest reviews</Link>
            </Button>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
