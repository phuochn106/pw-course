import { MaterialBasePage } from "../01-pom";

export class PostPage extends MaterialBasePage {
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
        await this.gotoPage(mainTab);
        await this.gotoPage(subTab);
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