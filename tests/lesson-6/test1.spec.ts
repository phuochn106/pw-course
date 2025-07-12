import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/lesson-06/register';

test('Register successfully and check table data', async ({ page }) => {
    const userName = "phuoc5";
    const email = "phuoc5@yopmail.com";
    const registerPage = new RegisterPage(page)

    await test.step('Open material page -> Register page', async () => {
        await registerPage.openMaterialPage();
        await registerPage.gotoPage('Register Page');
    });

    await test.step('Fill and submit register form', async () => {
        await registerPage.fillUserName(userName);
        await registerPage.fillEmail(email);
        await registerPage.checkGender('female');
        await registerPage.doSubmitFormRegister();
    });

    await test.step('Verify registered info in table', async () => {
        const isDisplayed = await registerPage.checkRegisterSuccess(userName, email);
        expect(isDisplayed).toBeTruthy();
    });
});