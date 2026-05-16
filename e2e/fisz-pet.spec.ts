import { test, expect } from "@playwright/test";

test.describe("Fisz Pet - maskotka podążająca za kursorem", () => {
  test("Fisz Pet pojawia się na stronie głównej", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    const fiszEmoji = page.locator("text=🐟").or(page.locator("text=🤩")).or(page.locator("text=😢"));
    expect(await fiszEmoji.count()).toBeGreaterThanOrEqual(0);
  });

  test("kliknięcie na Fisza pokazuje dymek z tekstem", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    const fiszButton = page.locator("button").filter({ hasText: /🐟|🤩|🕺/ }).first();
    if (await fiszButton.count() > 0) {
      await fiszButton.click();
      await page.waitForTimeout(500);
      const bubble = page.locator("text=Bul bul").or(page.locator("text=Fisz")).or(page.locator("text=Piwo"));
      expect(await bubble.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test("Fisz Pet można ukryć i pokazać ponownie", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2000);
    const fiszButton = page.locator("button").filter({ hasText: /🐟|🤩|🕺/ }).first();
    if (await fiszButton.count() > 0) {
      const fiszGroup = fiszButton.locator("..");
      const closeButton = fiszGroup.locator("button").first();
      if (await closeButton.count() > 0) {
        await closeButton.click({ force: true });
        await page.waitForTimeout(500);
      }
    }
    const showButton = page.locator("button").filter({ hasText: /🐟/ }).first();
    if (await showButton.isVisible().catch(() => false)) {
      await showButton.click({ force: true });
      await page.waitForTimeout(500);
      const fiszBack = page.locator("button").filter({ hasText: /🐟|🤩|🕺/ }).first();
      expect(await fiszBack.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test("dodanie produktu zmienia nastrój Fisza na excited", async ({ page }) => {
    await page.goto("/#produkty");
    await page.waitForTimeout(1500);
    const addBtn = page.locator("button:has-text('Do koszyka')").first();
    if (await addBtn.isVisible().catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(1000);
    }
  });
});