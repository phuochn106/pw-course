import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
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

    async goToPage(tabName: string) {
    }
}

export class UtilPage extends BasePage {
    xpathUsername: string;
    xpathPassword: string;
    xpathLoginButton: string;
    xpathErrorLabel: string;
    redirectLink: string;
    xpathDashBoard: string;
    xpathGlance: string;
    xpathActivity: string;

    constructor(page: Page) {
        super(page);
    }

    async goToPage(tabName: string): Promise<void> {
        await this.page.locator(`//div[contains(text(), "${tabName}")]`).click();
        if (tabName.toLocaleLowerCase() === "posts") {
            await this.page.locator("//a[contains(text(), 'Tags')]").click();
        } else {
            await this.page.locator("//a[contains(text(), 'Library')]").nth(0).click();
        }
    }

    async doLogin(username: string, password: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(username);
        await this.page.locator(this.xpathPassword).fill(this.xpathPassword);
        await this.page.locator(this.xpathPassword).click();
    }

    async isCorrectRedirected(expectedLink: string) {
        const isCorrectLink = await expect(this.page).toHaveURL(expectedLink, { timeout: 5000 });
        return isCorrectLink;
    }

    async checkLoginNotSuccess(wUserName: string) {
        const displayText = (await this.page.locator("#login_error>p").allInnerTexts())[0];
        const expectedText = `Error: The username ${wUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`;
        const isFailed = expect(displayText).toBe(expectedText);
        return isFailed;
    }

    async checkExpectedTextDisplay(xPath: string, expectedText: string) {
        const realText = await this.page.locator(xPath).innerText();
        return realText === expectedText;;
    }
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
        await this.goToPage(mainTab);
        await this.goToPage(subTab);
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
