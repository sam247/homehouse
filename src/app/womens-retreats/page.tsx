import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/fields.webp",
  justBe: "/photos/pond.webp",
  bespoke: "/photos/bespokeretreatsforwomen.jpeg",
};

const retreatPhotos = [
  ["/photos/retreats_images/CCFA2E72-4FE9-48F0-98F9-DFD8AB1F08AD-IMG_0306.jpeg", "Women gathering at Home House"],
  ["/photos/retreats_images/0F44D814-5D83-48A6-ACE3-F2347E334B85-Image%2012-07-2026%20at%2006.24.jpeg", "Retreat time in the garden"],
  ["/photos/retreats_images/3CD0346C-1693-45AC-9B72-FEFD953B4701-IMG_0288.jpeg", "A quiet retreat moment"],
  ["/photos/retreats_images/B75F9F1D-B190-4931-9D6E-939E26F6B3D0-IMG_0319.jpeg", "Rest and connection at Home House"],
  ["/photos/retreats_images/2ABEB1AB-AAA4-4B20-ACDB-EFCA77CDD48F-Image%2012-07-2026%20at%2006.27.jpeg", "Time close to nature"],
  ["/photos/retreats_images/13B822BA-F846-4F4F-AF9F-D25F2792D907-IMG_0285.jpeg", "A nourishing retreat gathering"],
  ["/photos/retreats_images/E2A2BCA0-1D16-4B68-ADB0-36AB5B913694-IMG_5917.jpeg", "A space to soften and rest"],
  ["/photos/retreats_images/D6B0CDD4-164A-4D06-8680-AAFE2CBA7F34-IMG_5926.jpeg", "Retreat practice in nature"],
  ["/photos/retreats_images/48ABC645-34F9-42A9-BD22-E3A7BC229B9E-IMG_0279.jpeg", "Women sharing time together"],
  ["/photos/retreats_images/407F631E-C969-4181-A109-1049E9DA8831-Image%2012-07-2026%20at%2006.22.jpeg", "The garden at Home House"],
  ["/photos/retreats_images/AAFBA15B-1AD2-434B-8983-5DBA130749B6-IMG_5943.jpeg", "A gentle retreat setting"],
  ["/photos/retreats_images/F47F61B1-44BD-4564-897B-37ADA0DDA66B-Image%2012-07-2026%20at%2006.33.jpeg", "Restorative time outdoors"],
  ["/photos/retreats_images/E03364E1-CC42-4012-A882-93D46244EA30-IMG_9411%204.jpeg", "Home House retreat space"],
];

export const metadata: Metadata = {
  title: {
    absolute: "Women’s Retreats in Norfolk for Healing, Rest and Reconnection | Home House",
  },
  description:
    "Bespoke women’s retreats at Home House Homestead shaped around healing, deep rest, meaningful connection, nature and remembering who you truly are.",
  openGraph: {
    title: "Women’s Retreats in Norfolk for Healing, Rest and Reconnection",
    description:
      "Bespoke women’s retreats at Home House Homestead shaped around healing, deep rest, meaningful connection, nature and remembering who you truly are.",
    images: [IMG.hero],
    url: "/womens-retreats",
  },
  alternates: { canonical: "/womens-retreats" },
};

const spaceTo = [
  "Rest and sleep in a peaceful sanctuary",
  "Walk in nature",
  "Read beneath the apple trees",
  "Journal, pray or meditate",
  "Share stories around the fire",
  "Enjoy wholesome homemade food, often from organic garden to table",
  "Sing, move, create",
  "Book 1-to-1 healing time and counsel with Hawa",
  "Or simply do nothing at all but sleep and eat",
];

const justBeFor = [
  "The woman who is tired, worn out, and needs a rest",
  "The woman longing to exhale",
  "The woman craving simplicity, slowness, nature, warmth and meaningful connection",
  "The woman who works long days and never stops",
  "The woman who spends all her time caring for and looking after others, her family and loved ones",
  "The woman who is standing on the bridge of uncertainty and becoming",
  "The woman who wants to be with other women in an organic, natural environment, a home away from home, with no other agenda than to just be together",
  "The woman who longs to slow down enough to listen to her heart and the deep inner wisdom longing to be heard",
];

const practices = [
  "movement",
  "breathwork",
  "prayer",
  "dhikr",
  "music",
  "creativity",
  "storytelling",
  "quiet reflection",
];

