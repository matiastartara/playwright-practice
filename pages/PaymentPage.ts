import { type Locator, type Page } from '@playwright/test';

export class PaymentPage {

    readonly page: Page;
    readonly placeOrderButton: Locator;
    readonly purchaseMessageConfirmation: Locator;
    readonly continueShoppingButton: Locator;
    readonly loadingComponent: Locator;
    readonly checkoutLoader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.getByText('Place Order');
        this.purchaseMessageConfirmation = page.locator('h1 > span');
        this.continueShoppingButton = page.locator('//*[contains(text(),"Continue Shopping")]');
    }

    async clickOnPlaceOrder() {
        await this.placeOrderButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.placeOrderButton.click();
    }

    async getMessageConfirmation() {
        await this.continueShoppingButton.waitFor({ state: 'visible', timeout: 90000 });
        await this.purchaseMessageConfirmation.waitFor({ state: 'visible' });
        return this.purchaseMessageConfirmation ? await this.purchaseMessageConfirmation.innerText() : null;
    }

}

export default PaymentPage;