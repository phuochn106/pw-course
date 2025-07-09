import { test, expect, Page, chromium } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
test.describe('AUTH-Authentication', () => {
    let page: Page;
    let browser;
    let inputtedUserName = "";
    let userName = "p103-phuoc";
    let wUserName = "p103";
    let password = "$9ICWlOVhHW2nNZUtkLPq)%e";
    let registerPage: RegisterPage;
    const adminPageLink = "https://pw-practice-dev.playwrightvn.com/wp-admin/";
    const xpathErrorLabel = "#login_error>p";
    const xpathDashBoard = '.wrap>h1';
    const xpathGlance = '(//div[@class="postbox-header"])[1]/h2';
    const xpathActivity = '(//div[@class="postbox-header"])[2]/h2';

    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        registerPage = new RegisterPage(page);
        registerPage.xpathUsername = "#user_login";
        registerPage.xpathPassword = "#user_pass";
        registerPage.xpathLoginButton = "#wp-submit";
        registerPage.openLoginPage(adminPageLink);
    })

    test('@AUTH_001-Login fail', async ({ page }) => {
        await test.step('Step: Login with wrong user name ', async () => {
            await registerPage.doLogin(wUserName, password);
            const errorText = await registerPage.checkLoginNotSuccess(xpathErrorLabel);
            const expectedText = `Error: The username ${wUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`;
            expect(errorText).toBe(expectedText);
        })
    })

    test('@AUTH_002-Login success', async ({ page }) => {
        await test.step('Step: Login with correct UN, PWD', async () => {
            await registerPage.doLogin(userName, password);
        })

        await test.step('Step: check to correct redirect URL', async () => {
            const isTrue = await registerPage.checkRedirectLink(registerPage.redirectLink);
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Check text Dashboard, At a Grance,Activity are displayed', async () => {
            const iStxtDashBoard = await registerPage.checkExpectedTextDisplay(xpathDashBoard, 'Dash Board');
            const iStxtGlance = await registerPage.checkExpectedTextDisplay(xpathGlance, 'At a Glance');
            const iStxtActivity = await registerPage.checkExpectedTextDisplay(xpathActivity, 'Activity');
            expect(iStxtDashBoard && iStxtGlance && iStxtActivity).toBeTruthy();
        });
    })
})