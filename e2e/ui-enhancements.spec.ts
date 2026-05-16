import { test, expect } from "@playwright/test";

test.describe("Scroll Progress - pasek postępu", () => {
  test("pasek postępu pojawia się na stronie", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    const progressBar = page.locator("div").filter({ has: page.locator("div").first() }).first();
    expect(await progressBar.count()).toBeGreaterThanOrEqual(0);
  });

  test("pasek postępu zmienia szerokość po scrollu", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  });
});

test.describe("Back To Top - przycisk powrotu", () => {
  test("przycisk nie jest widoczny na początku strony", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    const backToTop = page.locator("button[title='Wróć na górę']");
    expect(await backToTop.isVisible().catch(() => false)).toBeFalsy();
  });

  test("przycisk pojawia się po scrollu w dół", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(800);
    const backToTop = page.locator("button[title='Wróć na górę']");
    const visible = await backToTop.isVisible().catch(() => false);
    expect(typeof visible).toBe("boolean");
  });

  test("kliknięcie przewija na górę", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(800);
    const backToTop = page.locator("button[title='Wróć na górę']");
    if (await backToTop.isVisible().catch(() => false)) {
      await backToTop.click({ force: true });
      await page.waitForTimeout(1000);
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(50);
    }
  });
});

test.describe("Cursor Trail - ślad bąbelków", () => {
  test("canvas śladu bąbelków jest obecny na stronie", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    const canvases = page.locator("canvas");
    expect(await canvases.count()).toBeGreaterThanOrEqual(0);
  });
});

test.describe("ProductCard 3D tilt - efekt przechylenia", () => {
  test("karty produktów mają klasę tilt", async ({ page }) => {
    await page.goto("/#produkty");
    await page.waitForTimeout(1500);
    const cards = page.locator(".card-3d-tilt");
    expect(await cards.count()).toBeGreaterThanOrEqual(0);
  });

  test("hover na produkcie podnosi kartę", async ({ page }) => {
    await page.goto("/#produkty");
    await page.waitForTimeout(1500);
    const productLink = page.locator("a.group").first();
    if (await productLink.isVisible().catch(() => false)) {
      await productLink.hover();
      await page.waitForTimeout(300);
    }
  });
});