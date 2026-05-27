import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, MapPin } from "lucide-react";
import { gaEvent } from "@/lib/analytics/ga4";
import { TrackedAnchor } from "@/components/TrackedAnchor";

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
          <TrackedAnchor
            href={`mailto:${SITE.email}`}
            event="email_click"
            params={{ placement: "footer" }}
            className="text-sm text-accent hover:underline"
          >
            {SITE.email}
          </TrackedAnchor>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 mb-4">
            Explore
          </p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  href={n.to}
                  className="hover:text-foreground transition-colors"
                  onClick={() => gaEvent("nav_click", { to: n.to, label: n.label, menu: "footer" })}
                >
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
            <li>
              <Link href="/events-and-workshops" className="hover:text-foreground transition-colors" onClick={() => gaEvent("nav_click", { to: "/events-and-workshops", label: "Retreats & workshops", menu: "footer" })}>
                Retreats & workshops
              </Link>
            </li>
            <li>
              <Link href="/events-and-workshops" className="hover:text-foreground transition-colors" onClick={() => gaEvent("nav_click", { to: "/events-and-workshops", label: "Hire the homestead", menu: "footer" })}>
                Hire the homestead
              </Link>
            </li>
            <li>
              <Link href="/events-and-workshops" className="hover:text-foreground transition-colors" onClick={() => gaEvent("nav_click", { to: "/events-and-workshops", label: "Community gatherings", menu: "footer" })}>
                Community gatherings
              </Link>
            </li>
            <li>
              <Link href="/stays" className="hover:text-foreground transition-colors" onClick={() => gaEvent("nav_click", { to: "/stays", label: "Bespoke stays", menu: "footer" })}>
                Bespoke stays
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground transition-colors" onClick={() => gaEvent("nav_click", { to: "/contact", label: "Book now", menu: "footer" })}>
                Book now
              </Link>
            </li>
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
            onSubmit={(e) => {
              e.preventDefault();
              gaEvent("newsletter_submit", { placement: "footer" });
            }}
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
          <div className="flex items-center gap-4">
            <p>Crafted with care in Norfolk.</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.google.com/search?sca_esv=cdb5a6f2b39051e1&biw=1920&bih=972&sxsrf=ANbL-n5KBnLLDqWRJ3RvCkzFzWHdpYroNg%3A1779876268563&kgmid=%2Fg%2F11ywlljc6j&q=Home%20House%20Homestead&shem=rimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Funi%2Fm1%2F1&kgs=022d1e81e8befe69"
                target="_blank"
                rel="noreferrer"
                aria-label="Home House Homestead on Google"
                title="Home House Homestead on Google"
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => gaEvent("outbound_click", { destination: "google_profile" })}
              >
                <MapPin size={16} />
              </a>
              <a
                href="https://www.instagram.com/homehouse888"
                target="_blank"
                rel="noreferrer"
                aria-label="Home House Homestead on Instagram"
                title="Home House Homestead on Instagram"
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => gaEvent("outbound_click", { destination: "instagram" })}
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
