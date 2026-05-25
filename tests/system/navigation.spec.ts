import { test, expect } from "@playwright/test";

test("home loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Home House Homestead" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Home is in/i })).toBeVisible();
});

test("desktop navigation works", async ({ page }) => {
  await page.goto("/");
  await page.locator("header").getByRole("link", { name: "About" }).first().click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: "A homestead rooted in care." })).toBeVisible();
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
  await page.getByRole("button", { name: "Enquire about a stay" }).click();
  await expect(page.getByText("Make an enquiry")).toBeVisible();
  await expect(page.getByText("Your name")).toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Make an enquiry" }).locator('input[type="email"]'),
  ).toBeVisible();
});
