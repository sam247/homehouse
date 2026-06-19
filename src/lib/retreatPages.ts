export type RetreatLandingData = {
  slug: string;
  navLabel: string;
  metadataTitle: string;
  metadataDescription: string;
  heroTitle: string;
  heroIntro: string;
  summary: string[];
  bestFor: string[];
  includes: string[];
  whyHomeHouse: string[];
  faq: Array<{ q: string; a: string }>;
};

export const RETREAT_PAGE_IMAGE = "/photos/fields.webp";

export const RETREAT_PAGES: RetreatLandingData[] = [
  {
    slug: "womens-retreats-norfolk",
    navLabel: "Women's retreats",
    metadataTitle: "Women's Retreats in Norfolk | Home House Homestead",
    metadataDescription:
      "Small-group women's retreats in Norfolk for rest, reconnection, nourishing food, nature, and slower living at Home House Homestead.",
    heroTitle: "Women's retreats in Norfolk for rest, softness, and reconnection.",
    heroIntro:
      "Explore small-group women's retreats at Home House Homestead in rural Norfolk, shaped around deep rest, meaningful connection, and time close to the land.",
    summary: [
      "Women's retreats at Home House Homestead are designed for people who need space to step out of everyday demands and return to a gentler rhythm. They are intimate rather than corporate, personal rather than polished, and rooted in warmth, care, food, conversation, and time in nature.",
      "Some retreats are scheduled events with shared dates and a clear theme. Others begin as a conversation and become a more bespoke stay shaped around what you need most from your time away.",
    ],
    bestFor: [
      "Women who feel overstretched and need a genuine pause",
      "Guests seeking a smaller and more personal retreat setting",
      "People drawn to nature, conversation, stillness, and nourishing food",
      "Women who want a Norfolk retreat without a rushed programme",
    ],
    includes: [
      "Peaceful accommodation at the homestead",
      "Time outdoors in gardens, fields, and the wider Norfolk countryside",
      "Nourishing meals and a slower pace of living",
      "A warm personal welcome and space to settle at your own rhythm",
    ],
    whyHomeHouse: [
      "Home House suits women looking for a retreat that feels lived-in and calming rather than heavily scheduled. Guests often choose it because it feels safe, gentle, and grounded.",
      "If you want to see current dates, the best next step is to browse Events & Workshops. If you want to talk about a more personal retreat stay, send an enquiry and we can guide you.",
    ],
    faq: [
      {
        q: "What are women's retreats like at Home House Homestead?",
        a: "Women's retreats at Home House are small, personal, and rooted in rest, nourishment, and connection. They are designed to feel calm and human rather than formal or overly structured.",
      },
      {
        q: "Do you offer scheduled women's retreat dates in Norfolk?",
        a: "Yes. Some retreats are offered on set dates and are listed on the Events & Workshops page. Others may be discussed as more bespoke stays depending on availability.",
      },
      {
        q: "Are these retreats suitable if I come alone?",
        a: "Yes. Many women come alone and find the quieter, smaller setting especially supportive.",
      },
    ],
  },
  {
    slug: "solo-retreats-norfolk",
    navLabel: "Solo retreats",
    metadataTitle: "Solo Retreats in Norfolk | Quiet Countryside Stays",
    metadataDescription:
      "Plan a solo retreat in Norfolk with a peaceful countryside stay at Home House Homestead. Ideal for rest, reflection, reading, walking, and quiet time.",
    heroTitle: "Solo retreats in Norfolk for quiet time, rest, and reflection.",
    heroIntro:
      "Home House Homestead offers a calm setting for solo retreats in Norfolk, with peaceful rooms, open countryside, nourishing meals, and space to breathe.",
    summary: [
      "A solo retreat does not need to mean isolation. At Home House, solo guests often come because they want distance from noise, screens, pressure, and decision fatigue, while still being held within a warm and welcoming setting.",
      "This kind of stay is well suited to people who want to read, write, walk, pray, journal, sleep deeply, or simply spend a few days with less external demand.",
    ],
    bestFor: [
      "Solo guests who need quiet without feeling cut off",
      "People planning a restorative few days away from work or family routines",
      "Guests seeking a nature-based retreat in the Norfolk countryside",
      "Writers, creatives, and reflective travellers who need headspace",
    ],
    includes: [
      "A peaceful farmhouse room and simple home comforts",
      "Gardens, fields, and room to walk and sit outdoors",
      "Meals and hosting that reduce the need to organise everything yourself",
      "An unhurried setting that supports reflection and recovery",
    ],
    whyHomeHouse: [
      "Solo retreat guests often choose Home House because it offers the quiet they want without the impersonality of a hotel. It is a place where you can be left in peace while still feeling cared for.",
      "If you want a more accommodation-led break, visit Stays. If you want to see shared retreat dates, browse Events & Workshops.",
    ],
    faq: [
      {
        q: "Is Home House Homestead suitable for a solo retreat?",
        a: "Yes. It is especially well suited to solo guests who want peace, countryside, and a gentler pace of life.",
      },
      {
        q: "What do people do on a solo retreat in Norfolk?",
        a: "Guests often read, walk, rest, journal, pray, enjoy the gardens, and take time away from their usual routines.",
      },
      {
        q: "Can I come for a solo retreat even if I do not want a formal programme?",
        a: "Yes. Many solo guests prefer the stay to remain quiet and lightly held rather than structured around a detailed itinerary.",
      },
    ],
  },
  {
    slug: "private-retreats-norfolk",
    navLabel: "Private retreats",
    metadataTitle: "Private Retreats in Norfolk | Small Groups & Bespoke Stays",
    metadataDescription:
      "Plan a private retreat in Norfolk for a friend, sister, or small group at Home House Homestead. Bespoke countryside stays in a calm and personal setting.",
    heroTitle: "Private retreats in Norfolk for small groups and bespoke stays.",
    heroIntro:
      "Create a private retreat at Home House Homestead for a friend, sister, or small group looking for a quieter and more personal countryside setting.",
    summary: [
      "Private retreats at Home House work well for people who want shared time together without booking a generic venue. The setting suits small groups who value calm, food, conversation, and a slower rhythm over a packed schedule.",
      "These stays can be lighter-touch countryside retreats or more intentionally restorative gatherings, depending on what you want from the time away.",
    ],
    bestFor: [
      "Friends or sisters planning a restorative few days together",
      "Small groups who prefer a private house setting to a large venue",
      "Guests wanting a bespoke Norfolk retreat rather than a fixed package",
      "People looking for a nurturing base for conversation, walking, and rest",
    ],
    includes: [
      "A more personal and intimate setting for a small retreat group",
      "Flexible stay planning around dates, meals, and pace",
      "Access to the land, gardens, and quiet shared spaces",
      "A host-led environment that feels warm and human rather than corporate",
    ],
    whyHomeHouse: [
      "Private retreats at Home House are most valuable for groups who want the atmosphere of a home and homestead rather than a formal retreat centre. That makes the experience feel calmer, more connected, and less performative.",
      "If you are planning a simpler group break, Stays may also be relevant. For existing live retreat dates, visit Events & Workshops.",
    ],
    faq: [
      {
        q: "Can I book a private retreat in Norfolk for a small group?",
        a: "Yes. Home House is well suited to small, private retreat stays where guests want a calm and personal environment.",
      },
      {
        q: "What size group works best for a private retreat at Home House?",
        a: "Smaller groups are the best fit, particularly those who value intimacy, conversation, and a gentle pace rather than a large event setup.",
      },
      {
        q: "Can private retreats be tailored to what we need?",
        a: "Yes. The aim is to shape the stay around the kind of rest, space, and rhythm your group is looking for.",
      },
    ],
  },
  {
    slug: "rest-retreats-norfolk",
    navLabel: "Rest retreats",
    metadataTitle: "Rest Retreats in Norfolk | Restorative Countryside Breaks",
    metadataDescription:
      "Find a rest retreat in Norfolk at Home House Homestead. A restorative countryside stay for deep rest, fresh air, simple comforts, and slower living.",
    heroTitle: "Rest retreats in Norfolk for deep rest and a slower rhythm.",
    heroIntro:
      "Home House Homestead is a natural fit for people seeking a rest retreat in Norfolk, with peaceful rooms, nourishing meals, countryside quiet, and space to exhale.",
    summary: [
      "A rest retreat is often less about doing more and more about removing what drains you. At Home House, that means peaceful accommodation, simple care, fresh air, good food, and room for your system to slow down.",
      "This page is for guests who are not necessarily searching for a workshop or a heavily guided programme, but who know they need proper rest in a setting that supports it.",
    ],
    bestFor: [
      "Guests feeling depleted, overwhelmed, or overbooked",
      "People looking for a restorative break in the Norfolk countryside",
      "Anyone wanting space to sleep, read, walk, and reset",
      "Guests who prefer a quiet homestead setting to a busy hotel",
    ],
    includes: [
      "Calm rooms and slower mornings",
      "Homestead hospitality and nourishing meals",
      "Time outdoors in a peaceful rural setting",
      "A retreat format that can stay simple and restorative",
    ],
    whyHomeHouse: [
      "Rest retreats work especially well at Home House because the setting is naturally supportive of slowing down. Guests can rest without pressure to perform wellness or fill every hour with activity.",
      "If you want a fully scheduled retreat date, visit Events & Workshops. If you mainly want accommodation, visit Stays.",
    ],
    faq: [
      {
        q: "What is a rest retreat?",
        a: "A rest retreat is a stay designed around recovery, quiet, nourishment, and time away from demands rather than around a busy schedule of activities.",
      },
      {
        q: "Do I need to join a programme to book a rest retreat in Norfolk?",
        a: "No. Many guests simply want a peaceful environment, fresh air, and a chance to slow down properly.",
      },
      {
        q: "How is a rest retreat different from a hotel break?",
        a: "At Home House, the emphasis is on a more personal and restorative environment with a slower pace, countryside setting, and a feeling of being gently cared for.",
      },
    ],
  },
];

export function getRetreatPageBySlug(slug: string) {
  return RETREAT_PAGES.find((page) => page.slug === slug);
}