const bespokeOptions = [
  {
    title: "Option 1 — 2 Night / 3 Day Retreat",
    price: "From £555 for one woman in a private room · From £375 per person sharing",
    days: [
      "Day 1 — Arrival and settling in; opening ceremony and intention setting; evening guided meditation, prayer or dhikr",
      "Day 2 — Morning breathwork, somatic embodiment and gentle movement; afternoon one-to-one or group healing session; time for rest, reflection and integration",
      "Day 3 — Morning breathwork and somatic movement, or a sacred sound bath; closing ceremony, reflection and gentle guidance for what you may wish to carry home",
    ],
  },
  {
    title: "Option 2 — 3 Night / 4 Day Retreat",
    price: "From £750 for one woman in a private room · From £525 per person sharing",
    days: [
      "Day 1 — Arrival and time to settle in; opening ceremony and intention setting; evening guided meditation, prayer or dhikr",
      "Day 2 — Morning breathwork, somatic embodiment and gentle movement; afternoon one-to-one or group healing session; time for rest, reflection and integration",
      "Day 3 — Morning sacred sound, breathwork or gentle movement; afternoon healing session, life and spiritual counsel, creative practice or time in nature; evening meditation, dhikr or quiet reflection",
      "Day 4 — Gentle morning practice; closing ceremony and reflection; life and spiritual counsel around what you may wish to carry home with you",
    ],
  },
];

