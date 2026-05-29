import { test, expect } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Home House Homestead" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /Wellness Retreat/i })).toBeVisible();
  const jsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
    els.map((e) => e.textContent ?? ""),
  );
  expect(jsonLd.join(" ")).toContain("FAQPage");
});

test("/events redirects to /events-and-workshops", async ({ page }) => {
  await page.goto("/events");
  await expect(page).toHaveURL(/\/events-and-workshops$/);
  await expect(page.getByRole("heading", { name: "Garden of Sound" })).toBeVisible();
});

test("desktop navigation works", async ({ page }) => {
  await page.goto("/");
  await page.locator("header").getByRole("link", { name: "About" }).first().click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "A journey home." })).toBeVisible();
});

test("mobile menu closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await page.locator("header").getByRole("link", { name: "Stays" }).first().click();
  await expect(page).toHaveURL(/\/stays$/);
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
});

test("enquiry drawer opens", async ({ page }) => {
  await page.goto("/");
  await page.locator("header").getByRole("button", { name: "Book now" }).click();
  await expect(page.getByRole("dialog", { name: "Book now" })).toBeVisible();
  await expect(page.getByText("Your name")).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Book now" }).locator('input[type="email"]'),
  ).toBeVisible();
});

test("enquiry submits via api", async ({ page }) => {
  await page.route("**/api/enquiry", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, id: "test" }),
    });
  });

  await page.goto("/");
  await page.locator("header").getByRole("button", { name: "Book now" }).click();

  const dialog = page.getByRole("dialog", { name: "Book now" });
  const form = dialog.locator("form");
  await form.locator("input").nth(0).fill("Test User");
  await form.locator('input[type="email"]').fill("test@example.com");

  await form.getByRole("button", { name: "Send request" }).click();

  await expect(dialog.getByText("Request sent")).toBeVisible();
  await dialog.getByRole("button", { name: "Close" }).nth(1).click();
  await expect(dialog).toBeHidden();
});

test("blog list and post page render", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Notes from the homestead." })).toBeVisible();
  await page.getByRole("link", { name: "Hello world" }).click();
  await expect(page).toHaveURL(/\/blog\/hello-world$/);
  await expect(page.getByRole("heading", { name: "Hello world" })).toBeVisible();
});

test("robots.txt and sitemap.xml render", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsText = await robots.text();
  expect(robotsText).toContain("Sitemap:");
  expect(robotsText).toContain("Disallow: /admin");
  expect(robotsText).toContain("Disallow: /amanda");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("<loc>http://localhost:3000/</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/blog</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/blog/hello-world</loc>");
});

test("canonical link is absolute", async ({ page }) => {
  await page.goto("/");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /http:\/\/localhost:3000\/?$/);
});

test("blocked dates are disabled", async ({ page }) => {
  await page.goto("/");
  await page.locator("header").getByRole("button", { name: "Book now" }).click();
  await page.getByRole("button", { name: "Select dates" }).click();
  const day = page.getByRole("button", { name: /May 28/ });
  await expect(day).toBeDisabled();
});

test("admin page responds", async ({ page }) => {
  const res = await page.goto("/amanda");
  expect(res?.ok()).toBeTruthy();
  expect(res?.headers()?.["x-robots-tag"] || "").toContain("noindex");
  await expect(page.locator("body")).toBeVisible();
});

test("admin media upload is protected", async ({ request }) => {
  const res = await request.post("/admin/media/upload");
  expect(res.status()).toBe(401);
});

test("admin booking update is protected", async ({ request }) => {
  const res = await request.post("/admin/bookings/00000000-0000-0000-0000-000000000000/update");
  expect(res.url()).toMatch(/\/amanda$/);
});
