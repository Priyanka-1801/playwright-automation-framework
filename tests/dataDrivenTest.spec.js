const { test, expect } = require('@playwright/test');

const invalidlogins = [
    { username: 'tomsmith' , password: 'wrongpass1'},
    { username: 'tomsmith' , password: 'wrongpass2'},
    { username: 'wronguser' , password: 'SuperSecretPassword!'},

];

invalidlogins.forEach(({username, password}) =>
{
    test(`login fails for ${username}/ ${password}`, async({page})=>
    {
        await page.goto('https://the-internet.herokuapp.com/login', { waitUntil: 'domcontentloaded' });
        await page.locator('#username').fill(username);
        await page.locator('#password').fill(password);
        await page.getByRole('button', {name:'login'}).click();
        await expect(page.locator('#flash')).toContainText('invalid');
    });
});