import { type Locator, type Page } from '@playwright/test';

export class ProductPage {

    readonly page: Page;
    readonly addToCartBtn: Locator;
    readonly showCartBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartBtn = page.locator('id=product-addtocart-button');
        this.showCartBtn = page.locator('css=a.showcart');
    }

    async setColor(color: string) {
        await this.page.locator(`.color [option-label="${color}"]`).click();
    }

    async setSize(size: string) {
        await this.page.locator(`.size [option-label="${size}"]`).click();
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async showCart() {
        await this.showCartBtn.click();
    }

    async openCart() {
        await this.page.waitForSelector("//span[@class='counter-number' and text()='1']", { state: 'visible' });
        await this.page.locator("//span[@class='counter-number' and text()='1']").click();
    }

    async procededToCheckout() {
        await this.page.waitForSelector("id=top-cart-btn-checkout", { state: 'visible' });
        await this.page.locator('id=top-cart-btn-checkout').click();
    }


}

export default ProductPage;