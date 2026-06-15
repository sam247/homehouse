import type { Metadata } from "next";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "/photos/stays/front_of_house/IMG_9931.jpeg",
  room1: "/photos/stays/single_bedroom_bathroom/IMG_8880.jpeg",
  room2: "/photos/stays/single_bedroom_bathroom/IMG_8884.jpeg",
  room3: "/photos/stays/single_bedroom_bathroom/IMG_8888.jpeg",
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

const stayGallery = [
  "/photos/stays/front_of_house/IMG_9931.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8879.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8880.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8881.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8882.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8883.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8884.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8885.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8886.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8887.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8888.jpeg",
  "/photos/stays/single_bedroom_bathroom/IMG_8889.jpeg",
  "/photos/stays/image4.jpeg",
  "/photos/stays/image5.jpeg",
  "/photos/stays/image6.jpeg",
];

const rooms = [
  {
    img: IMG.room1,
    name: "Peaceful bedroom",
    desc: "A simple, restful room with soft light and space to properly slow down.",
  },
  {
    img: IMG.room2,
    name: "Home comforts",
    desc: "Thoughtful details, calm interiors, and a warm atmosphere that helps you settle in gently.",
  },
  {
    img: IMG.room3,
    name: "Private bathroom",
    desc: "Clean, comfortable facilities that keep your stay easy, practical, and relaxed.",
  },
];

const includes = [
  "Breakfast prepared with care, often using produce from the garden",
  "Home-cooked meals with seasonal organic produce",
  "Access to gardens, fields, surrounding countryside and Norfolk beaches",
  "Optional 1-to-1 sessions and treatments by arrangement",
  "Quiet spaces for rest, reading, writing, reflection, meditation and prayer",
  "Tea, herbal infusions and homemade sourdough",
  "A slower pace of life and a warm personal welcome",
];

export default function StaysPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Stays"
        title="A bespoke stay, tailored to you."
        intro="Rooms are simple, comfortable, and peaceful. Stays are flexible - for a few nights of rest, a week of creative work or reflection, or longer."
        image={IMG.hero}
      />
      <Band variant="cream">
        <Section>
          <p className="reveal text-foreground/75 font-light leading-relaxed max-w-2xl mb-10">
            Enjoy the slower rhythm of life at Home House Homestead.
          </p>
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
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Gallery</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">A glimpse of the rooms.</h2>
            </div>
            <p className="reveal text-foreground/75 font-light leading-relaxed">
              A few photographs from around the house, bedroom, and bathroom spaces - each stay is simple, warm, and
              made for rest.
            </p>
          </div>
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {stayGallery.map((src, i) => (
              <div key={src} className="mb-4 break-inside-avoid overflow-hidden rounded-sm reveal">
                <img
                  src={src}
                  alt={`Home House stay photo ${i + 1}`}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What’s included</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Everything you need. Nothing in the way.</h2>
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
            <p className="mt-4 text-sm text-foreground/60">We tailor pricing to your visit — please get in touch.</p>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
