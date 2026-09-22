import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/fields.webp",
  table: "/photos/table-orchard.webp",
  pond: "/photos/pond.webp",
};

export const metadata: Metadata = {
  title: {
    absolute: "Women's Retreats in Norfolk | Home House Homestead",
  },
  description:
    "Women's retreats in Norfolk at Home House Homestead — scheduled rest retreats and bespoke stays shaped around rest, nature, nourishment, and reconnection.",
  openGraph: {
    title: "Women's Retreats in Norfolk | Home House Homestead",
    description:
      "Women's retreats in Norfolk at Home House Homestead — scheduled rest retreats and bespoke stays shaped around rest, nature, nourishment, and reconnection.",
    images: [IMG.hero],
    url: "/womens-retreats",
  },
  alternates: {
    canonical: "/womens-retreats",
  },
};

const justBeSpaceTo = [
  "Rest and sleep deeply",
  "Walk in nature",
  "Read beneath the apple trees",
  "Journal, pray, or meditate",
  "Share stories around the fire",
  "Enjoy wholesome homemade food",
  "Sing, move, create",
  "Or simply do nothing at all but sleep and eat",
];

const justBeFor = [
  "The woman who is tired, worn out, and needs a rest",
  "The woman longing to exhale",
  "The woman craving simplicity, slowness, nature, warmth, and meaningful connection",
  "The woman who works long days and never stops",
  "The woman who spends all her time looking after her family and loved ones",
  "The woman who wants to be with other women in an organic, natural environment with no agenda other than to just be together",
  "The woman who longs to slow down enough to listen to her heart and deep inner wisdom",
];

const justBeOtherDates = ["14th to 16th August 2026", "18th to 20th September 2026"];

const retreatOptions = [
  {
    title: "1 Night / 2 Day Retreat",
    eyebrow: "Option 1 — A gentle starting point",
    includes: [
      "Accommodation at Home House",
      "All meals",
      "1 × 1–1 session with Hawa Amanda",
      "Time for rest, nature, and integration",
    ],
  },
  {
    title: "2 Night / 3 Day Retreat",
    eyebrow: "Option 2 — Deeper immersion",
    includes: [
      "Accommodation",
      "All meals",
      "2 × 1–1 sessions",
      "Time for rest, nature, and integration",
    ],
  },
  {
    title: "3 Night / 4 Day Retreat",
    eyebrow: "Option 3 — Deeper healing journey",
    includes: [
      "Accommodation",
      "All meals",
      "3 × 1–1 sessions",
      "Ongoing support and space for deeper integration",
    ],
  },
];

const addOns = [
  "Additional 1–1 session",
  "Sufi healing",
  "Breath and bodywork",
  "Holy hijama therapy",
  "Sacred sound healing",
  "Bliss body massage",
];

const faq = [
  {
    q: "What are women's retreats like at Home House Homestead?",
    a: "Women's retreats here are small, personal, and rooted in rest, nourishment, and connection. Some are scheduled gatherings with shared dates; others are bespoke stays shaped around what you need most.",
  },
  {
    q: "Do you publish prices on this page?",
    a: "No. This page focuses on the experience and formats. For current rates, deposits, and booking details, enquire and we will share what applies to your dates.",
  },
  {
    q: "Can I come alone?",
    a: "Yes. Many women come alone. If you prefer a quieter solo stay rather than a shared women's gathering, see our solo retreats page.",
  },
] as const;

