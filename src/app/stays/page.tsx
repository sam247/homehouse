import type { Metadata } from "next";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
  room1: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&q=80",
  room2: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
  room3: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
};

export const metadata: Metadata = {
  title: "Stays — Home House Homestead",
  description:
    "Bespoke stays in a peaceful Norfolk farmhouse. Solo guests, couples, families and small groups welcome.",
  openGraph: {
    title: "Stays — Home House Homestead",
    description: "Bespoke stays in a peaceful Norfolk farmhouse.",
    images: [IMG.hero],
    url: "/stays",
  },
  alternates: {
    canonical: "/stays",
  },
};

const rooms = [
  {
    img: IMG.room1,
    name: "Garden room",
    desc: "A bright, simple room overlooking the herb garden. Best for solo guests or couples seeking quiet.",
  },
  {
    img: IMG.room2,
    name: "Field room",
    desc: "A warm double room with views across open Norfolk fields and morning light.",
  },
  {
    img: IMG.room3,
    name: "Family loft",
    desc: "A flexible space suitable for small families or a pair travelling together.",
  },
];

const includes = [
  "Breakfast prepared with care, often from the garden",
  "Optional home-cooked dinners with seasonal organic produce",
  "Access to gardens, fields and wild spaces",
  "Optional 1-to-1 sessions on request",
  "Quiet rooms for rest, reading and reflection",
  "Tea, herbal infusions and homemade sourdough",
];

export default function StaysPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Stays"
        title="A bespoke stay, tailored to you."
        intro="Rooms are simple, warm and quiet. Stays are flexible — for a few nights of rest, a week of writing, or longer."
        image={IMG.hero}
      />
      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((r) => (
            <article key={r.name} className="reveal">
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-5">
                <img src={r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover kenburns" />
              </div>
              <h3 className="font-serif text-2xl mb-2">{r.name}</h3>
              <p className="text-foreground/75 font-light">{r.desc}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section className="border-t border-border">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What’s included</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Everything you need. Nothing in the way.
            </h2>
          </div>
          <ul className="reveal grid gap-3">
            {includes.map((i) => (
              <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 text-center reveal">
          <EnquiryDrawer
            source="stays"
            trigger={
              <Button className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                Book now
              </Button>
            }
          />
          <p className="mt-4 text-sm text-foreground/60">
            We tailor pricing to your visit — please get in touch.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
