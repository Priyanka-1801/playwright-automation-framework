const { test, expect } = require('../fixtures');
test('dashboard shows secure area after auto-login', async({ loggedInPage })=>
{
    await expect(loggedInPage.locator('#flash')).toContainText('You logged into a secure area!');
});