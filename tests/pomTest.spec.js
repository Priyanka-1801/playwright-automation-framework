const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('create a LoginPage object', async ({ page }) => {
  const loginPage = new LoginPage(page);
});