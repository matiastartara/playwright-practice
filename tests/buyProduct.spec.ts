import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import ShippingPage from '../pages/ShippingPage';

const URL = 'https://magento.softwaretestingboard.com/';
let homePage: HomePage;
let catalogPage: CatalogPage;
let productPage: ProductPage;
let shippingPage : ShippingPage;

test.describe('Buy product test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        homePage = new HomePage(page);
        catalogPage = new CatalogPage(page);
        productPage = new ProductPage(page);
        shippingPage = new ShippingPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Add to cart and buy product test', async ({ page }) => {
        await expect(page).toHaveTitle('Home Page');
        let product = 'yoga';

        await homePage.searchProduct(product);

        //Check product list size 
        await catalogPage.waitForCaptcha(page);
        const productCountPromise = await catalogPage.getProductListSize();
        expect(productCountPromise).toBeGreaterThanOrEqual(12);

        //Select product at position i and add to cart
        await catalogPage.selectProductAt(0);
        await catalogPage.waitForCaptcha(page);

        const title = await page.title();
        expect(title.toLowerCase()).toContain(product);

        //Set product properties
        await productPage.setSize('XS');
        await productPage.setColor('Blue');
        await productPage.addToCart();
        await productPage.showCart();
        await productPage.openCart();
        await productPage.procededToCheckout();

        await shippingPage.completeEmail("test@test.com");
        await shippingPage.completeFirstName('name');
        await shippingPage.completeLastName('lastname');
        await shippingPage.completeCompany('company');

    })

});