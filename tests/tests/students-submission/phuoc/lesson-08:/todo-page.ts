import { Page } from "@playwright/test";
import { MaterialBasePage } from "./01-pom";

export class TodoPage extends MaterialBasePage {
    xpathInputTask: string;
    xpathAddTaskButton: string;

    constructor(page: Page) {
        super(page);
    }

    async addTodo(content: string): Promise<void> {
        await this.page.locator(this.xpathInputTask).fill(content);
        await this.page.locator(this.xpathAddTaskButton).click();
    }

    async checkTodoItemInView(content: string) {
        const checkVisible = await this.page.locator(`//li/span[contains(text(),"${content}")]`).isVisible();
        return checkVisible
    }

    async checkTodoItemNotInView(content: string) {
        const count = await this.page.locator(`//li/span[contains(text(),"${content}")]`).count();
        return count === 0;
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