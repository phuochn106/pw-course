import { Page } from "@playwright/test";

export class AdminBasePage {
    page: Page;
    xpathErrorMessage: string;

    constructor(page: Page) {
        this.page = page;
    }

    async openAdminPage(env: string) {
        const url = env === 'prod'
            ? process.env.ADMIN_PAGE_PROD
            : process.env.ADMIN_PAGE_DEV;

        if (!url) throw new Error('Thiếu biến môi trường URL admin');
        console.log(url);
        await this.page.goto(url as string);
    }

    async goToPage(mainMenu: string, subMenu: string) {
        await this.page.locator(`//div[contains(text(), '${mainMenu}')]`).click();
        if (subMenu !== '') {
            await this.page.locator((`//li[@class="wp-submenu-head"]/following-sibling::li/a[text()="${subMenu}"]`)).click();
        }
    }
}