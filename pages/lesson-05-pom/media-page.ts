import { Page } from "@playwright/test";
import { MaterialBasePage } from "../../../../../pages/01-pom";

export class Media extends MaterialBasePage {
    xpathUsername: string;
    xpathPassword: string;
    xpathLoginButton: string;
    xpathBtnUpload: string;
    xpathBtnFile: string;
    xpathDeleteFileName: string;
    xpathBtnDel: string

    constructor(page: Page) {
        super(page);
    }

    async goToMainAndSubMenu(tabName: string, subTabName: string): Promise<void> {
        if (subTabName === "") {
            await this.page.locator(`//div[contains(text(), "${tabName}")]`).click();
        } else {
            await this.page.locator(`//div[contains(text(), "${tabName}")]`).click();
            await this.page.locator(`//li/a[contains(text(),"${subTabName}")]`).click();
        }
    }

    async openLoginPage(adminPageLink: string) {
        await this.page.goto(adminPageLink);
    }

    async doLogin(username: string, password: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(username);
        await this.page.locator(this.xpathPassword).fill(password);
        await this.page.locator(this.xpathLoginButton).click();
    }

    async uploadFile(fileName: string) {
        await this.page.locator(this.xpathBtnUpload).click();
        await this.page.locator(this.xpathBtnFile).setInputFiles(fileName);
    }

    async deleteUploadedFile() {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.page.locator(this.xpathDeleteFileName).click();
        this.page.locator(this.xpathBtnDel).click();
    }
}