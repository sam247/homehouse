import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/PHOTO1.jpeg",
  photo1: "/photos/PHOTO1.jpeg",
  photo2: "/photos/PHOTO2.jpeg",
  table: "/photos/table-orchard.webp",
};

export const metadata: Metadata = {
  title: {
    absolute: "Retreat Venue in Norfolk | Home House Homestead",
  },
  description:
    "Home House Homestead is a peaceful countryhouse retreat venue in Norfolk for small women's retreats, private groups, spiritual gatherings, healing retreats, and restorative stays.",
  openGraph: {
    title: "Retreat Venue in Norfolk | Home House Homestead",
    description: "A small, intimate retreat venue in Norfolk for countryside gatherings, healing retreats, and spiritual stays.",
    images: [IMG.hero],
    url: "/retreat-venues",
  },
  alternates: {
    canonical: "/retreat-venues",
  },
};

const suitedTo = [
  "Small women’s retreats and restorative gatherings",
  "Private groups of friends, sisters or colleagues looking for a peaceful countryside setting",
  "Spiritual teachers and facilitators seeking an intimate natural retreat venue",
  "Retreats wanting seasonal, organic, garden-to-table style catering",
  "Groups who want accommodation, meals and access to the land in one place",
  "Sufi and Muslim retreats, workshops and gatherings",
  "Healing, spiritual and creative retreats where a warm, homely atmosphere matters",
];

const includes = [
  "A peaceful old flint countryhouse in rural Norfolk",
  "Accommodation, nourishing meals and access to the land in one place",
  "Seasonal, organic, garden-to-table style catering",
  "Shared and private spaces for gathering, rest and conversation",
  "Gardens, fields and quieter outdoor edges",
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
          { "@type": "ListItem", position: 2, name: "Retreat Venue", item: pageUrl },
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
        eyebrow="Retreat Venue"
        title="Home House Homestead as a Retreat Venue"
        intro="A small retreat venue in Norfolk for intimate countryside gatherings."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Home House Homestead is a peaceful old flint countryhouse retreat venue in rural Norfolk for small
                women&apos;s retreats, private groups, spiritual gatherings and teachings, healing retreats and
                restorative stays.
              </p>
              <p>
                Warmer and more personal than a standard hire venue, Home House is run as a living homestead and is
                rooted in Sufi Islamic values — prayer, service, simplicity, hospitality and living in harmony with
                the earth.
              </p>
              <p>
                It is a home shaped by devotion, service, nourishment, nature and a slower rhythm of life.
              </p>
              <div className="aspect-[16/10] overflow-hidden rounded-sm">
                <img src={IMG.photo1} alt="Home House Homestead flint countryhouse" className="h-full w-full object-cover" />
              </div>
              <p>
                For those looking for more than simply bedrooms and a catering menu, Home House offers a setting that
                already feels peaceful, cared for, loved and held. A house that feels like a home rather than a
                retreat centre.
              </p>
              <p>
                A place where guests can stay together, share nourishing meals, walk the land, gather, pray, reflect
                and reconnect at a gentler pace.
              </p>
              <p>
                Home House is particularly suited to small groups who value intimacy, atmosphere and connection over
                scale.
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
              style={{ backgroundImage: `url(${IMG.photo2})` }}
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
