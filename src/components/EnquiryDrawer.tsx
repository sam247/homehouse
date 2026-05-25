"use client";

import { useState, type ReactNode } from "react";
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
import { SITE } from "@/lib/site";

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
    dates: "",
    guests: "",
    message: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name || "the website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nDates: ${form.dates}\nGuests: ${form.guests}\n\n${form.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    onSent?.();
  };

  return (
    <form onSubmit={submit} className={`grid gap-4 ${compact ? "" : "mt-6"}`}>
      <Field label="Your name">
        <Input required value={form.name} onChange={update("name")} className="bg-transparent border-foreground/30 rounded-none" />
      </Field>
      <Field label="Email">
        <Input required type="email" value={form.email} onChange={update("email")} className="bg-transparent border-foreground/30 rounded-none" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Dates (optional)">
          <Input value={form.dates} onChange={update("dates")} placeholder="e.g. 12–15 Jun" className="bg-transparent border-foreground/30 rounded-none" />
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
        className="rounded-none bg-foreground text-background hover:bg-accent hover:text-accent-foreground h-12 font-light tracking-wider"
      >
        Send enquiry
      </Button>
      <p className="text-xs text-foreground/60">
        This opens your email app with the message pre-filled.
      </p>
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
