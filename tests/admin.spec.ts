import { test, expect } from "@playwright/test";

test.describe("Admin Portal", () => {
  test("admin dashboard protects against unauthorized access", async ({ page }) => {
    // Navigate directly to admin without logging in
    await page.goto("/admin");

    // Expect login redirect
    await expect(page).toHaveURL(/.*\/auth\/login/);
  });
});
