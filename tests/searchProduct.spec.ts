import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';

const URL = 'https://magento.softwaretestingboard.com/';
let home: HomePage;
let catalog: CatalogPage;

test.describe('Search Product tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        home = new HomePage(page);
        catalog = new CatalogPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Search product test', async ({ page }) => {
        await expect(page).toHaveTitle('Home Page');
        const product = 'yoga';
        await home.searchProduct(product);

        //Wait for load products 
        await catalog.waitForCaptcha(page); 
        const productCountPromise = await catalog.getProductListSize();
        expect(productCountPromise).toBeGreaterThanOrEqual(12);

        //Check all product names contains same product name
        const texts = await catalog.getProductNames();
        for (let text of texts) {
            console.log(text);
            expect(text.toLowerCase()).toContain(product);
        }

    })

});