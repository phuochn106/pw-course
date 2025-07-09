import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { POMmanager } from '../tests/students-submission/phuoc/pom-manager-lesson6';

test('Register successfully and check table data', async ({ page }) => {
    const userName = "phuoc2";
    const email = "phuoc2@yopmail.com";
    const pomManager = new POMmanager(page);
    const registerPage = pomManager.getRegisterPage();
    registerPage.xpathUsername = "//input[@name='username']";
    registerPage.xpathEmail = "//input[@name='email']";
    registerPage.xpathGenderMale = "//input[@value='male']";
    registerPage.xpathGenderFemale = "//input[@value='female']";
    registerPage.xpathRegisterButton = "//button[contains(text(),'Register')]";

    await test.step('Open material page and go to register page', async () => {
        await registerPage.openMaterialPage();
        await registerPage.gotoPage('Register Page');
    });

    await test.step('Fill form and submit', async () => {
        await registerPage.fillUserName(userName);
        await registerPage.fillEmail(email);
        await registerPage.checkGender('female');
        await registerPage.clickRegister();
    });

    await test.step('Verify registered info in table', async () => {
        const isDisplayed = await registerPage.isUserInfoDisplayed(userName, email);
        expect(isDisplayed).toBeTruthy();
    });
});