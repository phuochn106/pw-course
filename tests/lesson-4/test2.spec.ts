import { test } from '@playwright/test';

test('Test 1: Register', async ({ page }) => {
    //Truy cập trang https://material.playwrightvn.com/
    await test.step('Step 1: Go to link', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Step 2: Click product page', async () => {
        await page.locator(`//a[contains(text(),'Bài học 2: Product page')]`).click();
    })

    await test.step('Step 3: Add product to cart', async () => {
        await page.locator(`//button[@data-product-id="1"]`).dblclick();
        await page.locator(`//button[@data-product-id="2"]`).click({ clickCount: 3 });
        await page.locator(`//button[@data-product-id="3"]`).click();
    })


});


