import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GuideFooter() {
  return (
    <section className="border border-border bg-background/40 p-6 md:p-8 reveal">
      <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Planning a stay</div>
      <p className="mt-3 text-foreground/80 font-light leading-relaxed">
        Home House Homestead offers peaceful retreats, guest house stays, and slower countryside breaks in rural
        Norfolk. If this guide has helped you think through what you need, explore our{" "}
        <Link href="/retreats" className="text-accent hover:underline">
          retreats
        </Link>
        ,{" "}
        <Link href="/stays" className="text-accent hover:underline">
          guest house stays
        </Link>
        , or{" "}
        <Link href="/contact" className="text-accent hover:underline">
          send an enquiry
        </Link>{" "}
        to ask about dates.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button asChild variant="outline" className="text-xs uppercase tracking-[0.25em]">
          <Link href="/retreats">Retreats in Norfolk</Link>
        </Button>
        <Button asChild variant="outline" className="text-xs uppercase tracking-[0.25em]">
          <Link href="/stays">Guest house stays</Link>
        </Button>
      </div>
    </section>
  );
}
