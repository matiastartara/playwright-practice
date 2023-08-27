import { type Locator, type Page } from '@playwright/test';

export class ShippingPage {

    readonly page: Page;
    readonly email: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('form > fieldset > div.field.required > div > input[name="username"]');
        this.firstName = page.locator('[name="firstname"]');
        this.lastName = page.locator('[name="lastname"]');
    }

    async completeEmail(mail: string) {
        await this.email.fill(mail);
    }

    async completeFirstName(name: string) {
        await this.firstName.fill(name);
    }

    async completeLastName(lName: string) {
        await this.lastName.fill(lName);
    }

}

export default ShippingPage;