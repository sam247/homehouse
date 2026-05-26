type BookingRequestRow = {
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

function StatusPill({ status }: { status: BookingRequestRow["status"] }) {
  const label =
    status === "confirmed" ? "Confirmed" : status === "cancelled" ? "Cancelled" : "Pending";
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

export function BookingRequestsPanel({ requests }: { requests: BookingRequestRow[] }) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Reservation desk</div>
          <h2 className="mt-3 font-serif text-3xl leading-tight">Enquiries & bookings</h2>
          <p className="mt-3 text-sm text-foreground/70 font-light">
            Pending and confirmed requests are treated as unavailable dates on the site.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {requests.map((r) => {
          const dates = r.start && r.end ? `${r.start} – ${r.end}` : "Dates not provided";
          return (
            <div key={r.id} className="border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusPill status={r.status} />
                    <div className="font-light text-foreground/85">{dates}</div>
                  </div>
                  <div className="mt-4 font-serif text-2xl leading-snug">{r.name}</div>
                  <div className="mt-2 text-sm text-foreground/70 font-light break-words">
                    <div>{r.email}</div>
                    {r.phone ? <div>{r.phone}</div> : null}
                  </div>
                  <div className="mt-3 text-sm text-foreground/70 font-light">
                    Guests: {r.guests || "(not provided)"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {r.status !== "confirmed" ? (
                    <form method="post" action={`/admin/bookings/${r.id}/update`}>
                      <input type="hidden" name="status" value="confirmed" />
                      <button
                        type="submit"
                        className="border border-border bg-foreground text-background px-4 py-3 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition-colors"
                      >
                        Confirm
                      </button>
                    </form>
                  ) : null}
                  {r.status !== "cancelled" ? (
                    <form method="post" action={`/admin/bookings/${r.id}/update`}>
                      <input type="hidden" name="status" value="cancelled" />
                      <button
                        type="submit"
                        className="border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : null}
                  {r.status === "cancelled" ? (
                    <form method="post" action={`/admin/bookings/${r.id}/update`}>
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

              {r.message ? (
                <div className="mt-6 border-t border-border pt-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Message</div>
                  <div className="mt-3 whitespace-pre-wrap text-sm text-foreground/75 font-light">
                    {r.message}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 border-t border-border pt-6">
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Internal notes</div>
                <form method="post" action={`/admin/bookings/${r.id}/update`} className="mt-3 grid gap-3">
                  <textarea
                    name="internalNotes"
                    defaultValue={r.internal_notes ?? ""}
                    rows={3}
                    className="w-full border border-border bg-background px-4 py-3 font-light outline-none focus:border-accent resize-none"
                  />
                  <button
                    type="submit"
                    className="justify-self-start border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:border-accent hover:text-foreground transition-colors"
                  >
                    Save notes
                  </button>
                </form>
                <div className="mt-3 text-xs text-foreground/55">Created: {r.created_at}</div>
              </div>
            </div>
          );
        })}

        {requests.length === 0 ? (
          <div className="border border-border p-6 text-foreground/75 font-light">
            No enquiries yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}

