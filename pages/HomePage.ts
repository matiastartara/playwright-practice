import { type Locator, type Page } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly signInBtn: Locator;
    readonly search: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInBtn = page.getByRole('link', { name: 'Sign In' });
        this.search = page.locator('#search');
    }

    async clickOnSignIn() {
        await this.signInBtn.click();
    }

    async searchProduct(product : string){
        await this.search.fill(product);
        await this.search.press('Enter');
    }
}

export default HomePage;