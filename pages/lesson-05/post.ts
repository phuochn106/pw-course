import { expect, Locator, Page } from "@playwright/test";
import { AdminBasePage } from "./base-page";

export class PostPage extends AdminBasePage {
    xpathErrorMessage: string = '//div[@role="alert"]/p';
    xpathAddTag: string = "#wp-submit";
    xpathTagName: string = "#tag-name";
    xpathSlug: string = "#tag-slug";
    xpathRowTitle: string = "a.row-title";
    xpathBulkAction: string = '//select[@id ="bulk-action-selector-top"]';
    xpathBtnDelete: string = '//select[@id="bulk-action-selector-top"]/option[@value="delete"]';
    xpathApply: string = '#doaction';
    xpathSlugCol: string = 'td[data-colname="Slug"]';
    xpathParentCategory: string = "//select[@id='parent']";

    constructor(page: Page) {
        super(page);
    }

    async addNewTag(tagName: string, slug: string, parentCate: string): Promise<void> {
        await this.page.locator(this.xpathTagName).fill(tagName);
        await this.page.locator(this.xpathSlug).fill(slug);
        if (parentCate === '') {
            await this.page.locator(this.xpathParentCategory).selectOption('k11 class');
        }
        await this.page.locator(this.xpathAddTag).click();
    }

    async checkShowExpectedMessage(exptextedText: string): Promise<boolean> {
        const actualText = await this.page.locator(this.xpathErrorMessage).innerText();
        return actualText.toLocaleLowerCase() === exptextedText.toLocaleLowerCase();
    }

    async deleteAddedTag(tagUserName: string, slug: string): Promise<void> {
        const checkboxLocator = await this.checkTagNameAndSlug(tagUserName, slug);
        if (await checkboxLocator.isVisible()) {
            await checkboxLocator.click();
        }
        await this.page.locator(this.xpathBulkAction).click();
        await this.page.locator(this.xpathBtnDelete).click();
        await this.page.locator(this.xpathApply).click();
    }

    async checkTagNameAndSlug(tagUserName: string, slug: string): Promise<Locator> {
        const xpathTagCell = this.page.locator(`//td[@data-colname='Name'][.//a[text()='${tagUserName}']]/following-sibling::td[@data-colname='Slug' and text()='${slug}']/preceding-sibling::th`);
        return xpathTagCell;
    }

    async getCateParentValue(parentValue: string): Promise<void> {
        await this.page.locator(this.xpathParentCategory).selectOption('K11 class');
    }
}