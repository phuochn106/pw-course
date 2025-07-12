import { Page } from "@playwright/test";
import { AdminBasePage } from "./base-page";

export class LoginPage extends AdminBasePage {
    xpathUsername: string = "#user_login";
    xpathPassword: string = "#user_pass";
    xpathLoginButton: string = "#wp-submit";
    xpathErrorLabel: string = "#login_error>p";
    xpathDashBoard: string = '.wrap>h1';
    xpathGlance: string = '//div[@class="postbox-header"]/h2[text()="At a Glance"]';
    xpathActivity: string = '//div[@class="postbox-header"]/h2[text()="Activity"]';
    xpathDashboard: string = '//h1[text()="Dashboard"]';


    constructor(page: Page) {
        super(page);
    }

    async doLoginToAdminPage(userName: string, password: string) {
        await this.page.locator(this.xpathUsername).fill(userName);
        await this.page.locator(this.xpathPassword).fill(password);
        await this.page.locator(this.xpathLoginButton).click();
    }

    async checkExpectedTextDisplay(expectedText: string): Promise<boolean> {
        const realText = (await this.page.locator(this.xpathErrorLabel).allInnerTexts())[0];
        if (realText.toLowerCase() == expectedText.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }

    async checkHeadingDisplay(elemantXpath: string): Promise<boolean> {
        const elementDisplay = await this.page.locator(elemantXpath).isVisible();
        return elementDisplay;
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}