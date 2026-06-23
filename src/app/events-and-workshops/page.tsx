import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { Button } from "@/components/ui/button";

const IMG = {
  hero: "/photos/fields.webp",
  garden: "/photos/garden-magnolia.webp",
  table: "/photos/table-orchard.webp",
  pond: "/photos/pond.webp",
};

export const metadata: Metadata = {
  title: "Events & Workshops — Home House Homestead",
  description:
    "Sound healing events, workshops, and bespoke retreats for women at Home House in the Norfolk countryside.",
  openGraph: {
    title: "Events & Workshops — Home House Homestead",
    description: "Events, workshops, and bespoke retreats for women at Home House.",
    images: [IMG.hero],
    url: "/events-and-workshops",
  },
  alternates: {
    canonical: "/events-and-workshops",
  },
};

const eveningForYouIf = [
  "Your heart needs to be nourished",
  "You want to be held in a safe and loving container to just be",
  "Your body and nervous system needs to reset and re-energise",
  "You are in need of healing in a gentle and organic way",
  "You want to experience what harmony in community feels like",
];

const energyExchange = [
  {
    price: "£35",
    title: "Sound healing",
    body: "Sound journey with fascia flow and breathwork.",
  },
  {
    price: "£45",
    title: "Sound healing + food & fire",
    body: "Includes a nourishing soup and homemade bread, and the fire gathering.",
  },
  {
    price: "£120",
    title: "Overnight stay",
    body: "Includes bed and breakfast in shared rooms and bathroom (4 spaces, 2 rooms).",
  },
];

const retreatOptions = [
  {
    price: "From £295",
    title: "1 Night / 2 Day Retreat",
    eyebrow: "Option 1 — A gentle starting point",
    includes: [
      "Accommodation at Home House",
      "All meals",
      "1 × 1–1 session with Hawa Amanda",
      "Time for rest, nature, and integration",
    ],
  },
  {
    price: "From £540",
    title: "2 Night / 3 Day Retreat",
    eyebrow: "Option 2 — Deeper immersion",
    includes: [
      "Accommodation",
      "All meals",
      "2 × 1–1 sessions",
      "Time for rest, nature, and integration",
    ],
  },
  {
    price: "From £795",
    title: "3 Night / 4 Day Retreat",
    eyebrow: "Option 3 — Deeper healing journey",
    includes: ["Accommodation", "All meals", "3 × 1–1 sessions", "Ongoing support and space for deeper integration"],
  },
];

const justBeSpaceTo = [
  "Rest and sleep deeply",
  "Walk in nature",
  "Read beneath the apple trees",
  "Journal, pray, or meditate",
  "Share stories around the fire",
  "Enjoy wholesome homemade food",
  "Sing, move, create",
  "Or simply do nothing at all but sleep and eat",
];

const justBeFor = [
  "The woman who is tired, worn out, and needs a rest",
  "The woman longing to exhale",
  "The woman craving simplicity, slowness, nature, warmth, and meaningful connection",
  "The woman who works long days and never stops",
  "The woman who spends all her time looking after her family and loved ones",
  "The woman who wants to be with other women in an organic, natural environment with no agenda other than to just be together",
  "The woman who longs to slow down enough to listen to her heart and deep inner wisdom",
];

const justBeOtherDates = [
  "14th to 16th August 2026",
  "18th to 20th September 2026",
];

const addOns = [
  "Additional 1–1 session — £90",
  "Sufi healing",
  "Breath and bodywork",
  "Holy hijama therapy",
  "Sacred sound healing",
  "Bliss body massage",
];

