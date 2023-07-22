import { type Locator, type Page } from '@playwright/test';


export class HomePage {

    readonly page:Page;
    readonly signInBtn:Locator;

    constructor(page:Page){
        this.page=page;
        this.signInBtn=page.getByRole('link', { name: 'Sign In' });
    }

    async clickOnSignIn(){
        await this.signInBtn.click();
    }

}

export default HomePage;