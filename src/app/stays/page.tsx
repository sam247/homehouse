import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { PlanningGuidesSection, STAY_PLANNING_GUIDES } from "@/components/PlanningGuidesSection";
import { StaysPhotoGallery } from "@/components/stays/StaysPhotoGallery";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "/photos/stays/front_of_house/IMG_9931.jpeg",
  includes: "/photos/whats_included.jpeg",
  roseRoom: "/photos/rose_room.jpeg",
  lavenderRoom: "/photos/lavendar_room.jpeg",
  bluebellRoom: "/photos/stays/rose_room/5658BF93-B6A4-4716-B7B9-7E19750D254D-IMG_5665.jpeg",
};

const houseGallery = [
  { src: "/photos/livingroom1.jpeg", alt: "Living room at Home House" },
  { src: "/photos/livingroom2.jpeg", alt: "Sitting area at Home House" },
  { src: "/photos/kitchen1.jpeg", alt: "Kitchen at Home House" },
  { src: "/photos/kitchen2.jpeg", alt: "Kitchen table at Home House" },
  { src: "/photos/conservatory1.jpeg", alt: "Conservatory at Home House" },
  { src: "/photos/conservatory2.jpeg", alt: "Conservatory seating at Home House" },
  { src: "/photos/bathroom1.jpeg", alt: "Bathroom at Home House" },
  { src: "/photos/bathroom2.jpeg", alt: "Bathroom details at Home House" },
];

export const metadata: Metadata = {
  title: "Retreat and Nourishing Stays in Norfolk | Home House Homestead",
  description:
    "Hosted retreats and nourishing stays with home-cooked meals in the Norfolk countryside. Intimate stays for women, couples and small groups at Home House Homestead.",
  openGraph: {
    title: "Retreat and Nourishing Stays in Norfolk | Home House Homestead",
    description:
      "Hosted retreats and nourishing stays with home-cooked meals in the Norfolk countryside. Intimate stays for women, couples and small groups at Home House Homestead.",
    images: [IMG.hero],
    url: "/stays",
  },
  alternates: {
    canonical: "/stays",
  },
};

const rooms = [
  {
    img: IMG.roseRoom,
    name: "The Rose Room",
    desc: "A space for opening, blossoming and receiving. Can be set as a twin, double or triple.",
  },
  {
    img: IMG.lavenderRoom,
    name: "The Lavender Room",
    desc: "A space for rest, restoration and peaceful sleep. Can be set as a twin, double or triple.",
  },
  {
    img: IMG.bluebellRoom,
    name: "The Bluebell Room",
    desc: "A space for stillness, renewal and the quiet unfolding of something new. Can be set as a twin or double.",
  },
];

const includes = [
  "Breakfast prepared with love and care, often using freshly harvested produce from the garden",
  "Home-cooked meals made with seasonal, organic ingredients",
  "Tea, coffee, herbal infusions, and homemade sourdough",
  "Access to the gardens, fields, surrounding countryside, and Norfolk beaches",
  "Quiet spaces for rest, reading, writing, reflection, meditation, and prayer",
  "Optional 1-to-1 healing sessions and treatments by arrangement",
  "A slower pace of life and a warm, personal welcome",
];

export default function StaysPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Accommodation"
        title="Retreat and Nourishing Stays at Home House Homestead"
        intro="Hosted retreats and nourishing stays with delicious home-cooked meals in the Norfolk countryside. Home House was created for women, couples and small groups that are looking for somewhere to rest, be cared for, looked after and something more personal and intimate."
        image={IMG.hero}
      />
      <Band variant="cream">
        <Section>
          <div className="reveal max-w-5xl space-y-5 text-foreground/75 font-light leading-relaxed mb-10">
            <p>
              Home House Homestead offers intimate, hosted stays and bespoke retreats in the peaceful Norfolk
              countryside. A more personal and nourishing alternative to a hotel or standard holiday accommodation.
            </p>
            <p>
              Come alone for a few days of rest and retreat, come as a couple to reconnect in beautiful serene
              surroundings, or gather as small group for time away together and/or healing.
            </p>
            <p>
              Some guests simply want somewhere beautiful and peaceful to rest, eat well, walk, read, pray, create and
              be looked after. Others choose to shape their stay into a more personal retreat, perhaps adding a Sufi
              healing, bodywork, sound or breath session with Hawa.
            </p>
            <p>
              Home House can also be privately booked as an intimate venue for facilitators wishing to host their own
              retreats, circles or gatherings.
            </p>
            <p>
              Whether you are seeking deep rest, connection with nature, spiritual nourishment, space to reflect and
              heal or a beautiful retreat home rooted in Sufi values, Home House offers a slower and more personal way
              to stay.
            </p>
            <p>
              All stays are hosted by Hawa and include lovingly prepared home-cooked meals, using organic ingredients
              wherever possible and seasonal produce from the Home House garden.
            </p>
            <p>There is no fixed retreat programme unless you would like one.</p>
            <p>Your stay can be as simple, spacious or supported as you need it to be.</p>
          </div>
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
          <div className="reveal mt-12 border-t border-border pt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Accommodation rates</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-b border-border pb-3">
                <p className="text-foreground/85 font-light">Shared twin room</p>
                <p className="mt-1 text-sm text-foreground/70 font-light">£100 per night · Includes all meals</p>
              </div>
              <div className="border-b border-border pb-3">
                <p className="text-foreground/85 font-light">Single occupancy room</p>
                <p className="mt-1 text-sm text-foreground/70 font-light">£175 per night · Includes all meals</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-sm text-foreground/70 font-light leading-relaxed">
              If you are mainly looking for scheduled retreat options, visit{" "}
              <Link href="/womens-retreats" className="text-accent hover:underline">
                Women&apos;s Retreats
              </Link>
              . If you are interested in a longer stay, private retreat, or group booking, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                get in touch
              </Link>{" "}
              to discuss what may be possible.
            </p>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">What’s included</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Everything you need for a slower, more nourishing stay in the Norfolk countryside.
              </h2>
              <div className="mt-8 aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src={IMG.includes}
                  alt="What's included at Home House Homestead"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <ul className="reveal grid gap-3">
              {includes.map((i) => (
                <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <StaysPhotoGallery title="Around the house" photos={houseGallery} />
          <PlanningGuidesSection guides={STAY_PLANNING_GUIDES} />
          <div className="mt-16 text-center reveal">
            <EnquiryDrawer
              source="stays"
              trigger={
                <Button className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                  Book now
                </Button>
              }
            />
            <p className="mt-4 text-sm text-foreground/60">Please get in touch to arrange your stay.</p>
            <p className="mt-2 text-sm text-foreground/60">
              Want a retreat-led stay instead? Visit{" "}
              <Link href="/retreats" className="text-accent hover:underline">
                our Norfolk retreats page
              </Link>
              . Want the broader quiet-break view first? See{" "}
              <Link href="/norfolk-holidays" className="text-accent hover:underline">
                Norfolk holidays
              </Link>
              .
            </p>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
