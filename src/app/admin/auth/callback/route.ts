import { redirect } from "next/navigation";
import { ADMIN_ENTRY_PATH } from "@/lib/adminEntry";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  redirect(ADMIN_ENTRY_PATH);
}
