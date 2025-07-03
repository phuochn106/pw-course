// File: 01-pom.ts
import { Page, Locator, expect } from '@playwright/test';

export class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string;
    xpathProductPage: string;
    cssTodoPage: string;
    personalNote: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async openMaterialPage() {
        await this.page.goto('https://material.playwrightvn.com/');
    }

    async gotoPage(pageName: string) { }
}

export class RegisterPage extends MaterialBasePage {
    xpathUsername: string;
    xpathEmail: string;
    xpathGenderMale: string;
    xpathGenderFemale: string;
    xpathRegisterButton: string;

    constructor(page: Page) {
        super(page);
    }

    async gotoPage(pageName: string): Promise<void> {
        this.page.locator(this.xpathRegisterPage).click();
    }

    async fillUsername(username: string): Promise<void> {
        await this.page.locator(this.xpathUsername).fill(username);
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

export class ProductPage extends MaterialBasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoPage(pageName: string): Promise<void> {
        this.page.locator(this.xpathProductPage).click();
    }

    async addProductToCart(index: number, productQty: number): Promise<void> {
        await this.page.locator(`//button[@data-product-id="${index}"]`).click({ clickCount: productQty });
    }

    async checkProductQuantity(index: number, productQty: number) {
        const isRightAdded = await this.page.locator(`(//td[contains(text(),"Product ${index}")]/following-sibling::td)[${productQty}]`).isVisible();
        return isRightAdded;
    }

    async checkToTalPrice() {
        let sum = 0;
        for (let i = 1; i <= 3; i++) {
            let itemPriceText = await this.page.locator(`(//td[contains(text(),"Product ${i}")]/following-sibling::td)[3]`).innerText();
            let itemPrice = parseFloat(itemPriceText.replace(/[^0-9.]/g, ''));
            sum += itemPrice;
        }
        let lblTotal = await this.page.locator(`(//td[@class="total"]/following-sibling::td)[1]`).innerText();
        let priceInTotal = parseFloat(lblTotal.replace(/[^0-9.]/g, ''));
        return sum === priceInTotal;
    }
}

export class TodoPage extends MaterialBasePage {
    inputField: Locator;
    todoList: Locator;
    xpathTodoPage: string;

    constructor(page: Page) {
        super(page);
    }

    async gotoPage(pageName: string): Promise<void> {
        await this.page.locator(this.xpathTodoPage).click();
    }

    async addTodo(content: string): Promise<void> {
        await this.page.locator(`//input[@id="new-task"]`).fill(content);
        await this.page.locator(`//button[@id="add-task"]`).click();
    }

    async checkTodoItemInView(content: string) {
        const isVisible = await this.page.locator(`//li/span[contains(text(),"${content}")]`).isVisible();
        return isVisible
    }

    async checkTodoItemNotInView(content: string) {
        const count = await this.page.locator(`//li/span[contains(text(),"${content}")]`).count();
        return count === 0;
    }

    async deleteTodo() {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        for (let i = 1; i <= 10; i++) {
            if (i % 2 !== 0) {
                await this.page.locator(`//button[@id="todo-${i}-delete"]`).click()
            }
        }
    }
}

export class PersonalNotePage extends MaterialBasePage {
    inputTitle: Locator;
    inputBody: Locator;
    btnAdd: Locator;
    inputSearch: Locator
    listNotes: Locator;
    xpathNotePage: string;

    constructor(page: Page) {
        super(page);
    }

    async gotoPage(pageName: string): Promise<void> {
        await this.page.locator(this.xpathNotePage).click();
    }

    async addNote(title: string, body: string) {
        await this.inputTitle.fill(title);
        await this.inputBody.fill(body);
        await this.btnAdd.click();
    }

    async search(keyword: string) {
        await this.inputSearch.fill(keyword);
        await this.inputSearch.click();
    }

    async getSearchResultTexts(): Promise<string[]> {
        return await this.listNotes.allInnerTexts();
    }
}
