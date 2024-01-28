import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

const URL = 'https://magento.softwaretestingboard.com/';

const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
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

        //Complete fields with invalid user and password
        await login.completeUsername(email);
        await login.completePassword(password);
        await login.clickOnSignIn();

        //Check login invalid message
        let errorMsg = await page.locator('.messages .error.message > div').textContent();
        expect(errorMsg).toEqual('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
        const result = await login.isNotLoggedIn();
        expect(result).toBe(true);
    })

});