const { test, expect } = require('@playwright/test');

// Test 1: Understanding destructuring (pure JS practice, no browser needed)
test('understand destructuring', async () => {
  let person = { name: "priyanka", age: 30 };
  let { name, age } = person;
  console.log(name);
  console.log(age);
});

// Test 2: Basic navigation - just opening a page
test('my first test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
});

// Login-related tests, grouped together with shared setup
test.describe('login functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test('username field is visible', async ({ page }) => {
    await expect(page.locator('#username')).toBeVisible();
  });

  test('login and verify success', async ({ page }) => {
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.locator('#flash')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    await expect(page).toHaveURL(/secure/);
  });

});

// NEW TEST — add this part
test('select a dropdown option', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  await page.locator('#dropdown').selectOption('1');

  await expect(page.locator('#dropdown')).toHaveValue('1');
});

// NEW TEST — add this part
test('select option 2 by label', async ({page})=>
{
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.locator('#dropdown').selectOption({label: 'Option 2' });
    await expect(page.locator('#dropdown')).toHaveValue('2');
});

// Checkbox 

test('check the first checkbox', async({page})=>
{
await page.goto('https://the-internet.herokuapp.com/checkboxes');
const checkboxes = page.getByRole('checkbox');
await checkboxes.nth(0).check();
await expect(checkboxes.nth(0)).toBeChecked();

});

test('verify initial checkbox states', async ({page}) =>
{
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const checkboxes = page.getByRole('checkbox');
    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();

});

test('select impressive radio button', async({page}) =>
{
    await page.goto('https://demoqa.com/radio-button');
    await page.getByRole('radio', {name: 'Impressive'}).check({ force: true });
    await expect(page.getByText('You have selected Impressive')).toBeVisible();

});

test('handle a JS alert', async({page}) =>
{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', {name: 'Click for JS Alert'}).click();
});

test('type inside an iframe', async({page}) =>
{
    await page.goto('https://the-internet.herokuapp.com/iframe');
    const frame = page.frameLocator('#mce_0_ifr');
    const editorBody = page.locator('body');
    await editorBody.waitFor({state: 'visible'});
    await editorBody.click();
    await editorBody.pressSequentially('Hello from inside the iframe');
 await expect(editorBody).toContainText('Hello from inside the iframe');
});