import { test, expect } from "@playwright/test";

const PATH = "/blog/how-long-should-you-go-on-a-retreat-for";
const TITLE = "How Long Should a Retreat Be? Weekend or 3–5 Days";
const DESCRIPTION =
  "How long do retreats last? A short stay is a weekend; 3–5 days is the usual rest length. Compare weekend to a week, then pick dates that let you settle.";

test("duration guide has CTR title, meta, FAQ schema, and enquiry-path links", async ({ page }) => {
  await page.goto(PATH);

  await expect(page).toHaveTitle(TITLE + " — Home House Homestead");
  await expect(page.getByRole("heading", { level: 1, name: TITLE })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", DESCRIPTION);

  const jsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
    els.map((e) => e.textContent ?? ""),
  );
  const joined = jsonLd.join(" ");
  expect(joined).toContain("FAQPage");
  expect(joined).toContain("How long do retreats last?");
  expect(joined).toContain("How long is a short stay?");
  expect(joined).toContain("BlogPosting");

  await expect(page.getByRole("heading", { level: 2, name: /How long is a short stay/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /When the length is clear/i })).toBeVisible();

  const article = page.locator("main");
  await expect(article.getByRole("link", { name: "retreats in Norfolk" }).first()).toHaveAttribute("href", "/retreats");
  await expect(article.getByRole("link", { name: "Guest house stays" }).first()).toHaveAttribute("href", "/stays");
  await expect(article.getByRole("link", { name: "can you go on a retreat alone?" })).toHaveAttribute(
    "href",
    "/blog/can-you-go-on-a-retreat-alone",
  );
  await expect(article.getByRole("link", { name: "quiet weekend breaks in Norfolk" })).toHaveAttribute(
    "href",
    "/blog/quiet-weekend-breaks-in-norfolk",
  );
  await expect(article.getByRole("link", { name: "what to pack for a countryside retreat in Norfolk" })).toHaveAttribute(
    "href",
    "/blog/what-to-pack-for-a-countryside-retreat-in-norfolk",
  );
  await expect(article.getByRole("link", { name: "solo retreats" })).toHaveAttribute(
    "href",
    "/retreats/solo-retreats-norfolk",
  );
  await expect(article.getByRole("link", { name: "private retreats" })).toHaveAttribute(
    "href",
    "/retreats/private-retreats-norfolk",
  );

  await article.getByRole("link", { name: "retreats in Norfolk" }).last().click();
  await expect(page).toHaveURL(/\/retreats$/);
});
