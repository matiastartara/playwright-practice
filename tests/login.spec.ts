import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';

const URL = 'https://magento.softwaretestingboard.com/';
let home : HomePage;


test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        home = new HomePage(page);
      });
      
      test.afterEach(async ({page}) => {
          await page.close();
      });
      
    test('Invalid login test', async({page}) => {

        await expect(page).toHaveTitle('Home Page');
        await home.clickOnSignIn();
        await expect(page).toHaveTitle('Customer Login');

        // let text = await page.locator('div header').textContent();


    })



});