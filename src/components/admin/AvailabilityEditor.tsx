"use client";

import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type Block = { id: string; start: string; end: string; label?: string | null };

export function AvailabilityEditor({ blocks }: { blocks: Block[] }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [label, setLabel] = useState("");

  const start = range?.from ? format(range.from, "yyyy-MM-dd") : "";
  const end = range?.to ? format(range.to, "yyyy-MM-dd") : "";
  const canAdd = Boolean(start) && Boolean(end);

  const sorted = useMemo(() => {
    return [...blocks].sort((a, b) => a.start.localeCompare(b.start));
  }, [blocks]);

  return (
    <div className="mt-10 grid gap-10 md:grid-cols-2">
      <div className="border border-border p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Select range</div>
        <div className="mt-6">
          <Calendar mode="range" selected={range} onSelect={setRange} fromDate={new Date()} numberOfMonths={1} />
        </div>
        <form method="post" action="/admin/availability/add" className="mt-6 space-y-4">
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
              "w-full border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] transition-colors",
              canAdd ? "bg-foreground text-background hover:bg-foreground/90" : "text-foreground/40",
            ].join(" ")}
          >
            Add blocked range
          </button>
        </form>
      </div>

      <div className="border border-border p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Blocked</div>
        <div className="mt-6 grid gap-3">
          {sorted.map((b) => (
            <div key={b.id} className="border border-border p-4">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-light text-foreground/85">
                    {b.start} – {b.end}
                  </div>
                  {b.label && <div className="mt-2 text-sm text-foreground/60 font-light">{b.label}</div>}
                </div>
                <form method="post" action={`/admin/availability/${b.id}/delete`}>
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-[0.25em] text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))}
          {sorted.length === 0 && (
            <div className="text-foreground/75 font-light">No blocked dates yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

