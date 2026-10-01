import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section, Zigzag } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/pond.webp",
  fields: "/photos/fields.webp",
  sufi: "/photos/sufi_photo.jpeg",
};

export const metadata: Metadata = {
  title: {
    absolute: "Sufi Muslim Retreats in Norfolk | Home House Homestead",
  },
  description:
    "Sufi Muslim retreats at Home House Homestead in Norfolk — an intimate halal venue for prayer, dhikr, spiritual teachings and healing, for teachers, tariqas, small groups and individuals.",
  openGraph: {
    title: "Sufi Muslim Retreats in Norfolk | Home House Homestead",
    description:
      "Sufi Muslim retreats at Home House Homestead in Norfolk — an intimate halal venue for prayer, dhikr, spiritual teachings and healing, for teachers, tariqas, small groups and individuals.",
    images: [IMG.hero],
    url: "/sufi-muslim-retreats",
  },
  alternates: {
    canonical: "/sufi-muslim-retreats",
  },
};

const highlights = [
  "Held by Hawa, rooted in the Sufi path of Divine Love",
  "An intimate halal venue for teachers, tariqas and small groups",
  "Space for prayer, dhikr, study and spiritual healing",
  "An alcohol- and drug-free environment",
];

const suitedTo = [
  "Sufi and Muslim teachers looking for an intimate halal venue to bring a small group of students or community members",
  "Small Sufi circles, tariqas and Muslim communities wanting space for retreats, dhikr, prayer, study and shared meals",
  "Women’s spiritual groups seeking a peaceful and nurturing place to gather",
  "Individuals or couples wanting a quieter, more personal spiritual retreat",
  "Groups wishing to deepen their relationship with Allah through remembrance, reflection, teachings and time away from everyday life",
  "Teachers and facilitators who prefer a warm, homely environment rather than a large commercial retreat centre",
  "Those seeking rest, simplicity, nourishment and meaningful connection within an alcohol- and drug-free environment",
  "People who value intimacy, reverence, nature, prayer and a slower pace",
];

const mayInclude = [
  "Peaceful accommodation at the homestead",
  "Time for prayer, dhikr, reflection and remembrance",
  "Space for teachings, study and spiritual conversation",
  "Optional Sufi healing and related 1-to-1 sessions by arrangement",
  "Nourishing meals and a slower daily rhythm",
  "Gardens, fields, and quiet outdoor space",
];

const faq = [
  {
    q: "Do you offer Sufi Muslim retreats in Norfolk?",
    a: "Yes. Home House Homestead offers an intimate and peaceful setting for Sufi and Muslim retreats, gatherings and stays. Some gatherings are scheduled; others are arranged privately around the needs of your group.",
  },
  {
    q: "Can we bring our own teacher, shaykh or shaykha?",
    a: "Yes. Home House is especially suited to small groups who wish to bring their own spiritual teacher, shaykh, shaykha or guide and create a more personal retreat around prayer, study, spiritual healing, dhikr, reflection and time together.",
  },
  {
    q: "Is this a large commercial retreat centre?",
    a: "No. Home House is a lived-in homestead and guest house with a warm, homely atmosphere rather than an institutional one. It is held by Hawa and shaped by the Sufi path of devotion, peace, love, mercy, justice and freedom.",
  },
  {
    q: "Are these retreats only for Muslim women?",
    a: "No. Home House welcomes Sufi and Islamic teachers, guides and communities, as well as women’s spiritual groups, individuals and couples. Enquire about your situation and we will guide you honestly on fit, dates and what can be held.",
  },
  {
    q: "Is the environment alcohol- and drug-free?",
    a: "Yes. Home House is an alcohol- and drug-free environment, rooted in halal hospitality, prayer and care for every guest.",
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
        title="Sufi Muslim retreats in Norfolk for spiritual teachings, community gatherings, rest, remembrance and return."
        intro="A serene sanctuary held in prayer, heart-centred connection and spiritual healing, rooted in the Sufi path of devotion, peace, love, mercy, justice and freedom."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Home House Homestead is held by Hawa, whose own spiritual journey through different traditions and
                paths eventually led her to Islam and Sufism, where she has chosen the path of Divine Love and the
                purification of the heart.
              </p>
              <p>
                Through devotion, prayer and surrender, the homestead has gradually become a place where guests feel
                the grounded transmissions of peace and are able to slow down, step away from the noise of modern
                life, reconnect with themselves and Allah, receive spiritual healing and listen more deeply for what
                is true.
              </p>
              <p>
                Home House offers an intimate and peaceful setting for Sufis and Muslims wishing to gather in
                community, deepen in spiritual practice, receive teachings and spend time in remembrance.
              </p>
              <p>
                It is especially suited to small groups who wish to bring their own spiritual teacher, shaykh, shaykha
                or guide and create a more personal retreat around prayer, study, spiritual healing, dhikr, reflection
                and time together.
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
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">At a glance</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                {highlights.map((item) => (
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
        <Zigzag
          eyebrow="A home for sacred gathering"
          title="A small lighthouse for Sufi and Islamic teachings."
          image={IMG.sufi}
          body={
            <>
              <p>
                There is space here for rest, presence, nourishment and the quiet softening of the heart. A space to
                deepen in knowledge, relationship and intimacy with Allah.
              </p>
              <p>
                Hawa would be honoured to welcome Sufi and Islamic teachers, guides and communities to Home House, and
                to see this special place continue to grow as a home for sacred gathering and a small lighthouse for
                Sufi and Islamic teachings.
              </p>
            </>
          }
        />
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="reveal max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Who is this best suited for?</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Made for heartfelt, personal gatherings.
            </h2>
          </div>
          <ul className="reveal mt-12 grid gap-3 md:grid-cols-2 md:gap-x-12">
            {suitedTo.map((item) => (
              <li key={item} className="border-b border-border pb-3 text-foreground/85 font-light">
                {item}
              </li>
            ))}
          </ul>
          <p className="reveal mt-10 max-w-3xl text-foreground/80 font-light leading-relaxed">
            Home House is particularly suited to smaller groups who want to create something heartfelt and personal,
            with space for both community and solitude.
          </p>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
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

      <Band className="border-t border-border">
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
