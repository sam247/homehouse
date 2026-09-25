import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/table-orchard.webp",
  garden: "/photos/garden-magnolia.webp",
};

export const metadata: Metadata = {
  title: {
    absolute: "Therapies & Healing Sessions in Norfolk | Home House Homestead",
  },
  description:
    "1-to-1 therapies at Home House Homestead in Norfolk: Sufi healing, breath and bodywork, sacred sound, Holy Hijama therapy, and restorative massage by arrangement.",
  openGraph: {
    title: "Therapies & Healing Sessions in Norfolk | Home House Homestead",
    description:
      "1-to-1 therapies at Home House Homestead in Norfolk: Sufi healing, breath and bodywork, sacred sound, Holy Hijama therapy, and restorative massage by arrangement.",
    images: [IMG.hero],
    url: "/therapies",
  },
  alternates: {
    canonical: "/therapies",
  },
};

const therapies = [
  {
    title: "Sufi healing",
    body: "Heart-centred spiritual healing rooted in the Sufi path — supporting softening, release, and a return to presence.",
  },
  {
    title: "Breath and bodywork",
    body: "Gentle practices to settle the nervous system, reconnect with the body, and create space for rest and integration.",
  },
  {
    title: "Sacred sound healing",
    body: "Sound journeys and live soundscape work for deep rest, listening, and subtle restoration.",
  },
  {
    title: "Holy Hijama therapy",
    body: "Traditional cupping offered with care as part of a wider healing stay, by arrangement.",
  },
  {
    title: "Bliss body massage",
    body: "Restorative bodywork for guests who want physical ease alongside quieter time at the homestead.",
  },
];

const faq = [
  {
    q: "Can I book therapies without staying overnight?",
    a: "Some sessions may be available by arrangement. Many guests combine treatments with a stay or retreat. Enquire with what you need and we will advise.",
  },
  {
    q: "Are therapies clinical or medical treatment?",
    a: "No. These are complementary healing offerings held with care. They are not a substitute for medical or mental health care when that is needed.",
  },
  {
    q: "How do I book a session?",
    a: "Send an enquiry with the therapy you are interested in, preferred dates, and whether you also want accommodation or a retreat stay.",
  },
] as const;

export default function TherapiesPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/therapies`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Therapies", item: pageUrl },
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
        eyebrow="Therapies"
        title="1-to-1 therapies and healing sessions at Home House."
        intro="Sufi healing, breath and bodywork, sacred sound, Holy Hijama therapy, and restorative massage — available by arrangement during stays and retreats in Norfolk."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Therapies at Home House are offered as part of a wider invitation to soften, rest, and return to
                yourself. Sessions are personal rather than clinical, and are shaped around what feels right for you in
                the moment.
              </p>
              <p>
                Many guests book treatments alongside{" "}
                <Link href="/stays" className="text-accent hover:underline">
                  Accommodation
                </Link>
                ,{" "}
                <Link href="/womens-retreats" className="text-accent hover:underline">
                  Women&apos;s Retreats
                </Link>
                , or a{" "}
                <Link href="/sufi-muslim-retreats" className="text-accent hover:underline">
                  Sufi Muslim retreat
                </Link>
                .
              </p>
            </div>
            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Book a session</p>
              <p className="text-sm font-light text-foreground/80 leading-relaxed">
                Tell us which therapy you are drawn to and whether you also need overnight accommodation.
              </p>
              <div className="mt-8">
                <EnquiryDrawer
                  source="therapies"
                  trigger={<Button className="rounded-none w-full">Enquire about therapies</Button>}
                />
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="max-w-3xl reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Offerings</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Healing sessions available by arrangement.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {therapies.map((item) => (
              <article key={item.title} className="reveal border border-border p-8">
                <h3 className="font-serif text-2xl leading-tight">{item.title}</h3>
                <p className="mt-4 text-foreground/75 font-light leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
          <div
            className="mt-12 aspect-[21/9] rounded-sm bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.garden})` }}
          />
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Therapy questions.</h2>
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
