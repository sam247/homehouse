type BookingRequest = {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  name: string;
  email: string;
  phone: string | null;
  guests: string | null;
  message: string | null;
  internal_notes: string | null;
  start: string | null;
  end: string | null;
  created_at: string;
};

function StatusPill({ status }: { status: BookingRequest["status"] }) {
  const label = status === "confirmed" ? "Confirmed" : status === "cancelled" ? "Cancelled" : "Pending";
  const cls =
    status === "confirmed"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
      : status === "cancelled"
        ? "border-foreground/25 bg-foreground/5 text-foreground/70"
        : "border-amber-500/30 bg-amber-500/10 text-amber-700";

  return (
    <span className={["inline-flex items-center border px-2 py-1 text-[10px] uppercase tracking-[0.25em]", cls].join(" ")}>
      {label}
    </span>
  );
}

export function BookingRequestDetail({ request }: { request: BookingRequest }) {
  const dates = request.start && request.end ? `${request.start} – ${request.end}` : "Dates not provided";

  return (
    <div className="border border-border p-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={request.status} />
            <div className="font-light text-foreground/85">{dates}</div>
          </div>
          <h1 className="mt-5 font-serif text-4xl leading-tight">{request.name}</h1>
          <div className="mt-4 text-sm text-foreground/70 font-light break-words">
            <div>{request.email}</div>
            {request.phone ? <div>{request.phone}</div> : null}
          </div>
          <div className="mt-3 text-sm text-foreground/70 font-light">
            Guests: {request.guests || "(not provided)"}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {request.status !== "confirmed" ? (
            <form method="post" action={`/admin/bookings/${request.id}/update`}>
              <input type="hidden" name="status" value="confirmed" />
              <button
                type="submit"
                className="border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
              >
                Confirm
              </button>
            </form>
          ) : null}
          {request.status !== "cancelled" ? (
            <form method="post" action={`/admin/bookings/${request.id}/update`}>
              <input type="hidden" name="status" value="cancelled" />
              <button
                type="submit"
                className="border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </form>
          ) : null}
          {request.status === "cancelled" ? (
            <form method="post" action={`/admin/bookings/${request.id}/update`}>
              <input type="hidden" name="status" value="pending" />
              <button
                type="submit"
                className="border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors"
              >
                Re-open
              </button>
            </form>
          ) : null}
        </div>
      </div>

      {request.message ? (
        <div className="mt-10 border-t border-border pt-10">
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Message</div>
          <div className="mt-4 whitespace-pre-wrap text-sm text-foreground/75 font-light">{request.message}</div>
        </div>
      ) : null}

      <div className="mt-10 border-t border-border pt-10">
        <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Internal notes</div>
        <form method="post" action={`/admin/bookings/${request.id}/update`} className="mt-4 grid gap-3">
          <textarea
            name="internalNotes"
            defaultValue={request.internal_notes ?? ""}
            rows={4}
            className="w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent resize-none"
          />
          <button
            type="submit"
            className="justify-self-start border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors"
          >
            Save notes
          </button>
        </form>
        <div className="mt-4 text-xs text-foreground/55">Created: {request.created_at}</div>
      </div>
    </div>
  );
}

