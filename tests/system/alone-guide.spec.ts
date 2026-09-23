import { test, expect } from "@playwright/test";

const PATH = "/blog/can-you-go-on-a-retreat-alone";
const TITLE = "Can You Go On a Retreat Alone? Yes — Here's What to Expect";

test("alone guide has FAQ schema from visible FAQs and solo enquiry path", async ({ page }) => {
  await page.goto(PATH);

  await expect(page).toHaveTitle(TITLE + " — Home House Homestead");
  await expect(page.getByRole("heading", { level: 1, name: TITLE })).toBeVisible();

  const jsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
    els.map((e) => e.textContent ?? ""),
  );
  const joined = jsonLd.join(" ");
  expect(joined).toContain("FAQPage");
  expect(joined).toContain("Is it normal to go on a retreat alone?");
  expect(joined).toContain("Will I be the only person staying alone?");
  expect(joined).not.toContain("When you're ready");
  expect(joined).toContain("BlogPosting");

  await expect(page.getByRole("heading", { level: 2, name: /Frequently asked questions/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /When you're ready/i })).toBeVisible();

  const article = page.locator("main");
  await expect(article.getByRole("link", { name: "solo retreats in Norfolk" }).last()).toHaveAttribute(
    "href",
    "/retreats/solo-retreats-norfolk",
  );
  await expect(article.getByRole("link", { name: "retreats in Norfolk" }).last()).toHaveAttribute("href", "/retreats");
});