import { type Locator, type Page } from '@playwright/test';

export class ShippingPage {

    readonly page: Page;
    readonly email: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly password: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly phone: Locator;
    readonly postalCode: Locator;
    readonly shippingMethods: Locator;
    readonly nextButton: Locator;
    readonly loadingComponent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('form > fieldset > div.field.required > div > input[name="username"]');
        this.firstName = page.locator('[name="firstname"]');
        this.lastName = page.locator('[name="lastname"]');
        this.company = page.locator('[name="company"]');
        this.password = page.locator('[placeholder="Password"]');
        this.street = page.locator('[name="shippingAddress.street.0"] input');
        this.city = page.locator('[name="shippingAddress.city"] div input');
        this.state = page.locator('[name="shippingAddress.region_id"] select');
        this.phone = page.locator('[name="shippingAddress.telephone"] input');
        this.shippingMethods = page.locator('.table-checkout-shipping-method tr input');
        this.postalCode = page.locator('[name="shippingAddress.postcode"] input');
        this.nextButton = page.locator('#shipping-method-buttons-container [type="submit"]');
        this.loadingComponent = page.getByTitle('Loading...');
    }

    async waitForLoadingToHide() {
        await this.loadingComponent.waitFor({ state: 'hidden', timeout: 60000 });
    }

    async completeEmail(mail: string) {
        await this.email.fill(mail);
    }

    async completeFirstName(name: string) {
        await this.waitForLoadingToHide();
        await this.firstName.fill(name);
    }

    async completeLastName(lName: string) {
        await this.lastName.fill(lName);
    }

    async completeCompany(companyName: string) {
        await this.company.fill(companyName);
    }

    async completePassword(pwd: string) {
        await this.waitForLoadingToHide();
        await this.password.fill(pwd);
    }

    async completeStreet(street: string) {
        await this.street.fill(street);
    }

    async completeCity(city: string) {
        await this.city.fill(city);
    }

    async selectState(state: string) {
        await this.state.selectOption(state);
    }

    async setPhone(phone: string) {
        await this.phone.fill(phone);
    }

    async setRandomShippingMethod() {
        const count = await this.shippingMethods.count();
        const randomIndex = Math.floor(Math.random() * count);
        await this.shippingMethods.nth(randomIndex).click();
    }

    async setPostalCode(postalCode: string){
        await this.postalCode.fill(postalCode);
    }

    async clickOnNext(){
        await this.nextButton.click();
    }

}

export default ShippingPage;