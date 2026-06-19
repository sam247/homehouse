import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/stays/front_of_house/IMG_9931.jpeg",
  garden: "/photos/garden-magnolia.webp",
  pond: "/photos/pond.webp",
};

const faq = [
  {
    q: "What kind of Norfolk holiday is Home House Homestead best for?",
    a: "Home House Homestead is best suited to guests looking for a quieter Norfolk holiday with countryside accommodation, rest, nourishing food, and a more personal atmosphere than a standard hotel break.",
  },
  {
    q: "Is this a good base for a quiet weekend break in Norfolk?",
    a: "Yes. It works especially well for quiet weekend breaks, slower countryside stays, and restorative holidays close to nature.",
  },
  {
    q: "Can I combine a Norfolk holiday with a retreat-style stay?",
    a: "Yes. Some guests book a simple guest house stay while others shape their visit more like a private retreat. The best fit depends on how much structure and quiet time you want.",
  },
] as const;

export const metadata: Metadata = {
  title: "Norfolk Holidays | Quiet Countryside Stays & Retreat Breaks",
  description:
    "Plan a quieter Norfolk holiday at Home House Homestead with countryside accommodation, peaceful rooms, nourishing meals, and retreat-style stays.",
  openGraph: {
    title: "Norfolk Holidays | Quiet Countryside Stays & Retreat Breaks",
    description:
      "Plan a quieter Norfolk holiday at Home House Homestead with countryside accommodation, peaceful rooms, nourishing meals, and retreat-style stays.",
    images: [IMG.hero],
    url: "/norfolk-holidays",
  },
  alternates: {
    canonical: "/norfolk-holidays",
  },
};

export default function NorfolkHolidaysPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/norfolk-holidays`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Norfolk Holidays", item: pageUrl },
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
        eyebrow="Norfolk holidays"
        title="Norfolk holidays for guests who want a slower, quieter stay."
        intro="Stay at Home House Homestead for a countryside holiday in Norfolk that feels personal, peaceful, and restorative."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Not every Norfolk holiday needs to be busy. Some guests are looking for coast paths, market towns, and
                places to visit. Others want a holiday that feels quieter, softer, and less crowded, with time to rest
                properly and enjoy the countryside at a slower pace.
              </p>
              <p>
                Home House Homestead is well suited to the second kind. It offers a more personal alternative to a
                standard hotel stay, with farmhouse accommodation, good food, calm rooms, gardens, fields, and a
                welcoming atmosphere rooted in homestead life.
              </p>
              <p>
                If your trip is more retreat-focused, explore our{" "}
                <Link href="/retreats" className="text-accent hover:underline">
                  Norfolk retreats
                </Link>{" "}
                page. If you mainly want accommodation details, see{" "}
                <Link href="/stays" className="text-accent hover:underline">
                  guest house stays
                </Link>
                .
              </p>
            </div>

            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Good fit for</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                <li className="border-b border-border pb-3">Quiet weekend breaks in Norfolk</li>
                <li className="border-b border-border pb-3">Guests who want countryside rather than a busy resort</li>
                <li className="border-b border-border pb-3">Restful holidays with food, nature, and space to exhale</li>
                <li className="border-b border-border pb-3">People considering a retreat-style stay without a fixed programme</li>
              </ul>
              <div className="mt-8 grid gap-3">
                <Button asChild className="rounded-none">
                  <Link href="/stays">Explore stays</Link>
                </Button>
                <EnquiryDrawer
                  source="norfolk_holidays"
                  trigger={
                    <Button variant="outline" className="rounded-none border-foreground/30 bg-transparent">
                      Enquire about dates
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
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What a stay can look like</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">A holiday shaped around space, not rush.</h2>
            </div>
            <div className="reveal space-y-4 text-foreground/75 font-light leading-relaxed">
              <p>
                Guests often spend their days walking, reading, resting, eating well, visiting the coast or local
                villages, and then returning to somewhere that feels calm rather than over-programmed.
              </p>
              <p>
                This makes Home House a strong fit for quiet weekend breaks, restorative short stays, and the kind of
                Norfolk holiday where the place you stay is part of the recovery, not just a base for sightseeing.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div
              className="reveal aspect-[16/10] rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG.garden})` }}
            />
            <div
              className="reveal aspect-[16/10] rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG.pond})` }}
            />
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="max-w-4xl reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Related options</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Choose the right kind of Norfolk break.</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <article className="reveal border border-border p-8 bg-background">
              <h3 className="font-serif text-2xl leading-tight">Guest house stays</h3>
              <p className="mt-4 text-foreground/75 font-light leading-relaxed">
                Best if you want a peaceful countryside holiday with accommodation and flexibility.
              </p>
              <Link href="/stays" className="mt-6 inline-block text-sm text-accent hover:underline">
                View stays
              </Link>
            </article>
            <article className="reveal border border-border p-8 bg-background">
              <h3 className="font-serif text-2xl leading-tight">Retreats in Norfolk</h3>
              <p className="mt-4 text-foreground/75 font-light leading-relaxed">
                Best if you want a more intentional restorative stay, private retreat, or solo retreat.
              </p>
              <Link href="/retreats" className="mt-6 inline-block text-sm text-accent hover:underline">
                Explore retreats
              </Link>
            </article>
            <article className="reveal border border-border p-8 bg-background">
              <h3 className="font-serif text-2xl leading-tight">Retreat guides</h3>
              <p className="mt-4 text-foreground/75 font-light leading-relaxed">
                Best if you are still comparing quiet breaks, homestead stays, and retreat-style options.
              </p>
              <Link href="/blog" className="mt-6 inline-block text-sm text-accent hover:underline">
                Read the blog
              </Link>
            </article>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Common questions about Norfolk holidays here.</h2>
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
