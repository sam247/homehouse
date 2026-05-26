import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  redirect("/admin");
}
