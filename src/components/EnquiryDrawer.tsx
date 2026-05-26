"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { DateRange } from "react-day-picker";
import { format, parseISO } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SITE } from "@/lib/site";

type AvailabilityBlock = { start: string; end: string; label?: string };

export function EnquiryDrawer({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="bg-background text-foreground border-l border-border w-full sm:max-w-md overflow-y-auto"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-3xl font-normal text-foreground">
            Make an enquiry
          </SheetTitle>
          <SheetDescription className="text-foreground/70">
            Tell us a little about your visit. We reply personally, usually within a day.
          </SheetDescription>
        </SheetHeader>
        <EnquiryForm onSent={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export function EnquiryForm({
  onSent,
  compact = false,
}: {
  onSent?: () => void;
  compact?: boolean;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    guests: "",
    message: "",
  });
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/availability", { cache: "no-store" });
        const json = (await res.json()) as { blocks?: AvailabilityBlock[] };
        setBlocks(Array.isArray(json.blocks) ? json.blocks : []);
      } catch {
        setBlocks([]);
      }
    })();
  }, []);

  const disabled = useMemo(() => {
    return blocks
      .map((b) => {
        try {
          return { from: parseISO(b.start), to: parseISO(b.end) };
        } catch {
          return null;
        }
      })
      .filter((x): x is { from: Date; to: Date } => x !== null);
  }, [blocks]);

  const datesLabel = useMemo(() => {
    if (!range?.from) return "";
    const from = format(range.from, "d MMM yyyy");
    if (!range.to) return from;
    return `${from} – ${format(range.to, "d MMM yyyy")}`;
  }, [range]);

  useEffect(() => {
    setForm((f) => ({ ...f, dates: datesLabel }));
  }, [datesLabel]);

  const reset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      dates: "",
      guests: "",
      message: "",
    });
    setRange(undefined);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const startDate =
      range?.from ? format(range.from, "yyyy-MM-dd") : "";
    const endDate =
      range?.from ? format(range.to ?? range.from, "yyyy-MM-dd") : "";

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          guests: form.guests,
          message: form.message,
          startDate,
          endDate,
          sourceUrl: window.location.href,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        reset();
        return;
      }

      if (res.status === 409) {
        setStatus("error");
        setError("Those dates are unavailable. Please choose different dates or leave them blank.");
        return;
      }

      if (res.status === 503) {
        const subject = encodeURIComponent(`Enquiry from ${form.name || "the website"}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDates: ${form.dates}\nGuests: ${form.guests}\n\n${form.message}`,
        );
        window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
        setStatus("sent");
        reset();
        return;
      }

      setStatus("error");
      setError("Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className={`grid gap-4 ${compact ? "" : "mt-6"}`}>
        <div className="border border-border p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-foreground/70">Enquiry sent</div>
          <h3 className="mt-3 font-serif text-2xl font-normal text-foreground">Thank you.</h3>
          <p className="mt-3 text-sm text-foreground/75 font-light">
            We’ve received your enquiry and will reply personally, usually within a day.
          </p>
        </div>
        <Button
          type="button"
          onClick={onSent}
          className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 font-light tracking-wider"
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`grid gap-4 ${compact ? "" : "mt-6"}`}>
      {status === "error" ? (
        <div className="border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}
      <Field label="Your name">
        <Input required value={form.name} onChange={update("name")} className="bg-transparent border-foreground/30 rounded-none" />
      </Field>
      <Field label="Email">
        <Input required type="email" value={form.email} onChange={update("email")} className="bg-transparent border-foreground/30 rounded-none" />
      </Field>
      <Field label="Phone (optional)">
        <Input value={form.phone} onChange={update("phone")} className="bg-transparent border-foreground/30 rounded-none" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Dates (optional)">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={`bg-transparent border-foreground/30 rounded-none justify-start font-light ${
                  form.dates ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {form.dates || "Select dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={disabled}
                fromDate={new Date()}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field label="Guests">
          <Input value={form.guests} onChange={update("guests")} placeholder="e.g. 2" className="bg-transparent border-foreground/30 rounded-none" />
        </Field>
      </div>
      <Field label="Message">
        <Textarea
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us a little about what you're hoping for…"
          className="bg-transparent border-foreground/30 rounded-none resize-none"
        />
      </Field>
      <Button
        type="submit"
        disabled={status === "sending"}
        className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 font-light tracking-wider"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
      <p className="text-xs text-foreground/60">We’ll reply personally, usually within a day.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label className="text-xs uppercase tracking-[0.18em] text-foreground/70">
        {label}
      </Label>
      {children}
    </div>
  );
}
