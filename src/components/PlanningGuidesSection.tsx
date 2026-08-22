import Link from "next/link";

export type PlanningGuideLink = {
  href: string;
  label: string;
  description: string;
};

export const RETREAT_PLANNING_GUIDES: PlanningGuideLink[] = [
  {
    href: "/blog/how-to-plan-a-solo-retreat-in-norfolk",
    label: "How to plan a solo retreat in Norfolk",
    description: "Practical steps for dates, pace, and what to bring.",
  },
  {
    href: "/blog/can-you-go-on-a-retreat-alone",
    label: "Can you go on a retreat alone?",
    description: "Reassurance for guests wondering whether solo retreating is right for them.",
  },
  {
    href: "/blog/how-long-should-you-go-on-a-retreat-for",
    label: "How long should you go on a retreat for?",
    description: "Weekend, mid-length, and longer stays explained.",
  },
  {
    href: "/blog/retreat-or-guest-house-stay-in-norfolk",
    label: "Retreat or guest house stay?",
    description: "Compare retreat-led and accommodation-led breaks.",
  },
  {
    href: "/blog/what-is-a-homestead-retreat",
    label: "What is a homestead retreat?",
    description: "How a homestead stay differs from a hotel or formal retreat centre.",
  },
];

export const STAY_PLANNING_GUIDES: PlanningGuideLink[] = [
  {
    href: "/blog/what-is-a-homestead-retreat",
    label: "What is a homestead stay?",
    description: "Guest house hospitality in a lived-in Norfolk homestead.",
  },
  {
    href: "/blog/retreat-or-guest-house-stay-in-norfolk",
    label: "Retreat or guest house stay?",
    description: "Choose the right kind of countryside break.",
  },
  {
    href: "/blog/what-to-pack-for-a-countryside-retreat-in-norfolk",
    label: "What to pack for a countryside stay",
    description: "Seasonal packing for Norfolk countryside breaks.",
  },
  {
    href: "/blog/quiet-weekend-breaks-in-norfolk",
    label: "Quiet weekend breaks in Norfolk",
    description: "Ideas for a slower short stay.",
  },
];

export const HOLIDAY_PLANNING_GUIDES: PlanningGuideLink[] = [
  {
    href: "/blog/peaceful-norfolk-holidays-for-rest-and-reset",
    label: "Peaceful Norfolk holidays",
    description: "Rest-led holidays without a packed itinerary.",
  },
  {
    href: "/blog/quiet-weekend-breaks-in-norfolk",
    label: "Quiet weekend breaks in Norfolk",
    description: "Short countryside breaks for slower pace.",
  },
  {
    href: "/blog/what-to-pack-for-a-countryside-retreat-in-norfolk",
    label: "Packing for a countryside break",
    description: "Practical seasonal packing for Norfolk.",
  },
];

export function PlanningGuidesSection({
  title = "Planning guides",
  intro = "Useful articles if you are still deciding what kind of stay or retreat would suit you.",
  guides,
}: {
  title?: string;
  intro?: string;
  guides: PlanningGuideLink[];
}) {
  return (
    <div className="reveal mt-12 border-t border-border pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">{title}</p>
      <p className="max-w-3xl text-foreground/75 font-light leading-relaxed">{intro}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.href} className="border border-border p-6 bg-background/40">
            <Link href={guide.href} className="font-serif text-xl text-foreground hover:text-accent transition-colors">
              {guide.label}
            </Link>
            <p className="mt-2 text-sm text-foreground/70 font-light leading-relaxed">{guide.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
