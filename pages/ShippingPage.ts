import { type Locator, type Page } from '@playwright/test';

export class ShippingPage {

    readonly page: Page;
    readonly email: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly password: Locator;
    readonly street: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('form > fieldset > div.field.required > div > input[name="username"]');
        this.firstName = page.locator('[name="firstname"]');
        this.lastName = page.locator('[name="lastname"]');
        this.company = page.locator('[name="company"]');
        this.password = page.locator('[placeholder="Password"]');
        this.street = page.locator('[name="shippingAddress.street.1"] input');
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

    async completeCompany(companyName: string) {
        await this.company.fill(companyName);
    }

    async completePassword(pwd: string) {
        await this.password.fill(pwd);
    }

    async completeStreet(street: string) {
        await this.street.fill(street);
    }

}

export default ShippingPage;