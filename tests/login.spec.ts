import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

const URL = 'https://magento.softwaretestingboard.com/';
let home: HomePage;
let login: LoginPage;

test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        home = new HomePage(page);
        login = new LoginPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Invalid login test', async ({ page }) => {
        await expect(page).toHaveTitle('Home Page');
        await home.clickOnSignIn();
        await expect(page).toHaveTitle('Customer Login');
        await login.completeUsername('user@invalid.com');
        await login.completePassword('12345');
        await login.clickOnSignIn();

        let errorMsg = await page.locator('.messages .error.message > div').textContent();
        await expect(errorMsg).toEqual('Incorrect CAPTCHA');
        const result = await login.isNotLoggedIn();
        await expect(result).toBe(true);
    })

});