export default function WomensRetreatsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/womens-retreats`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Women’s Retreats", item: pageUrl },
    ],
  };

  return (
    <PageShell>
      <SeoJsonLd data={jsonLd} />
      <PageHero
        eyebrow="Women’s Retreats"
        title="Women’s Retreats in Norfolk for healing, rest, reconnection and remembering"
        intro="Bespoke women’s retreats at Home House Homestead shaped around your individual and group needs, providing healing, deep rest, meaningful connection, time close to nature and remembering who you truly are beyond your roles and identities."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Sometimes we need a few gentle days away from the noise and demands of everyday life to come HOME to
                ourselves.
              </p>
              <p>A space to slow down, soften our hearts and open to a deeper listening for the longing within.</p>
              <p>
                Home House becomes a sacred womb space for women in seasons of becoming. There are times in life when
                we find ourselves between what has been and what is yet to come: a relationship ends, our bodies are
                changing, or a chapter closes and we find ourselves standing on the bridge of uncertainty.
              </p>
              <p>
                The familiar falls away. We may have forgotten who we are, or realise that what we are doing no longer
                lights up our soul. We feel tired, tender, uncertain, or simply in need of space to reflect, listen and
                ‘just be’.
              </p>
              <p>
                These seasons can feel like darkness, but darkness is also where new life begins. A seed grows in the
                fertile shadows of the soil. A baby grows in the darkness and safety of the womb. Something new is often
                formed in the unseen long before it comes to light.
              </p>
              <p>
                Just Be Retreats are created for women who need rest, space and the experience of being cared for — for
                women moving through these sacred in-between places.
              </p>
            </div>
            <aside className="reveal border border-border p-8 bg-background">
              <div className="aspect-[16/10] overflow-hidden rounded-sm">
                <img src={IMG.justBe} alt="The garden at Home House" className="h-full w-full object-cover" />
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-accent mb-4">Enquire about a JUST BE retreat</p>
              <p className="text-sm font-light text-foreground/80 leading-relaxed">
                Create a Just Be Retreat for yourself, with a friend or in a small group.
              </p>
              <EnquiryDrawer
                source="womens_retreats_just_be"
                trigger={<Button className="mt-6 rounded-none w-full">Enquire about a JUST BE retreat</Button>}
              />
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Home House offers a peaceful, nurturing sanctuary to step away from everyday life, rest deeply,
                reconnect with yourself and God, and allow what is unfolding within you to emerge in its own time.
              </p>
              <p>There is nothing to achieve here. You do not need to arrive with answers.</p>
              <p>
                You can simply rest, breathe, pray, walk on the land, eat nourishing food, receive healing, create,
                sleep, be silent, or talk. This is your time to sit back and receive. To be the one who is cared for.
              </p>
              <p>
                Your retreat is shaped around what you need and may include Sufi healing, life and spiritual counsel,
                breathwork, bodywork, sacred sound, gentle somatic movement and embodiment, prayer, creativity and time
                in nature.
              </p>
              <p>
                Home House is a sacred womb. A space to soften. A space to surrender. A space to listen. A space to
                remember who you are and who you are becoming, beyond the roles and identities you have gathered
                throughout your life.
              </p>
              <p>A space to come HOME to your true self. A space to come HOME to your heart.</p>
              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Space to</p>
                <ul className="grid gap-3">
                  {spaceTo.map((item) => <li key={item} className="border-b border-border pb-3">{item}</li>)}
                </ul>
              </div>
              <p>
                Practices may arise organically and be offered in the moment throughout your days together — {practices.join(", ")}.
                And perhaps none of these will arise at all. It depends entirely on the needs of the group and what feels
                present in the moment.
              </p>
              <p>Everything is invitational. Everything is gentle. We respond to what is needed, staying deeply present to you and to the group.</p>
              <p>
                This is not a retreat about fixing yourself. It is a space to soften, exhale, and come <strong className="font-normal">HOME to yourself</strong>.
              </p>
              <p>
                There is also an invitation to spend less time online and more time in presence, connection, nature and
                real rest. If it feels supportive, you are welcome to place your phone in a box for part or all of your
                stay as an intention to disconnect from the outside world and reconnect with yourself.
              </p>
              <p>Your phone will always be available whenever you need it, especially for women who need to stay connected with children, family members or others in their care.</p>
            </div>
            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">This retreat is for</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                {justBeFor.map((item) => <li key={item} className="border-b border-border pb-3">{item}</li>)}
              </ul>
            </aside>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Suggested Just Be Retreat</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">3 Nights / 4 Days</h2>
              <p className="mt-6 text-[var(--deep)]/80 font-light leading-relaxed">A gentle, nourishing retreat with space to rest, receive and be cared for.</p>
            </div>
            <div className="reveal border border-[var(--deep)]/15 p-8 text-[var(--deep)]">
              <div className="grid gap-5 font-light">
                <div className="border-b border-[var(--deep)]/15 pb-4"><p className="font-serif text-xl">Private room</p><p>£200 per night · £600 total</p><p className="text-sm">All meals included</p></div>
                <div className="border-b border-[var(--deep)]/15 pb-4"><p className="font-serif text-xl">Shared room</p><p>£125 per person, per night · £375 per person total</p><p className="text-sm">All meals included</p></div>
                <div><p className="font-serif text-xl">Optional healing sessions with Hawa</p><p className="mt-2">One-to-one session — £111 per person</p><p className="mt-2">Group sessions: 2 people — £100 per person · 3 people — £80 per person · 4 people — £75 per person · 5 people or more — £65 per person</p></div>
              </div>
              <p className="mt-6 text-sm font-light">Sessions may include Sufi healing, breathwork, bodywork, sacred sound, somatic movement, life and spiritual counsel, prayer or dhikr, depending on what feels most supportive.</p>
              <EnquiryDrawer source="womens_retreats_just_be_pricing" trigger={<Button className="mt-8 rounded-none w-full">Enquire about a JUST BE retreat</Button>} />
            </div>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Next section</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Bespoke Healing Retreats for Women</h2>
              <div className="text-foreground/80 font-light leading-relaxed space-y-4">
                <p>I offer bespoke, in-person healing retreats for women at Home House for those who feel called to work with me more deeply around a particular intention, transition, pattern or area of healing.</p>
                <p>Held within the peaceful and nurturing sanctuary of Home House, these retreats are an invitation to slow down, soften and enter into a deeper process of healing, rest, reconnection and remembering.</p>
                <p>Each retreat is created around your individual needs and intention. We begin with a consultation call to explore what is bringing you here, where you may be feeling stuck or called towards change, and what kind of support would feel most nourishing for your heart, body and soul.</p>
                <p>From there, we shape a retreat that may include Sufi healing, life and spiritual counsel, breathwork, bodywork, sacred sound, movement, prayer, dhikr, creativity, time in nature and deep rest.</p>
                <p>You are welcome to come alone, or with a sister, mother, friend or small intimate group (maximum of 6 women).</p>
                <p>These retreats are more guided and immersive than the Just Be Retreats, offering dedicated space to go more deeply into a particular area of your life, healing or spiritual journey.</p>
              </div>
              <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                <img src={IMG.bespoke} alt="Bespoke healing retreats for women" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="reveal space-y-6">
              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Suggested retreat options</p>
                {bespokeOptions.map((option) => (
                  <div key={option.title} className="border-b border-border py-6 first:pt-0 last:border-b-0 last:pb-0">
                    <h3 className="font-serif text-2xl">{option.title}</h3>
                    <p className="mt-3 text-sm text-accent font-light">{option.price}</p>
                    <ul className="mt-4 grid gap-3 text-sm text-foreground/75 font-light">{option.days.map((day) => <li key={day}>{day}</li>)}</ul>
                  </div>
                ))}
              </div>
              <p className="text-foreground/75 font-light leading-relaxed">These are suggested frameworks only. Your retreat will be shaped around your individual needs, intentions and what feels most supportive during your time at Home House.</p>
              <p className="text-sm text-foreground/65 font-light leading-relaxed">Prices include accommodation, all meals, consultation, sacred space holding throughout, guided practices, healing sessions and life and spiritual counsel. Final pricing may vary depending on the number of women attending and the level of one-to-one support included.</p>
              <EnquiryDrawer source="womens_retreats_bespoke" trigger={<Button className="rounded-none w-full">Enquire about a bespoke healing retreat</Button>} />
            </div>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="reveal max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Retreat images</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">A glimpse of retreat life at Home House.</h2>
          </div>
          <div className="mt-12 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {retreatPhotos.map(([src, alt]) => (
              <div key={src} className="mb-4 break-inside-avoid overflow-hidden rounded-sm">
                <img src={src} alt={alt} loading="lazy" className="w-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm font-light">
            <Link href="/therapies" className="text-accent hover:underline">Explore therapies and 1-to-1 sessions</Link>
            <Link href="/stays" className="text-accent hover:underline">Explore accommodation</Link>
            <Link href="/reviews" className="text-accent hover:underline">Read guest reviews</Link>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
