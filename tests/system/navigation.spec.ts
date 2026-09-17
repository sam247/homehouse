import { test, expect } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Home House Homestead" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /Peaceful Norfolk Retreats/i })).toBeVisible();
  const jsonLd = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
    els.map((e) => e.textContent ?? ""),
  );
  expect(jsonLd.join(" ")).toContain("FAQPage");
});

test("/events redirects to /events-and-workshops", async ({ page }) => {
  await page.goto("/events");
  await expect(page).toHaveURL(/\/events-and-workshops$/);
  await expect(page.getByRole("heading", { name: "JUST BE" })).toBeVisible();
});

test("legacy marketing URLs redirect to current destinations", async ({ page }) => {
  await page.goto("/contact-1");
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { name: "Get in touch." })).toBeVisible();

  await page.goto("/testimonials");
  await expect(page).toHaveURL(/\/reviews$/);
  await expect(page.getByRole("heading", { name: "Words from our guests." })).toBeVisible();

  await page.goto("/hhh-mentorships");
  await expect(page).toHaveURL(/\/retreats$/);
  await expect(
    page.getByRole("heading", { name: "Retreats in Norfolk for rest, reconnection, and slower living." }),
  ).toBeVisible();
});

test("desktop navigation works", async ({ page }) => {
  await page.goto("/");
  await page.locator("header").getByRole("link", { name: "About" }).first().click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "A journey home." })).toBeVisible();
});

test("womens retreats page loads from header nav", async ({ page }) => {
  await page.goto("/");
  await page.locator("header").getByRole("link", { name: "Women's Retreats" }).first().click();
  await expect(page).toHaveURL(/\/womens-retreats$/);
  await expect(
    page.getByRole("heading", { name: "Women's retreats in Norfolk for rest, softness, and reconnection." }),
  ).toBeVisible();
  await expect(page.getByText("Pricing")).toHaveCount(0);
});

test("community and reviews live in the footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Community" })).toHaveCount(0);
  await expect(page.locator("header").getByRole("link", { name: "Reviews" })).toHaveCount(0);
  await page.locator("footer").getByRole("link", { name: "Community" }).first().click();
  await expect(page).toHaveURL(/\/community$/);
  await expect(page.getByRole("heading", { level: 1, name: "The Home House Community Gatherings" })).toBeVisible();

  await page.goto("/");
  await page.locator("footer").getByRole("link", { name: "Reviews" }).first().click();
  await expect(page).toHaveURL(/\/reviews$/);
  await expect(page.getByRole("heading", { name: "Words from our guests." })).toBeVisible();
});

test("mobile menu closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await page.locator("header").getByRole("link", { name: "Accommodation" }).first().click();
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

test("blog list and guide post page render", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Guides and journal notes from the homestead." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Planning guides" })).toBeVisible();
  await page.getByRole("link", { name: "What Is A Homestead Retreat?" }).click();
  await expect(page).toHaveURL(/\/blog\/what-is-a-homestead-retreat$/);
  await expect(page.getByRole("heading", { name: "What Is A Homestead Retreat?" })).toBeVisible();
  await expect(page.getByText("Planning a stay")).toBeVisible();
});

test("retreats page loads", async ({ page }) => {
  await page.goto("/retreats");
  await expect(
    page.getByRole("heading", { name: "Retreats in Norfolk for rest, reconnection, and slower living." }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /http:\/\/localhost:3000\/retreats$/);
});

test("homepage hero routes into the retreat cluster", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore retreats" }).first().click();
  await expect(page).toHaveURL(/\/retreats$/);
  await expect(
    page.getByRole("heading", { name: "Retreats in Norfolk for rest, reconnection, and slower living." }),
  ).toBeVisible();
});

test("retreats hub links to spoke pages", async ({ page }) => {
  await page.goto("/retreats");
  await page.getByRole("link", { name: "Explore this retreat page" }).first().click();
  await expect(page).toHaveURL(/\/retreats\/womens-retreats-norfolk$/);
  await expect(
    page.getByRole("heading", { name: "Women's retreats in Norfolk for rest, softness, and reconnection." }),
  ).toBeVisible();
});

