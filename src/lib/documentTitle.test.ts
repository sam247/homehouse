import assert from "node:assert/strict";
import test from "node:test";
import { documentTitle } from "./documentTitle";

const BRAND = "Home House Homestead";

test("collapses a repeated short brand", () => {
  assert.equal(documentTitle("X | Home House | Home House").absolute, "X | Home House");
});

test("collapses a short brand followed by the full brand", () => {
  assert.equal(
    documentTitle("X — Home House — Home House Homestead").absolute,
    "X — Home House Homestead",
  );
});

test("does not append the brand when the page title already includes it", () => {
  assert.equal(
    documentTitle("Women's Retreats in Norfolk | Home House Homestead").absolute,
    "Women's Retreats in Norfolk | Home House Homestead",
  );
  assert.equal(
    documentTitle("Contact Home House Homestead | Retreat & Stay Enquiries").absolute,
    "Contact Home House Homestead | Retreat & Stay Enquiries",
  );
  assert.equal(
    documentTitle("About Hawa | Home House Homestead in Norfolk").absolute,
    "About Hawa | Home House Homestead in Norfolk",
  );
});

test("appends the brand once when the segment does not name it", () => {
  assert.equal(
    documentTitle("Solo Retreats in Norfolk | Quiet Stay Alone").absolute,
    `Solo Retreats in Norfolk | Quiet Stay Alone — ${BRAND}`,
  );
  assert.equal(
    documentTitle("How Long Should a Retreat Be? Weekend or 3–5 Days").absolute,
    `How Long Should a Retreat Be? Weekend or 3–5 Days — ${BRAND}`,
  );
  assert.equal(
    documentTitle("Can You Go On a Retreat Alone? Yes — Here's What to Expect").absolute,
    `Can You Go On a Retreat Alone? Yes — Here's What to Expect — ${BRAND}`,
  );
});
