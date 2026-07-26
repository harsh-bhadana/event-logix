import { test, expect } from "@playwright/test";

test("landing page loads featured events", async ({ page }) => {
  await page.goto("/");

  // Check header
  await expect(page.getByRole("heading", { name: "Discover the Best Events" })).toBeVisible();

  // Check if events section exists
  await expect(page.getByText("Featured Events")).toBeVisible();
});

test("public user can navigate to login page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Login");

  await expect(page).toHaveURL(/.*\/auth\/login/);
  await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
});