export default function EventsAndWorkshopsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events & Workshops"
        title="Gather. Rest. Be nourished."
        intro="Seasonal events, workshops, and bespoke retreats for women, held in the quiet rhythm of the Norfolk countryside."
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 items-start">
            <div className="md:col-span-2 reveal space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Upcoming retreat</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">JUST BE</h2>
                <p className="mt-4 text-foreground/75 font-light text-lg">A women’s rest retreat</p>
              </div>

              <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                <p>
                  Sometimes we need a few days away from daily life. A few gentle days to step away from the noise and
                  demands of everyday life and come HOME to yourself. Come HOME to your heart.
                </p>
                <p>
                  A space to rest. To breathe. To sleep deeply. To be nourished and cared for. To reconnect with
                  ourselves, nature, and softer rhythms.
                </p>
                <p>
                  JUST BE is a gentle women’s rest retreat here at Home House Homestead in the Norfolk countryside — a
                  retreat for women longing for space to simply be, without pressure, agenda, a schedule, or
                  expectation.
                </p>
                <p>
                  Looking for a private or accommodation-led retreat rather than a scheduled date? Visit{" "}
                  <Link href="/retreats" className="text-accent hover:underline">
                    Retreats
                  </Link>{" "}
                  or browse{" "}
                  <Link href="/stays" className="text-accent hover:underline">
                    Stays
                  </Link>
                  .
                </p>
              </div>

              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Space to</p>
                <ul className="grid gap-3">
                  {justBeSpaceTo.map((i) => (
                    <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                <p>
                  Optional practices may organically arise throughout our days together: movement, breathwork, prayer,
                  dhikr, music, creativity, storytelling, and quiet reflection. And maybe none of it may arise
                  depending on the needs of the group. Everything is invitational. Everything soft.
                </p>
                <p>
                  This is not a retreat about fixing yourself. It is a space to soften, exhale, and come HOME to
                  yourself.
                </p>
                <p>
                  There is also an invitation for less online use and more presence, connection, nature, and real rest
                  during our days together — an opportunity to put your phone in a box for your stay if that feels like
                  something you’d like to do as an intention. You can of course have it at any point for women
                  concerned about children, families, and people they care for.
                </p>
              </div>

              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">This retreat is for</p>
                <ul className="grid gap-3">
                  {justBeFor.map((i) => (
                    <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="reveal border border-border p-8">
              <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                <Image
                  src={IMG.pond}
                  alt="Pond at Home House"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover kenburns"
                />
              </div>
              <h3 className="mt-8 font-serif text-2xl mb-6">Details</h3>
              <div className="space-y-5 text-foreground/80 font-light">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Dates</p>
                  <p>3rd to 5th July 2026</p>
                  <p className="mt-1 text-sm text-foreground/70">Arrive from 4pm · Departure 4pm</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Group</p>
                  <p>A small intimate group each time</p>
                  <p className="mt-1 text-sm text-foreground/70">6 spaces available</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Accommodation</p>
                  <p>Shared twin rooms with single beds and shared bathroom</p>
                  <p className="mt-1 text-sm text-foreground/70">
                    Extra 2 spaces in a bell tent (available once rooms are all booked — £395 per person)
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Meals</p>
                  <p>All meals included</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Pricing</p>
                  <p className="text-sm text-foreground/70 font-light leading-relaxed mb-3">
                    I’m offering women who want to come a special rate of £355 for the July retreat. August and
                    September return to the original rate, with separate early bird dates for each retreat.
                  </p>
                  <div className="grid gap-3">
                    <div className="border border-border p-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-serif text-xl">July retreat (special rate)</p>
                        <p className="text-accent">£355</p>
                      </div>
                      <p className="mt-2 text-sm text-foreground/70">3rd to 5th July 2026</p>
                    </div>
                    <div className="border border-border p-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-serif text-xl">August retreat</p>
                        <p className="text-accent">£495 / £595</p>
                      </div>
                      <p className="mt-2 text-sm text-foreground/70">14th to 16th August 2026</p>
                      <p className="mt-1 text-sm text-foreground/70">Early bird price until 15th July</p>
                    </div>
                    <div className="border border-border p-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-serif text-xl">September retreat</p>
                        <p className="text-accent">£495 / £595</p>
                      </div>
                      <p className="mt-2 text-sm text-foreground/70">18th to 20th September 2026</p>
                      <p className="mt-1 text-sm text-foreground/70">Early bird price until 15th August</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Deposit</p>
                  <p>
                    Your place is reserved upon receipt of a £150 non-refundable deposit (or full payment if
                    preferred).
                  </p>
                  <p className="mt-1 text-sm text-foreground/70">Remaining balance due by 25th June.</p>
                </div>
                <div className="border border-border p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/60 mb-2">Bank details</p>
                  <p className="text-sm text-foreground/80">Amanda Grady</p>
                  <p className="text-sm text-foreground/80">Sort Code 403509</p>
                  <p className="text-sm text-foreground/80">A/C 14285417</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Other dates</p>
                  <ul className="grid gap-2">
                    {justBeOtherDates.map((d) => (
                      <li key={d} className="text-sm text-foreground/75 font-light border-b border-border pb-2">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <EnquiryDrawer
                  source="just_be_retreat"
                  trigger={
                    <Button className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                      Enquire about JUST BE
                    </Button>
                  }
                />
                <Button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full rounded-none bg-[#635bff] text-white hover:bg-[#635bff] h-12 px-8 font-light tracking-[0.18em] uppercase text-xs disabled:opacity-100 disabled:cursor-not-allowed"
                >
                  Pay with Stripe
                </Button>
                <p className="text-sm text-foreground/60">
                  Online Stripe payments for retreats are coming soon. For now, please email or message Hawa once you
                  have paid your deposit, or for any other questions.
                </p>
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="reveal space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Bespoke retreats</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">Bespoke retreats for women</h2>
              </div>
              <div className="text-foreground/80 font-light leading-relaxed space-y-4">
                <p>
                  I offer bespoke, in-person retreats for women at Home House, for those who feel called to come and
                  work with me more deeply.
                </p>
                <p>
                  Held in a peaceful and nurturing setting, these retreats are an invitation to slow down, soften, and
                  enter into a deeper process of healing, rest, and reconnection.
                </p>
                <p>
                  Each retreat is created around your individual needs. Your time here may include Sufi healing, breath
                  and bodywork, hijama, massage, sacred sound, as well as space to rest, be in nature, and simply be.
                </p>
                <p>
                  You are welcome to come alone, or with a sister, friend, or small group. Retreats can be held as
                  quiet, restorative stays, or as more guided and immersive healing experiences.
                </p>
              </div>
              <div className="reveal">
                <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                  <Image
                    src={IMG.table}
                    alt="Table set for supper at Home House"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover kenburns"
                  />
                </div>
              </div>
            </div>

            <div className="reveal space-y-8">
              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Enquiries & bookings</p>
                <p className="text-foreground/80 font-light leading-relaxed">
                  For enquiries or to begin a conversation about your retreat email{" "}
                  <a href="mailto:amandahummingbird@gmail.com" className="text-accent hover:underline">
                    amandahummingbird@gmail.com
                  </a>{" "}
                  or send a message on{" "}
                  <a href="tel:+447760885562" className="text-accent hover:underline">
                    07760 885562
                  </a>
                  .
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Retreat investment</p>
                <div className="grid gap-6">
                  {retreatOptions.map((o) => (
                    <div key={o.title} className="border border-border p-8">
                      <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">{o.eyebrow}</p>
                      <div className="mt-3 flex items-baseline justify-between gap-6">
                        <h3 className="font-serif text-2xl">{o.title}</h3>
                        <p className="text-accent">{o.price}</p>
                      </div>
                      <ul className="mt-5 grid gap-2">
                        {o.includes.map((i) => (
                          <li key={i} className="text-sm text-foreground/75 font-light border-b border-border pb-2">
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Optional add-ons</p>
                <ul className="grid gap-2">
                  {addOns.map((i) => (
                    <li key={i} className="text-sm text-foreground/75 font-light border-b border-border pb-2">
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-foreground/75 font-light leading-relaxed">
                  Small group retreats can be created for you. Please get in touch to explore options and pricing.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 items-start">
            <div className="md:col-span-2 reveal space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Upcoming event</p>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight">Garden of Sound</h2>
                <p className="mt-4 text-foreground/75 font-light text-lg">A sound healing experience</p>
              </div>

              <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
                <p>Ana and Amanda are beyond excited to be bringing you this event.</p>
                <p>
                  Set at Home House, a beautiful English old flint house nestled in the countryside, surrounded by a
                  mature and abundant garden, this gathering invites you into a space of deep rest, connection, and
                  subtle transformation.
                </p>
                <p>
                  Ok, so, we start gently: Amanda will lead a fascia flow and Ana will guide a nourishing breathwork
                  practice — all easy joyful practices to enliven your sense of vitality. From this pleasant sense of
                  connection, you will be guided into a live sound healing journey.
                </p>
                <p>
                  If the weather allows, we will lie together in the gorgeous garden — picture evening light, a rich
                  soundscape of voice and instruments, and the evening song of birds in springtime. If not, we will
                  gather inside the warm, intimate space of Home House and be deeply held in soft candlelight.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="reveal">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                    <Image
                      src={IMG.garden}
                      alt="Garden at Home House"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover kenburns"
                    />
                  </div>
                </div>
                <div className="reveal">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">The soundscape</p>
                  <h3 className="font-serif text-3xl leading-tight">Voice, prayer, and living instrumentation.</h3>
                  <p className="mt-4 text-foreground/80 font-light leading-relaxed">
                    Ana and Amanda weave together voice, prayer, and instrumentation into a living, intuitive sound
                    journey. Together, they create an evolving soundscape using piano, harmonium, crystal and Tibetan
                    bowls, drum, ukulele, guitar, and voice — a meeting of elements: earth, water, fire, and air; of
                    classical and intuitive.
                  </p>
                </div>
              </div>

              <div className="reveal space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">Closing the evening</p>
                <p className="text-foreground/80 font-light leading-relaxed">
                  After the journey, you will have a space to ground and connect. You can enjoy the garden and connect
                  to the Earth, or share and connect with the other participants. For those who choose to stay on, we
                  will be offering a nourishing soup and homemade bread, prepared with love, which you can enjoy around
                  the fire.
                </p>
              </div>

              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">This evening is for you if</p>
                <ul className="grid gap-3">
                  {eveningForYouIf.map((i) => (
                    <li key={i} className="border-b border-border pb-3 text-foreground/85 font-light">
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-foreground/80 font-light">A quiet, powerful collaboration and a space to receive.</p>
              </div>

              <div className="reveal space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">About the hosts</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="border border-border p-8">
                    <h3 className="font-serif text-2xl mb-3">Amanda</h3>
                    <div className="text-foreground/80 font-light leading-relaxed space-y-4">
                      <p>
                        Amanda brings a lifelong devotion to music, beginning with classical piano at the age of four
                        and continuing into formal studies in music and voice.
                      </p>
                      <p>
                        After almost two decades away from piano and voice, she rediscovered them through her healing
                        and medicine songs inspired by Native American tradition — songs still sung today in Forrest
                        Yoga ceremonies all over the world.
                      </p>
                      <p>
                        She has landed on the Sufi Path of Love, bringing the transmissions of Sufi prayers and sacred
                        divine qualities that radiate healing into the heart and soul.
                      </p>
                    </div>
                  </div>
                  <div className="border border-border p-8">
                    <h3 className="font-serif text-2xl mb-3">Ana</h3>
                    <div className="text-foreground/80 font-light leading-relaxed space-y-4">
                      <p>
                        Ana has always had an intimate relationship with music and a natural musical ability. She also
                        lost her voice for over a decade, rediscovering it through ancient Romanian songs and deep
                        connection with nature.
                      </p>
                      <p>
                        She channels sounds from nature and melodies that move through her heart and soul, offering an
                        intuitive soundscape aligned with the timeless musical essence that flows through humans.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="reveal border border-border p-8 sticky top-28">
              <h3 className="font-serif text-2xl mb-6">Details</h3>
              <div className="space-y-5 text-foreground/80 font-light">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Location</p>
                  <p>Home House, NR19 2QU</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-1">Spaces</p>
                  <p>Limited to 22 participants</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Energy exchange</p>
                  <div className="grid gap-3">
                    {energyExchange.map((p) => (
                      <div key={p.title} className="border border-border p-5">
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="font-serif text-xl">{p.title}</p>
                          <p className="text-accent">{p.price}</p>
                        </div>
                        <p className="mt-2 text-sm text-foreground/70">{p.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href="https://www.tickettailor.com/events/anadreams1/2173701"
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <Button className="w-full rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                    Book tickets
                  </Button>
                </a>
                <Button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="w-full rounded-none bg-[#635bff] text-white hover:bg-[#635bff] h-12 px-8 font-light tracking-[0.18em] uppercase text-xs disabled:opacity-100 disabled:cursor-not-allowed"
                >
                  Pay with Stripe
                </Button>
                <p className="text-sm text-foreground/60">
                  Online Stripe payments for events are coming soon. Questions before booking? Use the enquiry button
                  below and we’ll come back to you.
                </p>
              </div>
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl reveal">Enquire about events or retreats</h2>
          <p className="mt-6 text-foreground/75 font-light reveal max-w-xl mx-auto">
            Share what you’re looking for and we’ll come back to you with options, availability, and next steps.
          </p>
          <div className="mt-10 reveal">
            <EnquiryDrawer
              source="events_and_workshops"
              trigger={
                <Button className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 px-8 font-light tracking-[0.18em] uppercase text-xs">
                  Enquire
                </Button>
              }
            />
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
