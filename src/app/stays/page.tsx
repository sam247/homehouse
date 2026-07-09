import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { RoomGalleryLightbox } from "@/components/stays/RoomGalleryLightbox";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "/photos/stays/front_of_house/IMG_9931.jpeg",
  room1: "/photos/stays/image5.jpeg",
  room2: "/photos/stays/single_bedroom_bathroom/IMG_8881.jpeg",
  room3: "/photos/stays/single_bedroom_bathroom/IMG_8881.jpeg",
  includesLivingRoom:
    "/photos/stays/living_room/D900715B-7F64-4196-8A2C-7D0DC5746FC0-56a29761-05a0-47b7-86d2-f1414f1355fe.jpeg",
  roseRoom1: "/photos/stays/rose_room/5658BF93-B6A4-4716-B7B9-7E19750D254D-IMG_5665.jpeg",
  roseRoom2: "/photos/stays/rose_room/D109197E-9FA5-4CC9-BEC7-5F46519F97E1-5d4cfadf-4474-4e86-9ffd-3cf6406a0897.jpeg",
  roseRoom3: "/photos/stays/rose_room/F8B9A04D-18A8-47AE-BA4D-4EE8844E1525-IMG_5689.jpeg",
};

export const metadata: Metadata = {
  title: "Guest House Stays at Home House Homestead | Norfolk Countryside",
  description:
    "Hosted guest house stays in the Norfolk countryside with home-cooked meals included, for quiet breaks, reflective weekends, and small group stays at Home House Homestead.",
  openGraph: {
    title: "Guest House Stays at Home House Homestead | Norfolk Countryside",
    description:
      "Hosted guest house stays in the Norfolk countryside with home-cooked meals included, for quiet breaks, reflective weekends, and small group stays at Home House Homestead.",
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
    name: "The Rose Room",
    desc: "A space to soften, open, and receive. The Rose Room can be set as a double, twin or triple bed.",
    gallery: [IMG.roseRoom1, IMG.roseRoom2, IMG.roseRoom3],
  },
  {
    img: IMG.room2,
    name: "The Lavender Room",
    desc: "A space for rest, restoration and peaceful sleep. The Lavender Room can be set as a double, twin or triple bed.",
  },
  {
    img: IMG.room3,
    name: "The Elderflower Room",
    desc: "A space for wisdom, resilience, and connection to the land. The Elderflower Room can be set as a double or twin.",
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
        eyebrow="Stays"
        title="Guest House Stays at Home House Homestead"
        intro="Hosted guest house stays in the Norfolk countryside for solo guests, couples, families, and small groups — with home-cooked meals included."
        image={IMG.hero}
      />
      <Band variant="cream">
        <Section>
          <div className="reveal max-w-5xl space-y-5 text-foreground/75 font-light leading-relaxed mb-10">
            <p>
              Home House Homestead offers hosted guest house stays in the Norfolk countryside for solo guests, couples,
              families, and small groups looking for a more personal alternative to a hotel or standard holiday
              accommodation.
            </p>
            <p>
              Some guests book a simple countryside break or quiet weekend away. Others come for a private retreat,
              scheduled event, healing stay, or a restorative few days away from the pace of everyday life.
            </p>
            <p>
              Whether you are seeking rest, nature, space to reflect, or time to reconnect, Home House offers a slower,
              more nourishing kind of stay.
            </p>
            <p>All stays at Home House are hosted and include home-cooked meals prepared with care.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((r) => (
              <article key={r.name} className="reveal">
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-5">
                  <img src={r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover kenburns" />
                </div>
                {r.gallery ? <RoomGalleryLightbox roomName={r.name} images={r.gallery} /> : null}
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
                <p className="mt-1 text-sm text-foreground/70 font-light">£75 per person, per night · Includes all meals</p>
              </div>
              <div className="border-b border-border pb-3">
                <p className="text-foreground/85 font-light">Single occupancy room</p>
                <p className="mt-1 text-sm text-foreground/70 font-light">£125 per night · Includes all meals</p>
              </div>
              <div className="border-b border-border pb-3 md:col-span-2">
                <p className="text-foreground/85 font-light">Children aged 5-13</p>
                <p className="mt-1 text-sm text-foreground/70 font-light">
                  £45 per person, per night when sharing a room with a parent or guardian · Includes all meals
                </p>
              </div>
              <div className="border-b border-border pb-3 md:col-span-2">
                <p className="text-foreground/85 font-light">Teens aged 13–17</p>
                <p className="mt-1 text-sm text-foreground/70 font-light">
                  £60 per person, per night when sharing a room with a parent or guardian · Includes all meals
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="font-serif text-2xl mb-4">A stay at Home House may be right for you if you are looking for:</h3>
              <ul className="grid gap-3 max-w-3xl">
                <li className="border-b border-border pb-3 text-foreground/85 font-light">
                  a peaceful Norfolk countryside break with a more personal, hosted feel
                </li>
                <li className="border-b border-border pb-3 text-foreground/85 font-light">
                  a quiet place to rest, reflect, and step away from busy daily life
                </li>
                <li className="border-b border-border pb-3 text-foreground/85 font-light">
                  a simple retreat-style stay with nourishing meals and access to nature
                </li>
                <li className="border-b border-border pb-3 text-foreground/85 font-light">
                  accommodation for a private retreat, healing stay, or small group gathering
                </li>
              </ul>
              <p className="mt-6 max-w-3xl text-sm text-foreground/70 font-light leading-relaxed">
                If you are mainly looking for retreat options, visit{" "}
                <Link href="/retreats" className="text-accent hover:underline">
                  the Retreats page
                </Link>
                . If you are interested in a longer stay, private retreat, or group booking, please{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  get in touch
                </Link>{" "}
                to discuss what may be possible.
              </p>
            </div>
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
                  src={IMG.includesLivingRoom}
                  alt="Living room at Home House Homestead"
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
