const { test, expect } = require('@playwright/test');

test('GET request test', async({request}) => 
{
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
});

test('GET request - verify response body' , async({request}) =>
{
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
    const body = await response.json();

expect(body.data.id).toBe(2);
expect(body.data.email).toContain('@');

});

test('POST request - create a user', async({request}) =>
{
    const response = await request.post('https://reqres.in/api/users/2', {
        data: {
            name: 'priyanka' ,
            job: 'QA Automation Tester'

        }
    });
expect(response.status()).toBe(201);

   const body = await response.json();
   expect(body.name).toBe('priyanka');
   expect(body.job).toBe('QA Automation Tester');
});

test('DELETE request - remove a user', async({request}) =>
{
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
});

test('intercept and mock a network request', async({page}) =>
{
  await page.route('https://the-internet.herokuapp.com/*', route =>
  {
    console.log('intercepted:', route.request().url());
route.continue();
  } );
  await page.goto('https://the-internet.herokuapp.com/login');

});

test('block image requests', async({page})=>
{
    let blockedCount = 0; 
    await page.route('**/*.{png,jpg,jpeg}', route => {
        blockedCount++;
        route.abort();
     });

    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForTimeout(2000);
    console.log('total images blocked:', blockedCount);
    expect(blockedCount).toBeGreaterThan(0);

});