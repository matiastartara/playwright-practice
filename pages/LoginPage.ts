import { type Locator, type Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly signBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('id=email');
        this.password = page.locator('id=pass');
        this.signBtn = page.getByRole('button', { name: 'Sign In' });
    }

    async completeUsername(userEmail: string) {
        await this.email.fill(userEmail);
    }

    async completePassword(password: string){
        await this.password.fill(password);
    }

    async clickOnSignIn(){
        await this.signBtn.click();
    }

    async isNotLoggedIn() {
       return await this.signBtn.isVisible();
    }

}

export default LoginPage;