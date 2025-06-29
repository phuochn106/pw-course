import { test, expect, Page, chromium } from '@playwright/test';

let page: Page;
let browser;
test.describe('MEDIA-Media', () => {
    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator("#user_login").fill("p103-phuoc");
        await page.locator("#user_pass").fill("$9ICWlOVhHW2nNZUtkLPq)%e");
        await page.locator("#wp-submit").click();
    })

    test.afterEach(async () => {
        await browser.close();
    });

    test('@MEDIA_FILES_001-Media - upload file success', async () => {
        await test.step('Step: upload file', async () => {
            await page.locator("//div[contains(text(), 'Media')]").click();
            await page.locator("//a[contains(text(), 'Library')]").click();
            await page.locator("#submit").click();

            //Check upload file
            page.locator('//a[@class="page-title-action aria-button-if-js"]').click();
            await page.locator('#__wp-uploader-id-1').setInputFiles('tests/phuoc.txt');
        })
    })
})