import { Locator, Page } from "@playwright/test";

export class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string;
    xpathProductPage: string;
    cssTodoPage: string;
    personalNote: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async openMaterialPage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }

    async generateXpathPage(pageName: string) {
        return `//a[contains(text(),'${pageName}')]`;
    }

    async gotoPage(pageName: string) {
        this.page.locator(await this.generateXpathPage(pageName)).click();
    };
}