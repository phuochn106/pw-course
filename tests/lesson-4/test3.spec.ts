import { test } from '@playwright/test';

test('Test 1: Register', async ({ page }) => {
    //Truy cập trang https://material.playwrightvn.com/
    await test.step('Step 1: Go to link', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Step 2: Click todo page', async () => {
        await page.locator(`//a[contains(text(),'Todo page')]`).click();
    })

    await test.step('Step 3: Add 100 todo item', async () => {
        for (let i = 1; i <= 10; i++) {
            await page.locator(`//input[@id="new-task"]`).fill(`Todo ${i}`);
            await page.locator(`//button[@id="add-task"]`).click();
        }
    })

    await test.step('Step 4: Delete odd task item', async () => {
        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        for (let i = 1; i <= 10; i++) {
            if (i % 2 !== 0) {
                await page.locator(`//button[@id="todo-${i}-delete"]`).click()
            }
        }

    })

});


