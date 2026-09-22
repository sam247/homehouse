import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/garden-magnolia.webp",
  table: "/photos/table-orchard.webp",
  fields: "/photos/fields.webp",
};

export const metadata: Metadata = {
  title: {
    absolute: "Retreat Venues in Norfolk | Home House Homestead",
  },
  description:
    "Book Home House Homestead as a small retreat venue in Norfolk — a peaceful flint farmhouse for intimate women's gatherings, private groups, and restorative countryside retreats.",
  openGraph: {
    title: "Retreat Venues in Norfolk | Home House Homestead",
    description:
      "Book Home House Homestead as a small retreat venue in Norfolk — a peaceful flint farmhouse for intimate women's gatherings, private groups, and restorative countryside retreats.",
    images: [IMG.hero],
    url: "/retreat-venues",
  },
  alternates: {
    canonical: "/retreat-venues",
  },
};

const suitedTo = [
  "Small women's retreats and rest gatherings",
  "Private groups of friends, sisters, or colleagues seeking a calm house setting",
  "Facilitators looking for an intimate Norfolk venue rather than a conference centre",
  "Guests who want accommodation, meals, and land access in one place",
];

const includes = [
  "Character-filled flint farmhouse rooms",
  "Shared and private spaces for gathering, rest, and conversation",
  "Gardens, fields, and quieter outdoor edges",
  "Home-cooked meals by arrangement",
  "Optional 1-to-1 therapies and healing sessions",
  "Personal hosting rather than anonymous venue hire",
];

const faq = [
  {
    q: "Is Home House a large retreat centre?",
    a: "No. Home House is an intimate homestead and guest house. It suits small groups who want a lived-in, personal setting rather than a purpose-built venue with multiple meeting halls.",
  },
  {
    q: "Can I hire the house as a retreat venue in Norfolk?",
    a: "Yes, for the right fit. We welcome small private retreats and gatherings by arrangement. Tell us your group size, dates, and what kind of stay you need.",
  },
  {
    q: "How many guests can you accommodate?",
    a: "Capacity depends on room setup and whether shared or private rooms are preferred. Enquire with your dates and we will confirm what is possible.",
  },
] as const;

export default function RetreatVenuesPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/retreat-venues`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Retreat Venues", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <PageShell>
      <SeoJsonLd data={jsonLd} />
      <PageHero
        eyebrow="Retreat Venues"
        title="A small retreat venue in Norfolk for intimate countryside gatherings."
        intro="Home House Homestead is a peaceful flint farmhouse venue for small women's retreats, private groups, and restorative stays — warmer and more personal than a standard hire space."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Many people searching for retreat venues in Norfolk want more than empty rooms and a catering menu.
                They want a place that already holds rest — gardens, a quieter pace, and a house that feels like a home
                rather than a centre.
              </p>
              <p>
                Home House Homestead offers that kind of setting. Guests stay on site, share meals, walk the land, and
                gather in a way that suits small groups who value atmosphere over scale.
              </p>
              <p>
                If you are planning a women&apos;s gathering, see{" "}
                <Link href="/womens-retreats" className="text-accent hover:underline">
                  Women&apos;s Retreats
                </Link>
                . For accommodation-led stays, visit{" "}
                <Link href="/stays" className="text-accent hover:underline">
                  Accommodation
                </Link>
                .
              </p>
            </div>
            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Best fit for</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                {suitedTo.map((item) => (
                  <li key={item} className="border-b border-border pb-3">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <EnquiryDrawer
                  source="retreat_venues"
                  trigger={<Button className="rounded-none w-full">Enquire about venue dates</Button>}
                />
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What the venue offers</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">A homestead, not a conference hall.</h2>
            </div>
            <ul className="reveal grid gap-3">
              {includes.map((item) => (
                <li key={item} className="border-b border-border pb-3 text-foreground/85 font-light">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div
              className="aspect-[16/10] rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG.table})` }}
            />
            <div
              className="aspect-[16/10] rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG.fields})` }}
            />
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Retreat venue questions.</h2>
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
    </PageShell>
  );
}
