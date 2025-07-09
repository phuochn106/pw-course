import { expect, Page } from "@playwright/test";
import { MaterialBasePage } from "./01-pom";

export class RegisterPage extends MaterialBasePage {
    xpathEmail: string;
    xpathGenderMale: string;
    xpathGenderFemale: string;
    xpathRegisterButton: string;
    xpathUsername: string;
    xpathPassword: string;
    xpathLoginButton: string;
    xpathErrorLabel: string;
    redirectLink: string;
    xpathDashBoard: string;
    xpathGlance: string;
    xpathActivity: string;

    constructor(page: Page) {
        super(page)
    }

    async openLoginPage(adminPageLink: string) {
        await this.page.goto(adminPageLink);
    }

    async goToPage(tabName: string, subTabName: string): Promise<void> {
        if (subTabName === "") {
            await this.page.locator(`//div[contains(text(), "${tabName}")]`).click();
        } else {
            await this.page.locator(`//div[contains(text(), "${tabName}")]`).click();
            await this.page.locator(`//li/a[contains(text(),"${subTabName}")]`).click();
        }
    }

    async doLogin(username: string, password: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(username);
        await this.page.locator(this.xpathPassword).fill(password);
        await this.page.locator(this.xpathLoginButton).click();
    }

    async checkRedirectLink(expectedLink: string) {
        const correctLink = await expect(this.page).toHaveURL(expectedLink, { timeout: 5000 });
        return correctLink;
    }

    async checkLoginNotSuccess() {
        const displayText = (await this.page.locator("#login_error>p").allInnerTexts())[0];
        return displayText;
    }

    async fillUserName(userName: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(userName);
    }

    async fillEmail(email: string): Promise<void> {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender(gender: string): Promise<void> {
        if (gender.toLowerCase() === 'male') {
            await this.page.locator(this.xpathGenderMale).check();
        } else {
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async clickRegister(): Promise<void> {
        await this.page.locator(this.xpathRegisterButton).click();
    }

    async isUserInfoDisplayed(username: string, email: string) {
        const registeredRow = this.page.locator(`//td[contains(text(), '${username}')]/following-sibling::td[contains(text(), '${email}')]`);
        return await registeredRow.isVisible();
    }
}