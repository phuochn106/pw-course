import { Page, Locator, expect } from '@playwright/test';
export class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string;// = "//a[contains(text(), 'Register Page')]";
    xpathProductPage: string;//= "//a[contains(text(), 'Product page')]";;
    cssTodoPage: string;
    personalNote: Locator;
    baseLink: string;// = 'https://material.playwrightvn.com/';

    constructor(page: Page) {
        this.page = page;
    }

    async openMaterialPage() {
        await this.page.goto(this.baseLink);
    }

    async gotoPage(pageName: string) {
        await this.page.locator(`//a[contains(text(), '${pageName}')]`).click();
    }

    async checkExpectedTextDisplay(xPath: string, expectedText: string) {
        const realText = await this.page.locator(xPath).innerText();
        return realText === expectedText;;
    }
}
