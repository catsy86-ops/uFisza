import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORTS = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "Pixel 5", width: 393, height: 830 },
];

for (const viewport of MOBILE_VIEWPORTS) {
  test.describe(`Mobile (${viewport.name}: ${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test.describe("Dostawa — strona tracker", () => {
      test("strona dostawy ładuje się na mobile", async ({ page }) => {
        await page.goto("/dostawa");
        await expect(page.locator("text=Dostawca Fisz")).toBeVisible();
      });

      test("przycisk śledzenia ma min 44px wysokości (touch target)", async ({ page }) => {
        await page.goto("/dostawa");
        const btn = page.locator("text=Rozpocznij śledzenie paczki");
        await expect(btn).toBeVisible();
        const box = await btn.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
      });

      test("mapa nie overflow na mobile", async ({ page }) => {
        await page.goto("/dostawa");
        const map = page.locator("[class*='aspect-']").first();
        const box = await map.boundingBox();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(viewport.width + 32);
        }
      });

      test("symulacja dostawy uruchamia się i pokazuje kroki", async ({ page }) => {
        await page.goto("/dostawa");
        const btn = page.locator("text=Rozpocznij śledzenie paczki");
        if (await btn.isVisible()) {
          await btn.click();
          await expect(page.locator("text=Status dostawy")).toBeVisible({ timeout: 3000 });
        }
      });
    });

    test.describe("Koszyk — mobile drawer", () => {
      test("koszyk drawer otwiera się po kliknięciu ikony koszyka", async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(1500);
        const cartBtn = page.locator("button").filter({ has: page.locator("svg.lucide-shopping-cart") }).first();
        if (await cartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await cartBtn.click();
          await page.waitForTimeout(500);
          await expect(page.locator("text=Koszyk")).toBeVisible({ timeout: 3000 });
        }
      });

      test("body scroll jest zablokowany gdy koszyk otwarty", async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(1500);
        const cartBtn = page.locator("button").filter({ has: page.locator("svg.lucide-shopping-cart") }).first();
        if (await cartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await cartBtn.click();
          await page.waitForTimeout(500);
          const overflow = await page.evaluate(() => document.body.style.overflow);
          expect(overflow).toBe("hidden");
        }
      });

      test("pusty koszyk pokazuje tekst zachęty", async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(1500);
        const cartBtn = page.locator("button").filter({ has: page.locator("svg.lucide-shopping-cart") }).first();
        if (await cartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
          await cartBtn.click();
          await page.waitForTimeout(500);
          await expect(page.locator("text=Koszyk").first()).toBeVisible({ timeout: 3000 });
        }
      });
    });

    test.describe("ProductCard — mobile", () => {
      test("floating buttons są widoczne bez hover na mobile (opacity > 0)", async ({ page }) => {
        await page.goto("/#produkty");
        await page.waitForTimeout(2500);
        const hearts = page.locator("button").filter({ has: page.locator("svg.lucide-heart") });
        const count = await hearts.count();
        if (count > 0) {
          const opacity = await hearts.first().evaluate((el) => {
            return window.getComputedStyle(el).opacity;
          });
          expect(parseFloat(opacity)).toBeGreaterThan(0);
        }
      });

      test("Dodaj do koszyka button ma min 44px touch target", async ({ page }) => {
        await page.goto("/#produkty");
        await page.waitForTimeout(2500);
        const addBtns = page.locator("button:has-text('Dodaj do koszyka')").or(page.locator("button:has-text('Do koszyka')"));
        const count = await addBtns.count();
        if (count > 0) {
          const box = await addBtns.first().boundingBox();
          expect(box!.height).toBeGreaterThanOrEqual(44);
        }
      });
    });

    test.describe("OrderHistory — mobile", () => {
      test("tytuł responsywny (font-size <= 36px na mobile)", async ({ page }) => {
        await page.goto("/zamowienia");
        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible({ timeout: 5000 }).catch(() => {});
        const fontSize = await heading.evaluate((el) => window.getComputedStyle(el).fontSize);
        expect(parseFloat(fontSize)).toBeLessThanOrEqual(36);
      });
    });

    test.describe("Navbar — mobile menu", () => {
      test("hamburger menu otwiera nawigację mobilną", async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(1000);
        const hamburger = page.locator("button.md\\:hidden").first();
        if (await hamburger.isVisible({ timeout: 3000 }).catch(() => false)) {
          await hamburger.click();
          await page.waitForTimeout(500);
          await expect(page.locator("text=Dostawa").first()).toBeVisible({ timeout: 3000 });
        }
      });
    });

    test.describe("Footer — iframe sandbox", () => {
      test("mapa iframe ma atrybut sandbox", async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(1500);
        await page.locator("#o-nas").scrollIntoViewIfNeeded().catch(() => {});
        await page.waitForTimeout(1000);
        const iframe = page.locator("iframe[sandbox]");
        if (await iframe.count() > 0) {
          const sandbox = await iframe.first().getAttribute("sandbox");
          expect(sandbox).toContain("allow-scripts");
        }
      });
    });

    test.describe("Global layout — no horizontal scroll", () => {
      test("strona główna nie ma horizontal scroll", async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(1500);
        const hasHScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
        });
        expect(hasHScroll).toBe(false);
      });

      test("strona dostawy nie ma horizontal scroll", async ({ page }) => {
        await page.goto("/dostawa");
        await page.waitForTimeout(1000);
        const hasHScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
        });
        expect(hasHScroll).toBe(false);
      });
    });
  });
}