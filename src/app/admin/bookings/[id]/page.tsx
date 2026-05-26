import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/adminServer";
import { BookingRequestDetail } from "@/components/admin/BookingRequestDetail";

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin");

  const { id } = await params;

  const db = getDb();
  if (!db) redirect("/admin/bookings?error=db");

  const rows = (await db`
    SELECT
      id,
      status,
      name,
      email,
      phone,
      guests,
      message,
      internal_notes,
      start_date::text as start,
      end_date::text as "end",
      created_at::text as created_at
    FROM booking_requests
    WHERE id = ${id}
    LIMIT 1
  `) as any[];

  const request = rows[0] as any;
  if (!request) redirect("/admin/bookings");

  return (
    <div className="mx-auto w-full max-w-4xl">
      <BookingRequestDetail request={request} />
    </div>
  );
}

