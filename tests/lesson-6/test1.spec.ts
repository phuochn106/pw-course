import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/01-pom';

test('Register successfully and check table data', async ({ page }) => {
    const userName = "phuoc2";
    const email = "phuoc2@yopmail.com";
    const registerPage = new RegisterPage(page)
    registerPage.xpathUsername = "//input[@name='username']";
    registerPage.xpathEmail = "//input[@name='email']";
    registerPage.xpathGenderMale = "//input[@value='male']";
    registerPage.xpathGenderFemale = "//input[@value='female']";
    registerPage.xpathRegisterButton = "//button[contains(text(),'Register')]";
    registerPage.xpathRegisterPage = "//a[contains(text(), 'Register Page')]";

    await test.step('Open material page and go to register page', async () => {
        await registerPage.openMaterialPage();
        await registerPage.gotoPage(registerPage.xpathRegisterPage);
    });

    await test.step('Fill form and submit', async () => {
        await registerPage.fillUsername(userName);
        await registerPage.fillEmail(email);
        await registerPage.checkGender('female');
        await registerPage.clickRegister();
    });

    await test.step('Verify registered info in table', async () => {
        const isDisplayed = await registerPage.isUserInfoDisplayed(userName, email);
        expect(isDisplayed).toBeTruthy();
    });
});