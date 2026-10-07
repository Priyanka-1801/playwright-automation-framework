const { test, expect } = require('@playwright/test');

test('using baseURL', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('#username')).toBeVisible();
});