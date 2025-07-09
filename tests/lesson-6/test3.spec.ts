import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todo-page';

test('Todo test - add, remove, verify visibility', async ({ page }) => {
    const todoPage = new TodoPage(page);
    todoPage.xpathInputTask = '//input[@id="new-task"]';
    todoPage.xpathAddTaskButton = '//button[@id="add-task"]';

    await test.step('Step: open material page and go to Todo page', async () => {
        await todoPage.openMaterialPage();
        await todoPage.gotoPage('Todo page');
    });

    await test.step('Step:Add 100 todo items', async () => {
        for (let i = 1; i <= 10; i++) {
            await todoPage.addTodo(`Todo ${i}`);
        }
    });

    await test.step('Delete odd-numbered todos', async () => {
        await todoPage.deleteTodoItem(10);
    });

    await test.step('Verify Todo 90 is visible in viewport', async () => {
        const isVisibleItem = todoPage.checkTodoItemInView("Todo 10");
        expect(isVisibleItem).toBeTruthy();
    });

    await test.step('Verify Todo 21 is not in DOM', async () => {
        const isNotInDOM = await todoPage.checkTodoItemNotInView("Todo 9");
        expect(isNotInDOM).toBeTruthy();
    });
});