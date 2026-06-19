import { notFound } from "next/navigation";
import { RetreatLandingPage, buildRetreatMetadata } from "@/components/retreats/RetreatLandingPage";
import { getRetreatPageBySlug } from "@/lib/retreatPages";

const pageData = getRetreatPageBySlug("womens-retreats-norfolk");

export const metadata = pageData ? buildRetreatMetadata(pageData) : {};

export default function WomensRetreatsNorfolkPage() {
  if (!pageData) notFound();
  return <RetreatLandingPage page={pageData} />;
}