test("retreat spoke pages load", async ({ page }) => {
  await page.goto("/retreats/womens-retreats-norfolk");
  await expect(
    page.getByRole("heading", { name: "Women's retreats in Norfolk for rest, softness, and reconnection." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Solo retreats in Norfolk" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Compare retreat options" })).toBeVisible();

  await page.goto("/retreats/solo-retreats-norfolk");
  await expect(
    page.getByRole("heading", { name: "Solo retreats in Norfolk for quiet time, rest, and reflection." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Women's retreats in Norfolk" })).toBeVisible();
});

test("seo support markdown posts are available", async ({ page }) => {
  await page.goto("/blog/what-is-a-homestead-retreat");
  await expect(page.getByRole("heading", { name: "What Is A Homestead Retreat?" })).toBeVisible();
  await expect(page.getByRole("link", { name: "retreats in Norfolk" }).first()).toBeVisible();
});

test("homepage avoids generic wellness framing in stays band", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Norfolk Retreats & Countryside Stays" }).first(),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /Wellness Retreats/i })).toHaveCount(0);
});

test("norfolk holidays page loads", async ({ page }) => {
  await page.goto("/norfolk-holidays");
  await expect(
    page.getByRole("heading", { name: "Norfolk holidays for guests who want a slower, quieter stay." }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /http:\/\/localhost:3000\/norfolk-holidays$/,
  );
});

test("stays page links users to retreats and norfolk holidays", async ({ page }) => {
  await page.goto("/stays");
  await expect(page.getByRole("link", { name: /Retreats/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Norfolk holidays" })).toBeVisible();
  await expect(page.getByRole("link", { name: "our Norfolk retreats page" }).last()).toBeVisible();
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
  expect(sitemapText).not.toContain("<loc>http://localhost:3000/blog/hello-world</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/hearth-project</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/community</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/womens-retreats</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/retreat-venues</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/sufi-muslim-retreats</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/therapies</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/retreats</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/norfolk-holidays</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/retreats/womens-retreats-norfolk</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/retreats/solo-retreats-norfolk</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/blog/what-is-a-homestead-retreat</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/blog/how-to-plan-a-solo-retreat-in-norfolk</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/blog/can-you-go-on-a-retreat-alone</loc>");
  expect(sitemapText).toContain("<loc>http://localhost:3000/blog/how-long-should-you-go-on-a-retreat-for</loc>");
});

test("canonical link is absolute", async ({ page }) => {
  await page.goto("/");
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", /http:\/\/localhost:3000\/?$/);
});

test("blocked dates are disabled", async ({ page }) => {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  await page.route("**/api/availability**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ blocks: [{ start: today, end: today }] }),
    });
  });

  await page.goto("/");
  await page.locator("header").getByRole("button", { name: "Book now" }).click();
  await page.getByRole("button", { name: "Select dates" }).click();
  const dayKey = await page.evaluate(() => new Date().toLocaleDateString());
  const day = page.locator(`button[data-day="${dayKey}"]`);
  await expect(day).toBeDisabled();
});

test("admin page responds", async ({ page }) => {
  const res = await page.goto("/amanda");
  expect(res?.ok()).toBeTruthy();
  expect(res?.headers()?.["x-robots-tag"] || "").toContain("noindex");
  await expect(page.locator("body")).toBeVisible();
});

test("admin auth rejects non-allowlisted email", async ({ request }) => {
  const res = await request.post("/amanda/auth/request", {
    form: { email: "hacker@example.com" },
    maxRedirects: 0,
  });
  expect(res.status()).toBeGreaterThanOrEqual(300);
  expect(res.status()).toBeLessThan(400);
  expect(res.headers()["location"] || "").toMatch(/\/amanda\?error=not-allowed$/);
});

test("admin media upload is protected", async ({ request }) => {
  const res = await request.post("/admin/media/upload");
  expect(res.status()).toBe(401);
});

test("admin booking update is protected", async ({ request }) => {
  const res = await request.post("/admin/bookings/00000000-0000-0000-0000-000000000000/update");
  expect(res.url()).toMatch(/\/amanda$/);
});
