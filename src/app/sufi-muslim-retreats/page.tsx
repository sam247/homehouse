import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section, Zigzag } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { PlanningGuidesSection, SUFI_RETREAT_PLANNING_GUIDES } from "@/components/PlanningGuidesSection";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/pond.webp",
  fields: "/photos/fields.webp",
  sufi: "/photos/sufi_photo.jpeg",
};

export const metadata: Metadata = {
  title: {
    absolute: "Sufi Retreats in Norfolk | Home House Homestead",
  },
  description:
    "Sufi retreats in Norfolk for remembrance, spiritual teachings, healing, community and return — an intimate halal setting for shaykhs, tariqas, teachers and small groups at Home House Homestead.",
  openGraph: {
    title: "Sufi Retreats in Norfolk | Home House Homestead",
    description:
      "Sufi retreats in Norfolk for remembrance, spiritual teachings, healing, community and return at Home House Homestead.",
    images: [IMG.hero],
    url: "/sufi-muslim-retreats",
  },
  alternates: {
    canonical: "/sufi-muslim-retreats",
  },
};

const highlights = [
  "Held by Hawa and rooted in the Sufi path of Divine Love",
  "An intimate setting for Sufi teachers, tariqas, circles and communities",
  "Space for salah, dhikr, Qur’an, spiritual teachings and contemplation",
  "Optional Sufi healing and individual spiritual sessions",
  "Nourishing halal meals and personal hospitality",
  "An alcohol- and drug-free environment",
  "Surrounded by nature, stillness and the slower rhythms of rural life",
];

const suitedTo = [
  "Sufi teachers and spiritual guides looking for a peaceful place to bring a small group of students",
  "Tariqas and Sufi communities wishing to gather for retreats, dhikr, prayer and spiritual teachings",
  "Small dhikr circles wanting to spend dedicated time together in remembrance",
  "Groups wishing to deepen their relationship with Allah in a zawiyya or khalwa through prayer, contemplation and companionship",
  "Women’s Sufi groups seeking a peaceful and nurturing place to gather",
  "Students wishing to spend concentrated time with a teacher or guide",
  "Retreats centred around Qur’an, dhikr, sacred sound, spiritual healing or traditional Sufi teachings",
  "Teachers who prefer a warm, personal and homely setting rather than a large commercial retreat centre",
  "Those drawn to simplicity, nature, reverence, hospitality and a slower rhythm of life",
];

const mayInclude = [
  "Peaceful accommodation at Home House Homestead",
  "Daily salah and time for personal prayer",
  "Dhikr and collective remembrance",
  "Qur’an recitation and contemplation",
  "Spiritual teachings, sohbet and study",
  "Sacred sound, devotional singing or praise by arrangement",
  "Optional Sufi healing and 1-to-1 sessions with Hawa",
  "Nourishing halal meals shared together",
  "Time for silence, rest and personal reflection",
  "Gardens, fields and quiet outdoor spaces for contemplation and walking",
  "Space for community, conversation and companionship",
];

const faq = [
  {
    q: "Do you offer Sufi retreats in Norfolk?",
    a: "Yes. Home House Homestead offers an intimate and peaceful setting for Sufi retreats, gatherings and stays. Some gatherings are scheduled; others are arranged privately around the needs of your group.",
  },
  {
    q: "Can we bring our own teacher, shaykh or shaykha?",
    a: "Yes. Home House is especially suited to small groups who wish to bring their own spiritual teacher, shaykh, shaykha or guide and create a more personal retreat around prayer, study, spiritual healing, dhikr, reflection and time together.",
  },
  {
    q: "Is this a large commercial retreat centre?",
    a: "No. Home House is a lived-in homestead and guest house with a warm, homely atmosphere rather than an institutional one. It is held by Hawa and shaped by the Sufi path of devotion, remembrance and Divine Love.",
  },
  {
    q: "Are these retreats only for Muslim women?",
    a: "No. Home House welcomes Sufi teachers, guides and communities, as well as women’s spiritual groups, individuals and couples. Enquire about your situation and we will guide you honestly on fit, dates and what can be held.",
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
          { "@type": "ListItem", position: 2, name: "Sufi Retreats", item: pageUrl },
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
        eyebrow="Sufi Retreats"
        title="Sufi Retreats"
        intro="Sufi retreats in Norfolk for remembrance, spiritual teachings, healing, community and return."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                A serene sanctuary held in prayer, heart-centred connection and spiritual healing, rooted in the Sufi
                path of devotion, remembrance, Divine Love and the purification of the heart.
              </p>
              <p>
                Home House is held by Hawa, whose own spiritual journey through different traditions and paths
                eventually led her to Islam and Sufism, where she found a path of surrender, devotion and intimacy
                with Allah.
              </p>
              <p>
                Through prayer, dhikr, service and surrender, the homestead has gradually become a place where guests
                can slow down, step away from the noise of modern life and return to the heart.
              </p>
              <p>
                A place to remember Allah, reconnect with what is essential, receive spiritual nourishment and listen
                more deeply for what is true.
              </p>
              <p>
                Home House offers an intimate and peaceful setting for Sufi communities, tariqas, teachers and
                students wishing to gather in remembrance, deepen in spiritual practice, receive teachings and spend
                meaningful time together.
              </p>
              <p>
                It is especially suited to smaller groups wishing to bring their own shaykh, shaykha, teacher or
                spiritual guide and create a personal retreat around prayer, dhikr, Qur’an, spiritual teaching,
                healing, reflection, sacred sound and companionship.
              </p>
              <p>
                Learn more about Hawa’s path on the{" "}
                <Link href="/about" className="text-accent hover:underline">
                  About
                </Link>{" "}
                page, or explore{" "}
                <Link href="/spiritual-healing" className="text-accent hover:underline">
                  Spiritual healing
                </Link>{" "}
                and{" "}
                <Link href="/womens-retreats" className="text-accent hover:underline">
                  Women’s Retreats
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
                  trigger={<Button className="rounded-none w-full">Enquire about a Sufi retreat</Button>}
                />
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Zigzag
          eyebrow="A home for sacred gathering"
          title="A small lighthouse for Sufi teachings and remembrance."
          image={IMG.sufi}
          body={
            <>
              <p>
                There is space here for rest, presence, nourishment and the quiet softening of the heart.
              </p>
              <p>A place to sit together in remembrance.</p>
              <ul className="space-y-1">
                <li>To pray.</li>
                <li>To listen.</li>
                <li>To learn.</li>
                <li>To sing and praise.</li>
                <li>To share food and companionship.</li>
                <li>To deepen in knowledge, love and intimacy with Allah.</li>
              </ul>
              <p>
                Hawa would be honoured to welcome Sufi teachers, shaykhs, shaykhas, guides, tariqas and communities to
                Home House, and to see this special place continue to grow as a home for sacred gathering, remembrance
                and the transmission of Sufi wisdom.
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
              Made for intimate gatherings of the heart.
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
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Remembrance, prayer, teaching and gentle care.
              </h2>
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
          <PlanningGuidesSection
            title="Reading before you gather"
            intro="Longer guides for anyone organising a Sufi retreat, bringing a teacher, or trying to choose a venue that will hold a circle well."
            guides={SUFI_RETREAT_PLANNING_GUIDES}
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
