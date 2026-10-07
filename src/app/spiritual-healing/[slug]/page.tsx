import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Band, PageHero, PageShell, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Button } from "@/components/ui/button";
import {
  SPIRITUAL_HEALING_SERVICES,
  spiritualHealingPath,
  type SpiritualHealingService,
} from "@/lib/spiritualHealing";

export function generateStaticParams() {
  return SPIRITUAL_HEALING_SERVICES.map(({ slug }) => ({ slug }));
}

function findService(slug: string): SpiritualHealingService | undefined {
  return SPIRITUAL_HEALING_SERVICES.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  const path = spiritualHealingPath(service.slug);
  return {
    title: { absolute: service.title },
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
      url: path,
    },
    alternates: { canonical: path },
  };
}

export default async function SpiritualHealingServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const relatedServices = service.related
    .map((relatedSlug) => SPIRITUAL_HEALING_SERVICES.find((item) => item.slug === relatedSlug))
    .filter((item): item is SpiritualHealingService => Boolean(item));
  const descriptionParts = service.paragraphs.map((paragraph) => paragraph.split("dedicated Hijama page"));

  return (
    <PageShell>
      <PageHero eyebrow="Spiritual healing service" title={service.name} intro={service.intro} image={service.image} />
      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6 text-foreground/80 font-light leading-relaxed">
              <h2 className="font-serif text-3xl md:text-4xl">About {service.name.toLowerCase()}</h2>
              {service.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraph}>
                  {descriptionParts[paragraphIndex].map((part, index) => (
                    <span key={`${index}-${part}`}>
                      {index > 0 ? <Link href="/spiritual-healing/hijama" className="text-accent underline underline-offset-4">Hijama page</Link> : null}
                      {part}
                    </span>
                  ))}
                </p>
              ))}
              <div className="border-t border-border pt-6">
                <h3 className="font-serif text-2xl">What to expect</h3>
                <ul className="mt-4 grid gap-3">
                  {service.includes.map((item) => <li key={item} className="border-b border-border pb-3">{item}</li>)}
                </ul>
              </div>
              <p className="text-sm">{service.format}</p>
            </div>
            <aside className="border border-border bg-background p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Enquiries</p>
              <h2 className="mt-4 font-serif text-3xl">Ask about {service.name.toLowerCase()}.</h2>
              <p className="mt-4 font-light leading-relaxed text-foreground/75">
                Share what you are looking for and any questions you would like to discuss before arranging a session.
              </p>
              <EnquiryDrawer
                source={`spiritual_healing_${service.slug.replaceAll("-", "_")}`}
                trigger={<Button className="mt-8 w-full rounded-none">Enquire about {service.name.toLowerCase()}</Button>}
              />
              <Link href="/contact" className="mt-5 block text-center text-sm text-accent underline underline-offset-4">
                Contact Home House
              </Link>
            </aside>
          </div>
        </Section>
      </Band>
      <Band className="border-t border-border">
        <Section>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Continue exploring</p>
            <h2 className="mt-4 font-serif text-4xl">Related healing practices</h2>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => (
              <li key={related.slug} className="border border-border p-5">
                <Link href={spiritualHealingPath(related.slug)} className="font-serif text-xl text-accent hover:underline">
                  {related.name}
                </Link>
                <p className="mt-2 text-sm font-light text-foreground/70">{related.intro}</p>
              </li>
            ))}
          </ul>
          <Link href="/spiritual-healing" className="mt-8 inline-block text-accent underline underline-offset-4">
            Back to spiritual healing in Norfolk
          </Link>
        </Section>
      </Band>
    </PageShell>
  );
}
