import { Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./base-page";

export class MediaPage extends AdminBasePage {

    xpathAddMediaFile: string = '//a[@class="page-title-action aria-button-if-js"]';
    xpathUploadFile: string = '//input[@type="file"]';
    xpathBtnDelFile: string = '//div[@class="actions"]/button';

    constructor(page: Page) {
        super(page);
    }

    async uploadMediaFile(fileName: string): Promise<void> {
        await this.page.locator(this.xpathAddMediaFile).click();
        await this.page.locator(this.xpathUploadFile).setInputFiles(fileName);
    }

    async checkUploadFileSuccess(fileName: string): Promise<Locator> {
        return this.page.locator(`//div[@class="filename"]/div[text()="${fileName}"]`)
    }

    async deleteUpdatedFile(fileName: string) {
        this.page.once('dialog', async (dialog) => {
            await dialog.accept();
        });
        const uploadFileLocator = await this.checkUploadFileSuccess(fileName);
        uploadFileLocator.click();
        this.page.locator(this.xpathBtnDelFile).click();
    }
}