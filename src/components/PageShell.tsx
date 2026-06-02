"use client";

import { Suspense } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {image && (
        <>
          <div
            className="absolute inset-0 kenburns bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </>
      )}
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-foreground/70 mb-6 reveal">
          {eyebrow}
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] reveal">
          {title}
        </h1>
        {intro && (
          <p className="mt-8 max-w-2xl mx-auto text-lg font-light text-foreground/80 leading-relaxed reveal">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function Band({
  variant = "default",
  children,
  className = "",
}: {
  variant?: "default" | "cream";
  children: React.ReactNode;
  className?: string;
}) {
  const theme =
    variant === "cream"
      ? "bg-background text-foreground [--background:var(--cream)] [--foreground:var(--deep)] [--card:var(--cream)] [--card-foreground:var(--deep)] [--popover:var(--cream)] [--popover-foreground:var(--deep)] [--secondary:var(--cream)] [--secondary-foreground:var(--deep)] [--muted:var(--cream)] [--muted-foreground:oklch(0.32_0.025_180_/_0.7)] [--border:oklch(0.32_0.025_180_/_0.18)] [--input:oklch(0.32_0.025_180_/_0.22)]"
      : "bg-background text-foreground";

  return <div className={`${theme} ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Zigzag({
  eyebrow,
  title,
  body,
  image,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  image: string;
  reverse?: boolean;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div className={`reveal ${reverse ? "md:order-2" : ""}`}>
        <div className="aspect-[4/5] overflow-hidden rounded-sm">
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover kenburns" />
        </div>
      </div>
      <div className="reveal">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">{eyebrow}</p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{title}</h2>
        <div className="font-light leading-relaxed space-y-4 opacity-80">{body}</div>
      </div>
    </div>
  );
}
