import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
    /*
    const userName = "phuoc2";
    const email = "phuoc2@yopmail.com";
    const registerPage = new RegisterPage(page)
    registerPage.xpathUsername = "//input[@name='username']";
    registerPage.xpathEmail = "//input[@name='email']";
    registerPage.xpathGenderMale = "//input[@value='male']";
    registerPage.xpathGenderFemale = "//input[@value='female']";
    registerPage.xpathRegisterButton = "//button[contains(text(),'Register')]";
    registerPage.xpathRegisterPage = "//a[contains(text(), 'Register Page')]";

    */
    page: Page;
    xpathLoginPage: string;
    xpathPostPage: string;
    xpathMedia: string;
    cssTodoPage: string;

    constructor(page: Page) {
        this.page = page;
    }

    async openLoginPage() {
        await this.page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    }

    async goToPage(menuName: string, subMenu: string) {
    }

    async generateXpath() {


    }
}

export class UtilPage extends BasePage {

}

export class PostPage extends UtilPage {
    xpathAddTag: string;
    xpathTagName: string;
    xpathSlug: string;
    xpathErrorMessage: string;
    xpathRowTitle: string;
    xpathCheckColumn: string;
    xpathBulkAction: string;
    xpathBtnDelete: string;
    xpathDoAction: string;
    xpathSlugCol: string;

    async addTag(tagName: string, slug: string, mainTab: string, subTab: string): Promise<void> {
        // await this.goToPage(mainTab);
        // await this.goToPage(subTab);
        await this.page.locator(this.xpathTagName).fill(tagName);
        await this.page.locator(this.xpathSlug).fill(slug);
        await this.page.locator(this.xpathAddTag).click();
    }

    async checkShowAddedMessage(exptextedText: string) {
        const actualText = await this.page.locator(this.xpathErrorMessage).innerText();
        return actualText.toLocaleLowerCase() === exptextedText.toLocaleLowerCase();
    }

    async deleteTag(tagUserName: string): Promise<void> {
        const row = this.page.locator('tr', {
            has: this.page.locator(this.xpathRowTitle, { hasText: tagUserName })
        });
        await row.locator(this.xpathCheckColumn).check();
        await this.page.locator(this.xpathBulkAction).click();
        await this.page.locator(this.xpathBtnDelete).selectOption('delete');
        await this.page.locator(this.xpathDoAction).click();
    }

    async checkTagNameAndSlug(expectedSlug: string) {
        const rowVisible = await this.page.locator('tr', {
            has: this.page.locator(this.xpathSlugCol, { hasText: expectedSlug })
        }).isVisible();
        return rowVisible;
    }
}
