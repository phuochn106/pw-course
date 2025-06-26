import { test } from '@playwright/test';

test('Test 1: Register', async ({ page }) => {
    //Truy cập trang https://material.playwrightvn.com/
    await test.step('Step 1: Go to link', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Step 2: Click register', async () => {
        await page.locator(`//a[contains(text(),'Bài học 1: Register Page')]`).click();
    })

    await test.step('Step 3: Fill info ', async () => {
        await page.locator(`//input[@id='username']`).fill("Phuoc Nguyen");
        await page.locator(`//input[@id='email']`).fill("phuoc1103@gmail.com");
        await page.locator(`//input[@id='female']`).check();
        await page.locator(`//input[@id='traveling']`).check();
        await page.locator(`//select[@id='interests']/option[1]`);
        await page.locator(`//select[@id='country']/option[1]`);
        await page.locator(`//input[@id="dob"]`).click();
        await page.locator(`//input[@id="dob"]`).pressSequentially("01");
        await page.locator(`//input[@id="dob"]`).pressSequentially("01");
        await page.locator(`//input[@id="dob"]`).pressSequentially("1999");
        await page.setInputFiles(`//input[@id="profile"]`, "tests/lesson-4/01-dom-answer.txt");
        await page.locator(`//textarea[@id="bio"]`).fill("Nothing special");
        await page.locator(`//input[@id="newsletter"]`).check();
        //await page.locator(`//input[@id="toggleOption"]`).check();
        await page.locator(`//button[@type="submit"]`).click();

    })

});


