"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export function AvailabilityEditor() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [label, setLabel] = useState("");

  const start = range?.from ? format(range.from, "yyyy-MM-dd") : "";
  const end = range?.to ? format(range.to, "yyyy-MM-dd") : "";
  const canAdd = Boolean(start) && Boolean(end);

  return (
    <div className="border border-border p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Calendar</div>
        <h1 className="font-serif text-4xl leading-tight">Block out dates</h1>
        <p className="mt-1 text-foreground/75 font-light leading-relaxed">
          Select a range on the calendar, add a label if you like, then save.
        </p>
      </div>

      <div className="mt-10 w-full">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          fromDate={new Date()}
          numberOfMonths={1}
          fluid
          className="[--cell-size:2.25rem] sm:[--cell-size:2.5rem] lg:[--cell-size:3rem]"
        />
      </div>

      <form method="post" action={`${ADMIN_ENTRY_PATH}/availability/add`} className="mt-10 grid gap-4">
        <input type="hidden" name="start" value={start} />
        <input type="hidden" name="end" value={end} />
        <label className="text-xs uppercase tracking-[0.25em] text-foreground/70">
          Label (optional)
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            name="label"
            type="text"
            className="mt-2 w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent"
          />
        </label>
        <button
          type="submit"
          disabled={!canAdd}
          className={[
            "w-full border border-border px-4 py-4 text-xs uppercase tracking-[0.25em] transition-colors",
            canAdd ? "bg-foreground text-background hover:bg-foreground/90" : "text-foreground/40",
          ].join(" ")}
        >
          Add blocked range
        </button>
      </form>
    </div>
  );
}
