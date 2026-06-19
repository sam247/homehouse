import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import type { RetreatLandingData } from "@/lib/retreatPages";
import { getSiteUrl } from "@/lib/siteUrl";

export function buildRetreatMetadata(page: RetreatLandingData): Metadata {
  return {
    title: page.metadataTitle,
    description: page.metadataDescription,
    openGraph: {
      title: page.metadataTitle,
      description: page.metadataDescription,
      images: ["/photos/fields.webp"],
      url: `/retreats/${page.slug}`,
    },
    alternates: {
      canonical: `/retreats/${page.slug}`,
    },
  };
}

export function RetreatLandingPage({ page }: { page: RetreatLandingData }) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/retreats/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Retreats", item: `${siteUrl}/retreats` },
          { "@type": "ListItem", position: 3, name: page.navLabel, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faq.map((item) => ({
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
        title={page.heroTitle}
        intro={page.heroIntro}
        image="/photos/fields.webp"
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              {page.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Best fit for</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                {page.bestFor.map((item) => (
                  <li key={item} className="border-b border-border pb-3">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <EnquiryDrawer
                  source={page.slug}
                  trigger={<Button className="rounded-none">Enquire about this retreat</Button>}
                />
                <Button asChild variant="outline" className="rounded-none border-foreground/30 bg-transparent">
                  <Link href="/retreats">Compare retreat options</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What this includes</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">What guests usually come here for.</h2>
            </div>
            <ul className="reveal grid gap-3">
              {page.includes.map((item) => (
                <li key={item} className="border-b border-border pb-3 text-foreground/85 font-light">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="max-w-4xl reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Why Home House</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Why this works well in Norfolk.</h2>
            <div className="mt-6 space-y-4 text-[var(--deep)]/80 font-light leading-relaxed">
              {page.whyHomeHouse.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-light">
              <Link href="/events-and-workshops" className="text-accent hover:underline">
                View scheduled retreats
              </Link>
              <Link href="/stays" className="text-accent hover:underline">
                Explore guest house stays
              </Link>
              <Link href="/reviews" className="text-accent hover:underline">
                Read guest reviews
              </Link>
            </div>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Common questions about this retreat type.</h2>
          </div>
          <div className="mt-12 grid gap-6">
            {page.faq.map((item) => (
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
