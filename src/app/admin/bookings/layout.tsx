import { redirect } from "next/navigation";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

// Enquiries are managed in Better Ranking Communications. The booking_requests
// table is still written (it powers the date-availability check), but the admin
// bookings view is hidden. Restore by rendering BookingsStudioLayout here again.
export default function Layout() {
  redirect(`${ADMIN_ENTRY_PATH}/availability`);
}
