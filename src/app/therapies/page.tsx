import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHero, Band, Section } from "@/components/PageShell";
import { EnquiryDrawer } from "@/components/EnquiryDrawer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/siteUrl";

const IMG = {
  hero: "/photos/PHOTO3.jpeg",
  offeringOne: "/photos/PHOTO4.jpeg",
  offeringTwo: "/photos/PHOTO5.jpeg",
  sound: "/photos/PHOTO6.jpeg",
  hijama: "/photos/PHOTO5.jpeg",
};

export const metadata: Metadata = {
  title: {
    absolute: "Therapies & Healing Sessions in Norfolk | Home House Homestead",
  },
  description:
    "Sufi healing, breath and bodywork, sacred sound, and Holy Hijama for women with Hawa Hummingbird at Home House or online.",
  openGraph: {
    title: "1-to-1 Therapies and Healing with Hawa Hummingbird | Home House",
    description:
      "Sufi healing, breath and bodywork, sacred sound, and Holy Hijama for women with Hawa Hummingbird at Home House or online.",
    images: [IMG.hero],
    url: "/therapies",
  },
  alternates: { canonical: "/therapies" },
};

const therapySections = [
  {
    title: "Sufi Healing",
    paragraphs: [
      "Heart-centred spiritual healing held in prayer and guided by the Divine Light of the Creator.",
      "Rooted in an ancient Sufi healing lineage, these sessions offer a sacred space for softening, release, insight and remembrance, supporting you to listen more deeply to the wisdom of your heart and open to profound and deep healing on physical, emotional and spiritual levels.",
      "Sufi healing is a gentle and sacred space that works at the level of the heart, soul, and spirit. It is not simply energetic healing, but a deeper unfolding and opening into Divine presence and light allowing what is held and hidden within to unveil, open, soften, release, and return to Oneness.",
      "It can be especially supportive for those carrying trauma, grief, stress, or long-held emotional pain. Through Sufi prayer, the remembrance of Divine qualities, and a deeply held, heart-based presence, you are gently supported to release patterns, beliefs, and stored experiences held within the body, the nervous system, and the heart.",
      "The resonance of sacred sound works deeply, speaking to the water within us, softening and transforming what is held. This work meets you at a deep level of the heart and soul, softening layers of pain, fear, and disconnection. As these layers begin to release, there is a natural opening to qualities such as love, peace, clarity, truth and inner stillness, guided by what God knows you need.",
      "Nothing is forced. Everything unfolds at the pace you need. We are not given anything we cannot bear.",
      "Many experience deep emotional release, insight into destructive patterns, healing of root issues, a gentle inner calming, and a quiet reconnection to the truth within their hearts and the wisdom of the Divine.",
      "This work can sit alongside other forms of support, including therapy and medical care. It is a gentle and profound journey home to yourself. Home is in your heart.",
    ],
  },
  {
    title: "Breath & Bodywork",
    paragraphs: [
      "Held through intuitive, compassionate touch and the profound simplicity of learning to breathe more fully and efficiently.",
      "As the breath deepens and the nervous system begins to settle, a greater awareness of and connection with the body can begin to unfold. Patterns of tension, held emotion and protective holding may gradually soften and release at a pace led by you, creating more space, ease and flow within the body.",
      "Bodywork is a form of somatic communication through conscious, therapeutic touch. Working with the fascia, the responsive web of connective tissue that runs throughout the body, this approach listens closely to what your body is ready to soften, open and release, moment by moment.",
      "The breath becomes a powerful guide within the session. You are gently supported to become aware of your breathing patterns, where the breath flows freely, and where there may be restriction, tension or holding.",
      "As the breath begins to open and soften, a natural sense of lightness, clarity and spaciousness can emerge within the body, mind and emotions. Sessions may focus particularly on the jaw, head, face, neck, diaphragm and belly — areas where physical tension and the effects of stress and emotional experience are often felt and held.",
      "Through guided breath and intuitive touch, the body is supported to let go of what it no longer needs to carry, rediscover a more natural and spacious way of breathing, and reconnect with a deeper sense of ease, presence and inner safety.",
      "This work can support physical wellbeing, emotional balance, nervous system regulation, body awareness and a greater sense of grounded presence in everyday life.",
    ],
  },
  {
    title: "Sacred Sound Bathing",
    paragraphs: [
      "Held within the sacred space of Sufi prayer and remembrance of the Divine qualities, voice, Tibetan singing bowls, harmonium, drum and other instruments are woven together to create an immersive journey through sound.",
      "The vibrations invite the body to soften, the mind to quieten and the heart to open, creating space for deep rest, reflection, prayer and connection with the Divine.",
      "Sacred sound is a doorway into the heart. Through voice, vibration and devotional song, this work invites a deep softening of the body, nervous system and heart.",
      "Sound can take us beyond the thinking mind and into a more spacious experience of listening and receiving. Sessions may include the singing and remembrance of Divine qualities, intuitive voice and tonal sound, Tibetan singing bowls, harmonium, piano, drum and other subtle vibrational instruments — each woven intuitively into the session according to what is being called for in the moment.",
      "This is a space to lie back, receive and rest deeply, to feel, to listen, to experience and to be met where you are — guiding you to a gentle return to the heart, to remembrance, and to the presence of the Divine.",
    ],
  },
  {
    title: "Holy Hijama Therapy",
    paragraphs: [
      "A traditional form of wet cupping held within the Sufi healing lineage in which I have been trained.",
      "Holy Hijama brings together the ancient practice of cupping with prayer, intention and spiritual healing, creating a deeply held and restorative experience for body, heart and spirit.",
      "Traditionally used as a practice of cleansing and wellbeing, each treatment is offered with care, reverence and attention to the individual needs of the one who is receiving.",
      "This form of Holy Hijama has been passed through a Sufi lineage that includes the teachings of the Sufi Master Sheikh Mohammed Al Jamal Ar Rifai of the Shadhuliyyah Sufi Order.",
      "Sessions are held gently and prayerfully, with the intention of creating a safe and sacred space for release, renewal, remembrance and healing.",
    ],
    list: [
      "muscular tension and areas of physical holding",
      "relaxation and a greater sense of ease in the body",
      "circulation and general physical wellbeing",
      "stress and nervous-system settling",
      "emotional release and a sense of clearing",
      "renewed vitality and clarity",
      "spiritual cleansing, prayer and remembrance",
    ],
  },
];

