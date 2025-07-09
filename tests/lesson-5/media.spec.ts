import { test, expect, Page, chromium } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { Media } from '../tests/students-submission/phuoc/lesson-08:/media-page';

test.describe('MEDIA-Media', () => {
    test('@MEDIA_FILES_001-Media - upload file success', async ({ page }) => {
        const mediaPage = new Media(page);
        mediaPage.xpathLoginButton = "#wp-submit";
        const adminPageLink = 'https://pw-practice-dev.playwrightvn.com/wp-admin';
        mediaPage.xpathUsername = "#user_login";
        mediaPage.xpathPassword = "#user_pass";
        mediaPage.xpathDeleteFileName = "//div[contains(text(),'phuoc.txt')]";
        mediaPage.xpathBtnDel = '//div[@class="actions"]/button';
        const username = 'p103-phuoc';
        const pwd = '$9ICWlOVhHW2nNZUtkLPq)%e';
        mediaPage.xpathBtnUpload = '//a[@class="page-title-action aria-button-if-js"]';
        const fileName = 'tests/phuoc.txt';
        const lblUploadedFileName = "div.filename >> text=phuoc.txt";
        const expectedLink = 'https://pw-practice-dev.playwrightvn.com/wp-admin/upload.php';


        await test.step('Step:Login', async () => {
            await mediaPage.openLoginPage(adminPageLink)
            mediaPage.doLogin(username, pwd)
        })

        await test.step('Step: upload file', async () => {
            mediaPage.goToMainAndSubMenu('Media', 'Library');
            await mediaPage.uploadFile(fileName);
        })

        await test.step('Step: Check upload success', async () => {
            await expect(page.locator(lblUploadedFileName)).toBeVisible();
        })

        await test.step('Step: Reload page', async () => {
            await page.reload();
            await expect(page).toHaveURL(expectedLink);
        })

        await test.step('Step: Remove added file', async () => {
            mediaPage.deleteUploadedFile();
        })
    })
})