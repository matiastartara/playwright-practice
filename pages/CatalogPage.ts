import { type Locator, type Page } from '@playwright/test';

export class CatalogPage {

    readonly page: Page;
    readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.item.product .product-item-link');
    }

    async waitForCaptcha(page: Page) {
        const responsePromise = page.waitForResponse(
            resp => resp.url().includes('/checkout/captcha.html') && resp.status() === 200
        );
        return responsePromise;
    }   

    async getProductListSize() {
        return await this.products.count()
    }

    async getProductNames() {
        return this.products.allTextContents();
    }

    async selectProductAt(position: number) {
        await this.products.nth(position).click();
    }

}

export default CatalogPage;