import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/pond.webp",
  fields: "/photos/fields.webp",
};

export const metadata: Metadata = {
  title: {
    absolute: "Sufi Muslim Retreats in Norfolk | Home House Homestead",
  },
  description:
    "Muslim retreat venue and Sufi stays in Norfolk at Home House Homestead — quiet space for prayer, remembrance, rest, and heart-centred healing.",
  openGraph: {
    title: "Sufi Muslim Retreats in Norfolk | Home House Homestead",
    description:
      "Muslim retreat venue and Sufi stays in Norfolk at Home House Homestead — quiet space for prayer, remembrance, rest, and heart-centred healing.",
    images: [IMG.hero],
    url: "/sufi-muslim-retreats",
  },
  alternates: {
    canonical: "/sufi-muslim-retreats",
  },
};

const suitedTo = [
  "Muslim guests seeking a quieter countryside retreat rooted in Sufi devotion",
  "Women wanting space for prayer, dhikr, rest, and nature",
  "Guests drawn to heart-centred healing rather than a busy programme",
  "People looking for a personal Norfolk stay held with care and sincerity",
];

const mayInclude = [
  "Peaceful accommodation at the homestead",
  "Time for prayer, reflection, and dhikr",
  "Nourishing meals and a slower daily rhythm",
  "Gardens, fields, and quiet outdoor space",
  "Optional Sufi healing and related 1-to-1 sessions by arrangement",
];

const faq = [
  {
    q: "Do you offer Sufi Muslim retreats in Norfolk?",
    a: "Yes. Home House Homestead offers restful stays and retreats held within a Sufi path of devotion and care. Some gatherings are scheduled; others are arranged privately around your needs.",
  },
  {
    q: "Is this a formal Islamic retreat centre?",
    a: "No. Home House is a lived-in homestead and guest house. The atmosphere is personal and heart-led rather than institutional, shaped by Hawa's Sufi path and hosting.",
  },
  {
    q: "Are these retreats only for Muslim women?",
    a: "Many guests are women seeking rest and reconnection. Enquire about your situation and we will guide you honestly on fit, dates, and what can be held.",
  },
] as const;

export default function SufiMuslimRetreatsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/sufi-muslim-retreats`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Sufi Muslim Retreats", item: pageUrl },
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
        eyebrow="Sufi Muslim Retreats"
        title="Sufi Muslim retreats in Norfolk for rest, remembrance, and return."
        intro="A quiet countryside space at Home House Homestead for prayer, heart-centred healing, and slower living — held within a Sufi path of devotion and care."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Home House Homestead is held by Hawa, whose path led into Islam and Sufism — the path of the heart.
                Through devotion, prayer, and surrender, the homestead has become a place where guests can slow down,
                reconnect with themselves, and remember what sits beneath the noise of modern life.
              </p>
              <p>
                Sufi Muslim retreats here are not about a packed timetable. They are about rest, presence, nourishment,
                and space for the heart — sometimes shared with other women, sometimes held as a quieter private stay.
              </p>
              <p>
                Optional practices may include prayer, dhikr, Sufi healing, breath and bodywork, sacred sound, and
                simple time outdoors. Everything remains invitational.
              </p>
              <p>
                Learn more about Hawa&apos;s path on the{" "}
                <Link href="/about" className="text-accent hover:underline">
                  About
                </Link>{" "}
                page, or explore{" "}
                <Link href="/therapies" className="text-accent hover:underline">
                  Therapies
                </Link>{" "}
                and{" "}
                <Link href="/womens-retreats" className="text-accent hover:underline">
                  Women&apos;s Retreats
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
                  source="sufi_muslim_retreats"
                  trigger={<Button className="rounded-none w-full">Enquire about a retreat</Button>}
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
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What a stay may include</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Rest, prayer, and gentle care.</h2>
            </div>
            <ul className="reveal grid gap-3">
              {mayInclude.map((item) => (
                <li key={item} className="border-b border-border pb-3 text-foreground/85 font-light">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-12 aspect-[21/9] rounded-sm bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.fields})` }}
          />
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Common questions.</h2>
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
