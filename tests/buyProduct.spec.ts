import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import ProductPage from '../pages/ProductPage';
import ShippingPage from '../pages/ShippingPage';
import PaymentPage from '../pages/PaymentPage';

const URL = 'https://magento.softwaretestingboard.com/';
let homePage: HomePage;
let catalogPage: CatalogPage;
let productPage: ProductPage;
let shippingPage : ShippingPage;
let paymentPage : PaymentPage;

test.describe('Buy product test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        homePage = new HomePage(page);
        catalogPage = new CatalogPage(page);
        productPage = new ProductPage(page);
        shippingPage = new ShippingPage(page);
        paymentPage = new PaymentPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Add to cart and buy product test', async ({ page }) => {
        await expect(page).toHaveTitle('Home Page');
        let product = 'yoga';

        //Search product
        await homePage.searchProduct(product);

        //Check product result list size 
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

        //Set shipping information
        await shippingPage.completeEmail("test@test.com");
        await shippingPage.completeFirstName('name');
        await shippingPage.completeLastName('lastname');
        await shippingPage.completeCompany('company');
        await shippingPage.completePassword('testpwd');
        await shippingPage.completeStreet('street 123');
        await shippingPage.completeCity('Tandil');
        await shippingPage.selectState('5');
        await shippingPage.setPhone('34567');
        await shippingPage.setRandomShippingMethod();
        await shippingPage.setPostalCode('123');
        await shippingPage.clickOnNext();

        //Finish payment section
        await paymentPage.clickOnPlaceOrder();
        const text = await paymentPage.getMessageConfirmation();
        expect(text).toBe('Thank you for your purchase!');

    })

});