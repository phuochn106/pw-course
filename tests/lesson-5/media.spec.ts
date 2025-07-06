import { test, expect, Page, chromium } from '@playwright/test';

test.describe('MEDIA-Media', () => {
    test('@MEDIA_FILES_001-Media - upload file success', async ({ page }) => {
        await test.step('Step:Login', async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
            await page.locator("#user_login").fill("p103-phuoc");
            await page.locator("#user_pass").fill("$9ICWlOVhHW2nNZUtkLPq)%e");
            await page.locator("#wp-submit").click();
        })

        await test.step('Step: upload file', async () => {
            await page.locator("//div[contains(text(), 'Media')]").click();
            await page.locator("//a[contains(text(), 'Library')]").nth(0).click();

            //Check upload file
            await page.locator('//a[@class="page-title-action aria-button-if-js"]').click();
            await page.locator('//input[@type="file"]').setInputFiles('tests/phuoc.txt');
        })

        await test.step('Step: Check upload success', async () => {
            await expect(page.locator('div.filename >> text=phuoc.txt')).toBeVisible();
        })

        await test.step('Step: Reload page', async () => {
            await page.reload();
            await expect(page).toHaveURL('https://pw-practice-dev.playwrightvn.com/wp-admin/upload.php');
        })

        await test.step('Step: Remove added file', async () => {
            page.once('dialog', async (dialog) => {
                await dialog.accept();
            });
            await page.locator("//div[contains(text(),'phuoc.txt')]").click();
            page.locator('//div[@class="actions"]/button').click();
        })
    })
})