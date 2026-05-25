"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { EnquiryDrawer } from "./EnquiryDrawer";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname?.startsWith(to));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-xl tracking-wide text-foreground hover:text-accent transition-colors"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`text-sm font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors ${
                isActive(item.to) ? "text-accent" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <EnquiryDrawer
            trigger={
              <Button
                variant="outline"
                className="hidden sm:inline-flex border-foreground/30 bg-transparent text-foreground hover:bg-foreground hover:text-background rounded-none px-5"
              >
                Enquire
              </Button>
            }
          />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-foreground p-2"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="flex flex-col p-6 gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={`font-serif text-2xl text-foreground/90 ${
                  isActive(item.to) ? "text-accent" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
