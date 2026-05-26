import Link from "next/link";
import { getAdminSession } from "@/lib/adminServer";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BookingsIndexPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  return (
    <div className="border border-border p-10">
      <div className="text-xs uppercase tracking-[0.25em] text-foreground/70">Reservation desk</div>
      <h1 className="mt-4 font-serif text-4xl leading-tight">Bookings</h1>
      <p className="mt-4 text-foreground/75 font-light">
        Select an enquiry from the left to view details, confirm it, or add internal notes.
      </p>
      <div className="mt-10">
        <Link
          href="/admin/availability"
          className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-foreground transition-colors"
        >
          Go to availability
        </Link>
      </div>
    </div>
  );
}

