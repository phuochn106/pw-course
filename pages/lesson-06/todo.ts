import { Page } from "@playwright/test";
import { MaterialBasePage } from "./material";

export class TodoPage extends MaterialBasePage {
    xpathInputTask: string = "#new-task";
    xpathButtonAddTask: string = "#add-task";
    xpathRowItem: string = "";
    constructor(page: Page) {
        super(page);
    }

    async addTodoItem(content: string): Promise<void> {
        await this.page.locator(this.xpathInputTask).fill(content);
        await this.page.locator(this.xpathButtonAddTask).click();
    }
    async genTodoXpathItem(content: string): Promise<string> {
        return `//li/span[contains(text(),"${content}")]`
    }

    async checkTodoItemInView(content: string): Promise<boolean> {
        const checkVisible = this.page.locator(await this.genTodoXpathItem(content)).isVisible();
        return checkVisible
    }

    async checkTodoItemNotInView(content: string): Promise<number> {
        const count = this.page.locator(await this.genTodoXpathItem(content)).count();
        return count;
    }
    /**
     * Xoa cac item la so le
     * @param totalItem : Tong so to do item co trong page
     */
    async deleteTodoItem(totalItem: number) {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        for (let i = 1; i <= totalItem; i++) {
            if (i % 2 !== 0) {
                await this.page.locator(`//button[@id="todo-${i}-delete"]`).click()
            }
        }
    }

}