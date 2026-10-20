import { SITE } from "@/lib/site";

/** Canonical brand appended once to titles that do not already name it. */
export const TITLE_BRAND = SITE.name;

const BRAND_MENTION = /home house/i;

/**
 * One or more trailing brand suffixes, e.g. " | Home House | Home House"
 * or " — Home House — Home House Homestead".
 */
const TRAILING_BRAND =
  /(?:\s*[|–—-]\s*home house(?: homestead)?)+$/i;

/**
 * Collapse a repeated trailing brand so the name appears once.
 *
 * "X | Home House | Home House" → "X | Home House"
 * "X — Home House — Home House Homestead" → "X — Home House Homestead"
 *
 * A brand already written into the page title (not only as a suffix) is kept,
 * and an extra trailing brand is removed.
 */
export function dedupeBrand(title: string): string {
  const trimmed = title.trim().replace(/\s+/g, " ");
  const match = trimmed.match(TRAILING_BRAND);
  if (!match || match.index === undefined) return trimmed;

  const head = trimmed.slice(0, match.index).trim();
  const parts = match[0]
    .split(/\s*[|–—-]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return trimmed;
  if (BRAND_MENTION.test(head)) return head;
  if (parts.length === 1) return trimmed;

  const kept = parts.find((part) => /homestead/i.test(part)) ?? parts[parts.length - 1];
  if (!head) return kept;

  const separator = match[0].trimStart().startsWith("|") ? " | " : " — ";
  return `${head}${separator}${kept}`;
}

export function titleIncludesBrand(title: string): boolean {
  return BRAND_MENTION.test(title);
}

/**
 * Document title with the brand exactly once.
 *
 * Returned as `title.absolute` so the root layout template cannot append the
 * brand again. Unbranded segments receive the same " — Home House Homestead"
 * suffix the layout template used to add.
 */
export function documentTitle(title: string): { absolute: string } {
  const deduped = dedupeBrand(title);
  if (titleIncludesBrand(deduped)) return { absolute: deduped };
  return { absolute: `${deduped} — ${TITLE_BRAND}` };
}
