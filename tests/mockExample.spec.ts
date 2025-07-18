/**
 * This test suite demonstrates how to mock API responses using Playwright's route interception.
 *
 * - The first test ("Mock all the response") intercepts all requests to the `/api/v1/fruits` endpoint
 *   and returns a mocked JSON response containing a single fruit object.
 * - The second test ("Get response and add new item") intercepts the same endpoint, fetches the original
 *   response, adds a new item to the JSON array, and fulfills the request with the modified data.
 *
 * To run these tests, use the following command:
 * 
 *   npx playwright test --project=MockApi
 *
 * Ensure that your Playwright configuration includes a project named "MockApi".
 */

import { test, expect } from '@playwright/test';

test("Mock all the response", async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Test mock', id: 26 }];
        await route.fulfill({ json });
    });

    await page.goto('https://demo.playwright.dev/api-mocking'); 
    await expect(page.getByText('Test mock')).toBeVisible();
});

test('Get response and add new item', async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'New param', id: 200 });
        await route.fulfill({ response, json });
    });
 
    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(page.getByText('New param', { exact: true })).toBeVisible();
});

