import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-[var(--deep)] text-foreground/80 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl text-foreground mb-3">
            {SITE.name}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed font-light">
            {SITE.tagline} A space to come home to yourself, gently and in your
            own time.
          </p>
          <p className="mt-6 text-sm">{SITE.location}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-accent hover:underline"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-4">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link href={n.to} className="hover:text-foreground transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-4">
            Retreats
          </p>
          <ul className="space-y-2 text-sm font-light">
            <li><Link href="/events" className="hover:text-foreground transition-colors">Retreats & workshops</Link></li>
            <li><Link href="/events" className="hover:text-foreground transition-colors">Hire the homestead</Link></li>
            <li><Link href="/events" className="hover:text-foreground transition-colors">Community gatherings</Link></li>
            <li><Link href="/stays" className="hover:text-foreground transition-colors">Bespoke stays</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Enquire</Link></li>
          </ul>
        </div>


        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-4">
            Stay connected
          </p>
          <p className="text-sm font-light mb-4">
            Occasional notes from the homestead.
          </p>
          <form
            className="flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Email"
              className="bg-transparent border-foreground/30 rounded-none placeholder:text-foreground/50"
            />
            <Button
              type="submit"
              className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-foreground/60">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Crafted with care in Norfolk.</p>
        </div>
      </div>
    </footer>
  );
}
