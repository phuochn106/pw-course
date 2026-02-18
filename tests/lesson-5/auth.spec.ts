import { test, expect, Page, chromium } from '@playwright/test'
import { LoginPage } from '../../pages/lesson-05/login';
import { DashboardPage } from '../../pages/lesson-05/dashboard';
test.describe('AUTH-Authentication', () => {
    let page: Page;
    let browser;
    let userName = "p103-phuoc";
    let wUserName = "p103";
    let password = "$9ICWlOVhHW2nNZUtkLPq)%e";
    const expectedText = `Error: The username ${wUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`;
    const currentExpectedUrlDev = 'https://pw-practice-dev.playwrightvn.com/wp-admin/';
    const currentExpectedUrlProd = 'https://pw-practice.playwrightvn.com/wp-admin/';
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    const env = 'dev';
    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        await loginPage.openAdminPage(env);
    })

    test('@AUTH_001-Login fail', async ({ page }) => {
        await test.step('Step: Login with wrong credentials ', async () => {
            await loginPage.doLoginToAdminPage(env, wUserName, password);

            //Kiem tra loi tra ve dung chua
            const showCorrectError = await loginPage.checkExpectedTextDisplay(expectedText);
            expect(showCorrectError).toBeTruthy;
        })
    })

    test('@AUTH_002-Login success', async ({ page }) => {
        await test.step('Step: Login with correct UN, PWD', async () => {
            dashboardPage = await loginPage.doLoginToAdminPage(env, userName, password);
        })

        await test.step('Step: check to correct redirect URL', async () => {
            const currentUrl = await loginPage.getCurrentUrl();
            if (env === 'dev') {
                expect(currentUrl).toEqual(currentExpectedUrlDev);
            } else {
                expect(currentUrl).toEqual(currentExpectedUrlProd);
            }

        })

        await test.step('Step: Check text Dashboard, At a Grance,Activity are displayed', async () => {
            const iStxtDashBoard = await dashboardPage.checkHeadingDisplay(dashboardPage.xpathDashBoard);
            const iStxtGlance = await dashboardPage.checkHeadingDisplay(dashboardPage.xpathGlance);
            const iStxtActivity = await dashboardPage.checkHeadingDisplay(dashboardPage.xpathActivity);
            expect(iStxtDashBoard && iStxtGlance && iStxtActivity).toBeTruthy();
        });
    })
})