import { PostPage } from "./post-page";

export class Category extends PostPage {
    xpathAddCate: string;

    async addNewCategory(cateName: string, slug: string, mainTab: string, subTab: string): Promise<void> {
        await this.gotoPage(mainTab);
        await this.gotoPage(subTab);
        await this.page.locator(this.xpathTagName).fill(cateName);
        await this.page.locator(this.xpathSlug).fill(slug);
        await this.page.locator(this.xpathAddCate).click();
    }

    async checkShowAddedMessage(exptextedText: string) {
        const actualText = await this.page.locator(this.xpathErrorMessage).innerText();
        return actualText.toLocaleLowerCase() === exptextedText.toLocaleLowerCase();
    }

    async deleteCategory(tagUserName: string): Promise<void> {
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