const faqs = [
  {
    q: "Where are sessions held?",
    a: "Healing sessions are available by arrangement at Home House for local clients, as part of stays and retreats, and online for those further afield.",
  },
  {
    q: "Are therapies medical treatment?",
    a: "These are complementary spiritual and body-based offerings, not a replacement for medical or mental health care. Please seek appropriate professional support when needed.",
  },
  {
    q: "How long is a session?",
    a: "Sessions last approximately 60–90 minutes, allowing space for what is needed for each person and each session.",
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
        mainEntity: faqs.map((item) => ({
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
        title="1-to-1 Therapies and Healing with Hawa Hummingbird"
        intro="In person at Home House and online"
        image={IMG.hero}
      />

      <Band variant="cream">
        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="reveal space-y-5 text-foreground/80 font-light leading-relaxed">
              <p>
                Rooted in the Sufi path of love, the space I hold for healing begins with the remembrance that all
                healing comes from the Divine Source of all creation.
              </p>
              <p>
                I hold space for those whose hearts are longing to experience greater wholeness and love; to soften
                into healing, surrender into being held, and rest within a safe and sacred space.
              </p>
              <p>To return home, within the heart.</p>
              <div className="aspect-[16/10] overflow-hidden rounded-sm">
                <img src={IMG.hero} alt="Healing space in the garden at Home House" className="h-full w-full object-cover" />
              </div>
              <p>
                This healing space is not about fixing yourself or forcing change. It is about softening, listening and
                allowing what has been held within the body, mind and heart to gently reveal itself and release, as the
                veils that separate us from truth, wisdom and unity begin to lift.
              </p>
              <p>
                It is an invitation to let go of the need to chase, fight, run away or constantly make life different;
                to gently meet and tend to the parts of ourselves that have learned these ways of being, and welcome
                them back into wholeness.
              </p>
              <p>
                Through presence, breath, touch and sound, we open to the light of the One — the Creator — creating
                space for healing, remembrance and a deeper connection with the Divine.
              </p>
              <p>
                Through Sufi healing, breath and bodywork, somatic and embodiment practices, sacred sound, and
                nurturing hands-on therapies including massage and Holy Hijama for women, I hold space for healing
                across mind, body, heart and soul — gently welcoming the different parts of ourselves back towards
                wholeness.
              </p>
            </div>
            <aside className="reveal border border-border p-8 bg-background">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Ways to work together</p>
              <ul className="grid gap-3 text-sm font-light text-foreground/80">
                <li className="border-b border-border pb-3">In-person 1-to-1 sessions at Home House Homestead</li>
                <li className="border-b border-border pb-3">Online 1-to-1 video sessions</li>
                <li className="border-b border-border pb-3">Bespoke 1-to-1 retreats at Home House Homestead</li>
                <li className="border-b border-border pb-3">Small group sessions at Home House Homestead</li>
              </ul>
              <EnquiryDrawer
                source="therapies_intro"
                trigger={<Button className="mt-8 rounded-none w-full">Book a healing session</Button>}
              />
            </aside>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section>
          <div className="max-w-3xl reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Offerings</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Healing across mind, body, heart and soul.</h2>
            <p className="mt-6 text-foreground/75 font-light leading-relaxed">
              The intention behind my offerings is to support you through the places where you may feel stuck — within
              your life, your body, your mind or your heart.
            </p>
            <p className="mt-4 text-foreground/75 font-light leading-relaxed">
              My prayer is that you experience being cared for, nourished, nurtured and held within Divine healing
              presence and light. It is an honour for me to stand and walk alongside you in your healing journey.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={IMG.offeringOne} alt="Healing offering in the Home House garden" className="h-full w-full object-cover" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={IMG.offeringTwo} alt="A peaceful healing space at Home House" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="mt-12 grid gap-8">
            {therapySections.map((therapy) => (
              <article key={therapy.title} className="reveal border border-border p-8 md:p-10">
                <h3 className="font-serif text-3xl md:text-4xl leading-tight">{therapy.title}</h3>
                <div className="mt-6 space-y-4 text-foreground/75 font-light leading-relaxed">
                  {therapy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {therapy.list ? (
                    <>
                      <p>Hijama may be experienced as supportive for:</p>
                      <ul className="grid gap-2 pl-5 list-disc">
                        {therapy.list.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                      <p>
                        Each session is guided with care, intention and respect for the body&apos;s natural responses and
                        boundaries. Sufi prayers are offered throughout the treatment, inviting Divine light, protection
                        and blessing into the space.
                      </p>
                      <p>
                        Holy Hijama is held not simply as a physical treatment, but as a holistic practice for body,
                        heart and soul — an opportunity to soften, release, receive and return more deeply to the Divine.
                      </p>
                    </>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={IMG.sound} alt="Harmonium prepared for sacred sound" className="h-full w-full object-cover" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img src={IMG.hijama} alt="A peaceful treatment setting at Home House" className="h-full w-full object-cover" />
            </div>
          </div>
        </Section>
      </Band>

      <Band variant="cream" className="border-t border-border">
        <Section>
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Ways to work with Hawa</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Choose the shape of support that feels right.</h2>
              <ul className="mt-8 grid gap-3 text-[var(--deep)]/85 font-light">
                <li className="border-b border-[var(--deep)]/15 pb-3">In-person 1-to-1 sessions at Home House Homestead</li>
                <li className="border-b border-[var(--deep)]/15 pb-3">Online 1-to-1 video sessions</li>
                <li className="border-b border-[var(--deep)]/15 pb-3">Bespoke 1-to-1 retreats at Home House Homestead</li>
                <li className="border-b border-[var(--deep)]/15 pb-3">Small group sessions at Home House Homestead</li>
              </ul>
            </div>
            <div className="reveal border border-[var(--deep)]/15 p-8 text-[var(--deep)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--clay)] mb-4">Sessions</p>
              <h3 className="font-serif text-3xl">1-to-1 sessions</h3>
              <p className="mt-4 font-light leading-relaxed">£111 per session</p>
              <p className="mt-3 font-light leading-relaxed">
                Sessions last approximately 60–90 minutes, allowing space for what is needed for each person and each
                session.
              </p>
              <p className="mt-3 font-light leading-relaxed">Discounted rates are available when booking a block of 4 or more sessions.</p>
              <div className="mt-8 border-t border-[var(--deep)]/15 pt-6">
                <h3 className="font-serif text-2xl">Group sessions</h3>
                <ul className="mt-4 grid gap-2 font-light">
                  <li>2 people — £100 per person</li>
                  <li>3 people — £80 per person</li>
                  <li>4 people — £75 per person</li>
                  <li>5 people or more — £65 per person</li>
                </ul>
              </div>
              <p className="mt-6 font-light leading-relaxed">
                All sessions are shaped around the needs of the individual or group. Rather than following a fixed
                format, each session may draw from any of the therapies and practices within my offerings.
              </p>
              <EnquiryDrawer
                source="therapies_booking"
                trigger={<Button className="mt-8 rounded-none w-full">Book a session</Button>}
              />
              <p className="mt-3 text-sm font-light">Please enquire about block session discounts.</p>
            </div>
          </div>
        </Section>
      </Band>

      <Band className="border-t border-border">
        <Section className="max-w-4xl">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Frequently asked questions</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Therapy questions.</h2>
          </div>
          <div className="mt-12 grid gap-6">
            {faqs.map((item) => (
              <article key={item.q} className="reveal border border-border p-8">
                <h3 className="font-serif text-2xl leading-tight">{item.q}</h3>
                <p className="mt-4 text-foreground/75 font-light leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm font-light">
            <Link href="/stays" className="text-accent hover:underline">Explore accommodation</Link>
            <Link href="/womens-retreats" className="text-accent hover:underline">Women&apos;s retreats</Link>
            <Link href="/contact" className="text-accent hover:underline">Contact Home House</Link>
          </div>
        </Section>
      </Band>
    </PageShell>
  );
}
