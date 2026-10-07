"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SPIRITUAL_HEALING_SERVICES, spiritualHealingPath } from "@/lib/spiritualHealing";

export function SpiritualHealingTabs() {
  return (
    <div className="mt-10">
      <Tabs defaultValue={SPIRITUAL_HEALING_SERVICES[0].slug}>
        <TabsList aria-label="Explore spiritual healing services" className="h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
          {SPIRITUAL_HEALING_SERVICES.map((service) => (
            <TabsTrigger
              key={service.slug}
              value={service.slug}
              className="h-auto rounded-none border border-border px-4 py-3 text-sm font-light data-[state=active]:bg-[var(--deep)] data-[state=active]:text-white"
            >
              {service.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {SPIRITUAL_HEALING_SERVICES.map((service) => (
          <TabsContent key={service.slug} value={service.slug} className="mt-6 border border-border p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl">{service.name}</h3>
                <p className="mt-3 max-w-2xl text-foreground/75 font-light leading-relaxed">{service.intro}</p>
              </div>
              <Link href={spiritualHealingPath(service.slug)} className="text-accent underline underline-offset-4">
                Explore {service.name}
              </Link>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SPIRITUAL_HEALING_SERVICES.map((service) => (
          <li key={service.slug} className="border border-border p-5">
            <Link href={spiritualHealingPath(service.slug)} className="font-serif text-xl text-accent hover:underline">
              {service.name}
            </Link>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/70">{service.intro}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
