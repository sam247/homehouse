import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { PlanningGuidesSection, MUSLIM_RETREAT_PLANNING_GUIDES } from "@/components/PlanningGuidesSection";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/041026_images/7.jpeg",
  photo1: "/photos/041026_images/7.jpeg",
  photo2: "/photos/PHOTO2.jpeg",
  table: "/photos/table-orchard.webp",
};

export const metadata: Metadata = {
  title: {
    absolute: "Muslim Retreat Venue in Norfolk | Home House Homestead",
  },
  description:
    "An intimate halal retreat venue in the Norfolk countryside for Muslim groups, teachers and communities — accommodation, halal meals, salah and study space at Home House Homestead.",
  openGraph: {
    title: "Muslim Retreat Venue in Norfolk | Home House Homestead",
    description:
      "A peaceful old flint country house in rural Norfolk available for small Muslim retreats, teaching weekends and private group stays.",
    images: [IMG.hero],
    url: "/muslim-retreat-venues",
  },
  alternates: {
    canonical: "/muslim-retreat-venues",
  },
};

const suitedTo = [
  "Muslim women’s retreats",
  "Islamic teaching and study weekends",
  "Muslim community and friendship groups",
  "Small retreats led by teachers, scholars or facilitators",
  "Qur’an, reflection and wellbeing retreats",
  "Private halal countryside stays for groups",
  "Groups wanting accommodation, meals and gathering space in one place",
  "Retreats looking for a warm, homely alternative to a commercial venue",
  "Muslim groups seeking an alcohol- and drug-free environment",
  "Small gatherings that value privacy, simplicity and personal hospitality",
];

const includes = [
  "A peaceful old flint country house in rural Norfolk",
  "Private accommodation for small groups",
  "Halal catering and shared meals",
  "Space for salah, Qur’an, teaching and group discussion",
  "Shared and private spaces for gathering and rest",
  "Gardens, fields and outdoor space",
  "Seasonal, nourishing, garden-to-table style food",
  "Personal hosting from Hawa and a relaxed, homely atmosphere",
  "An alcohol- and drug-free environment",
  "Optional 1-to-1 therapies by arrangement",
];

const faq = [
  {
    q: "Is Home House a large retreat centre?",
    a: "No. Home House is an intimate homestead and guest house. It suits small groups who want a lived-in, personal setting rather than a purpose-built venue with multiple meeting halls.",
  },
  {
    q: "Can I hire the house as a Muslim retreat venue in Norfolk?",
    a: "Yes, for the right fit. We welcome small Muslim retreats and gatherings by arrangement. Tell us your group size, dates, and what kind of stay you need.",
  },
  {
    q: "How many guests can you accommodate?",
    a: "Capacity depends on room setup and whether shared or private rooms are preferred. Enquire with your dates and we will confirm what is possible.",
  },
] as const;

export default function RetreatVenuesPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/muslim-retreat-venues`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Muslim Retreat Venue", item: pageUrl },
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
        eyebrow="Halal Retreat Venue in Norfolk"
        title="Muslim Retreat Venue"
        intro="An intimate halal retreat venue in the Norfolk countryside for Muslim groups, teachers and communities."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Home House Homestead is a peaceful old flint country house in rural Norfolk available for small Muslim
                retreats, women’s gatherings, Islamic teaching weekends, community stays and private group retreats.
              </p>
              <p>
                More personal than a hotel or commercial retreat centre, Home House offers accommodation, halal meals,
                gathering spaces and access to the surrounding land in one peaceful setting.
              </p>
              <div className="aspect-[16/10] overflow-hidden rounded-sm">
                <img src={IMG.photo1} alt="Home House Homestead flint country house" className="h-full w-full object-cover" />
              </div>
              <p>
                The house is run as a living Muslim homestead and provides a warm, respectful environment for Muslim
                guests, with space for salah, Qur’an, study, conversation, rest and community.
              </p>
              <p>
                Home House is particularly suited to groups who want to bring their own teacher, scholar, facilitator
                or programme and create a retreat that feels private, relaxed and personal.
              </p>
              <p>
                Rather than offering a fixed retreat format, the venue can support a wide range of Muslim gatherings
                from women’s wellbeing weekends and family or community retreats to Islamic study, teaching,
                reflection and restorative time away.
              </p>
              <p>
                The environment is alcohol- and drug-free, halal food can be provided, and the slower rhythm of the
                countryside offers space to step away from everyday demands and spend meaningful time together.
              </p>
              <p>
                If you are specifically looking for Sufi gatherings, dhikr retreats or spiritually focused Sufi
                teachings, visit{" "}
                <Link href="/sufi-muslim-retreats" className="text-accent hover:underline">
                  Sufi Retreats
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
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                A Muslim-friendly homestead, not a conference hall.
              </h2>
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

      <Band className="border-t border-border">
        <Section className="max-w-4xl">
          <PlanningGuidesSection
            title="Planning a Muslim group retreat"
            intro="If you are organising a stay for a group, these guides cover the practical questions — venue facilities, room for prayer, halal catering and how long to book for."
            guides={MUSLIM_RETREAT_PLANNING_GUIDES}
          />
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Muslim retreat venue questions.</h2>
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
