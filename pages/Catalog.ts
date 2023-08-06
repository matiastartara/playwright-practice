import { type Locator, type Page } from '@playwright/test';

export class CatalogPage {

    readonly page: Page;
    readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator('.item.product .product-item-link');
    }

    async getProductListSize() {
        return await this.products.count()
    }

    async getProducts() {
        return this.products.allTextContents();
    }

}

export default CatalogPage;