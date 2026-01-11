import { Page } from "@playwright/test";
import { MaterialBasePage } from "./material";

export class RegisterPage extends MaterialBasePage {
    xpathUsername: string = "//input[@name='username']";
    xpathEmail: string = "//input[@name='email']";
    xpathGenderMale: string = "//input[@value='male']";
    xpathGenderFemale: string = "//input[@value='female']";
    xpathButtonRegister: string = "//button[@type='submit']";

    constructor(page: Page) {
        super(page);
    }

    async fillUserName(userName: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(userName);
    }

    async fillEmail(email: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(email);
    }

    async checkGender(gender: string): Promise<void> {
        if (gender.toLowerCase() === 'male') {
            await this.page.locator(this.xpathGenderMale).click();
        } else {
            await this.page.locator(this.xpathGenderFemale).click();
        }
    }

    async doSubmitFormRegister(): Promise<void> {
        await this.page.locator(this.xpathButtonRegister).click();
    }

    async checkRegisterSuccess(userName: string, email: string): Promise<boolean> {
        const rowLocator = this.page.locator(`//tr[td[2][normalize-space()="${userName}"] and td[3][normalize-space()="${email}"]]`);
        return rowLocator.isVisible();
    }

}