export default function WomensRetreatsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/womens-retreats`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Women's Retreats", item: pageUrl },
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
        eyebrow="Women's Retreats"
        title="Women's retreats in Norfolk for rest, softness, and reconnection."
        intro="Scheduled women's rest retreats and bespoke stays at Home House Homestead — shaped around deep rest, meaningful connection, and time close to the land."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 items-start">
            <div className="md:col-span-2 reveal space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Upcoming retreat</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">JUST BE</h2>
                <p className="mt-4 text-foreground/75 font-light text-lg">A women&apos;s rest retreat</p>
              </div>

              <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                <p>
                  Sometimes we need a few days away from daily life. A few gentle days to step away from the noise and
                  demands of everyday life and come HOME to yourself. Come HOME to your heart.
                </p>
                <p>
                  A space to rest. To breathe. To sleep deeply. To be nourished and cared for. To reconnect with
                  ourselves, nature, and softer rhythms.
                </p>
                <p>
                  JUST BE is a gentle women&apos;s rest retreat here at Home House Homestead in the Norfolk countryside — a
                  retreat for women longing for space to simply be, without pressure, agenda, a schedule, or
                  expectation.
                </p>
                <p>
                  Looking for a quieter solo stay or a private group booking? Visit{" "}
                  <Link href="/retreats" className="text-accent hover:underline">
                    Retreats
                  </Link>{" "}
                  or{" "}
                  <Link href="/stays" className="text-accent hover:underline">
                    Accommodation
                  </Link>
                  .
                </p>
              </div>

              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Space to</p>
                <ul className="grid gap-3">
                  {justBeSpaceTo.map((i) => (
                    <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                <p>
                  Optional practices may organically arise throughout our days together: movement, breathwork, prayer,
                  dhikr, music, creativity, storytelling, and quiet reflection. And maybe none of it may arise
                  depending on the needs of the group. Everything is invitational. Everything soft.
                </p>
                <p>
                  This is not a retreat about fixing yourself. It is a space to soften, exhale, and come HOME to
                  yourself.
                </p>
                <p>
                  There is also an invitation for less online use and more presence, connection, nature, and real rest
                  during our days together — an opportunity to put your phone in a box for your stay if that feels like
                  something you&apos;d like to do as an intention. You can of course have it at any point for women
                  concerned about children, families, and people they care for.
                </p>
              </div>

              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">This retreat is for</p>
                <ul className="grid gap-3">
                  {justBeFor.map((i) => (
                    <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="reveal border border-border p-8">
              <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                <Image
                  src={IMG.pond}
                  alt="Pond at Home House"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover kenburns"
                />
              </div>
              <h3 className="mt-8 font-serif text-2xl mb-6">Details</h3>
              <div className="space-y-5 text-foreground/80 font-light">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Dates</p>
                  <p>3rd to 5th July 2026</p>
                  <p className="mt-1 text-sm text-foreground/70">Arrive from 4pm · Departure 4pm</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Group</p>
                  <p>A small intimate group each time</p>
                  <p className="mt-1 text-sm text-foreground/70">6 spaces available</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Accommodation</p>
                  <p>Shared twin rooms with single beds and shared bathroom</p>
                  <p className="mt-1 text-sm text-foreground/70">
                    Extra spaces in a bell tent may be available once rooms are booked.
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Meals</p>
                  <p>All meals included</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Other dates</p>
                  <ul className="grid gap-2">
                    {justBeOtherDates.map((d) => (
                      <li key={d} className="text-sm text-foreground/75 font-light border-b border-border pb-2">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <EnquiryDrawer
                  source="womens_retreats_just_be"
                  trigger={
                    <Button className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                      Enquire about JUST BE
                    </Button>
                  }
                />
                <p className="text-sm text-foreground/60">
                  Enquire for current rates, deposits, and how to reserve your place.
                </p>
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Bespoke retreats</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">Bespoke retreats for women</h2>
              </div>
              <div className="text-foreground/80 font-light leading-relaxed space-y-4">
                <p>
                  I offer bespoke, in-person retreats for women at Home House, for those who feel called to come and
                  work with me more deeply.
                </p>
                <p>
                  Held in a peaceful and nurturing setting, these retreats are an invitation to slow down, soften, and
                  enter into a deeper process of healing, rest, and reconnection.
                </p>
                <p>
                  Each retreat is created around your individual needs. Your time here may include Sufi healing, breath
                  and bodywork, hijama, massage, sacred sound, as well as space to rest, be in nature, and simply be.
                </p>
                <p>
                  You are welcome to come alone, or with a sister, friend, or small group. Retreats can be held as
                  quiet, restorative stays, or as more guided and immersive healing experiences.
                </p>
              </div>
              <div className="reveal">
                <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                  <Image
                    src={IMG.table}
                    alt="Table set for supper at Home House"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover kenburns"
                  />
                </div>
              </div>
            </div>

            <div className="reveal space-y-8">
              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Enquiries & bookings</p>
                <p className="text-foreground/80 font-light leading-relaxed">
                  Share what you are looking for and we will come back with options, availability, and next steps.
                </p>
                <div className="mt-6">
                  <EnquiryDrawer
                    source="womens_retreats_bespoke"
                    trigger={<Button className="rounded-none">Enquire about a bespoke retreat</Button>}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Retreat formats</p>
                <div className="grid gap-6">
                  {retreatOptions.map((o) => (
                    <div key={o.title} className="border border-border p-8">
                      <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">{o.eyebrow}</p>
                      <h3 className="mt-3 font-serif text-2xl">{o.title}</h3>
                      <ul className="mt-5 grid gap-2">
                        {o.includes.map((i) => (
                          <li key={i} className="text-sm text-foreground/75 font-light border-b border-border pb-2">
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Optional add-ons</p>
                <ul className="grid gap-2">
                  {addOns.map((i) => (
                    <li key={i} className="text-sm text-foreground/75 font-light border-b border-border pb-2">
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-foreground/75 font-light leading-relaxed">
                  Small group retreats can be created for you. Please get in touch to explore options.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Women&apos;s retreat questions.</h2>
          </div>
          <div className="mt-12 grid gap-6">
            {faq.map((item) => (
              <article key={item.q} className="reveal border border-border p-8">
                <h3 className="font-serif text-2xl leading-tight">{item.q}</h3>
                <p className="mt-4 text-foreground/75 font-light leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm font-light">
            <Link href="/retreats/womens-retreats-norfolk" className="text-accent hover:underline">
              Women&apos;s retreats planning guide
            </Link>
            <Link href="/therapies" className="text-accent hover:underline">
              Therapies &amp; 1-to-1 sessions
            </Link>
            <Link href="/reviews" className="text-accent hover:underline">
              Guest reviews
            </Link>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
