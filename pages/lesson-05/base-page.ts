import { expect, Locator, Page } from "@playwright/test";

export class AdminBasePage {
    page: Page;
    xpathErrorMessage: string;

    constructor(page: Page) { }

    async openAdminPage() {
        await this.page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/");
    }

    async goToPage(subMenu: string) {
        await this.page.locator((`//li[@class="wp-submenu-head"]/following-sibling::li/a[text()="${subMenu}"]`)).click();
    }
}