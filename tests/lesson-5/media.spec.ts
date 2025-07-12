import { test, expect, Page, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/lesson-05/login';
import { MediaPage } from '../../pages/lesson-05/media';

test.describe('MEDIA-Media', () => {
    let loginPage: LoginPage;
    let mediaPage: MediaPage;
    const userName = "p103-phuoc";
    const password = "$9ICWlOVhHW2nNZUtkLPq)%e";
    const urlFile = 'tests/phuoc.txt';
    const fileName = 'phuoc.txt';
    const haveUrl = 'https://pw-practice-dev.playwrightvn.com/wp-admin/upload.php';

    test('@MEDIA_FILES_001-Media - upload file success', async ({ page }) => {
        await test.step('Step:Login', async () => {
            loginPage = new LoginPage(page);
            mediaPage = new MediaPage(page);
            await loginPage.openAdminPage();
            await loginPage.doLoginToAdminPage(userName, password);
        })

        await test.step('Step: upload file', async () => {
            loginPage.goToPage('Library');

            //Check upload file
            await mediaPage.uploadMediaFile(urlFile);
        })

        await test.step('Step: Check upload success', async () => {
            const locatorDivFileName = await mediaPage.checkUploadFileSuccess(fileName);
            expect(locatorDivFileName.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Reload page', async () => {
            await page.reload();
            await expect(page).toHaveURL(haveUrl);
        })

        await test.step('Step: Remove added file', async () => {
            await mediaPage.deleteUpdatedFile(fileName);
        })
    })
})