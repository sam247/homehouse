"use client";

import { useEffect, useRef } from "react";
import { EnquiryDrawer } from "./EnquiryDrawer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = 0.6;
    const onEnded = () => {
      v.currentTime = 0;
      void v.play();
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[var(--deep)]">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={SITE.heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[var(--deep)]/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep)]/55 via-[var(--deep)]/35 to-[var(--deep)]/80" />



      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-foreground/80 mb-6 reveal">
          Norfolk · Guest House & Homestead
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.05] text-foreground max-w-4xl reveal">
          Home is in <em className="text-accent not-italic font-normal">your heart.</em>
        </h1>
        <p className="mt-8 max-w-xl text-base sm:text-lg font-light text-foreground/85 leading-relaxed reveal">
          A peaceful countryside guest house nestled in the heart of the Norfolk
          landscape. A space to come home to yourself — slowly, gently, in your own time.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 reveal">
          <EnquiryDrawer
            source="hero"
            trigger={
              <Button className="h-12 px-8 rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-light tracking-[0.18em] uppercase text-xs">
                Book now
              </Button>
            }
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-foreground/60 text-[10px] uppercase tracking-[0.3em]">
        Scroll
      </div>
    </section>
  );
}
