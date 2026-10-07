   // Custom fixtures for the login flow
const base = require('@playwright/test');

exports.test = base.test.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'login' }).click();

    await use(page);
  },
});

exports.expect = base.expect;