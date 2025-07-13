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
    const currentExpectedUrl = 'https://pw-practice-dev.playwrightvn.com/wp-admin/';
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        loginPage.openAdminPage();
    })

    test('@AUTH_001-Login fail', async ({ page }) => {
        await test.step('Step: Login with wrong credentials ', async () => {
            await loginPage.doLoginToAdminPage(wUserName, password);

            //Kiem tra loi tra ve dung chua
            const showCorrectError = await loginPage.checkExpectedTextDisplay(expectedText);
            expect(showCorrectError).toBeTruthy;
        })
    })

    test('@AUTH_002-Login success', async ({ page }) => {
        await test.step('Step: Login with correct UN, PWD', async () => {
            dashboardPage = await loginPage.doLoginToAdminPage(userName, password);
        })

        await test.step('Step: check to correct redirect URL', async () => {
            const currentUrl = await loginPage.getCurrentUrl();
            expect(currentUrl).toEqual(currentExpectedUrl);
        })

        await test.step('Step: Check text Dashboard, At a Grance,Activity are displayed', async () => {
            const iStxtDashBoard = await dashboardPage.checkHeadingDisplay(dashboardPage.xpathDashBoard);
            const iStxtGlance = await dashboardPage.checkHeadingDisplay(dashboardPage.xpathGlance);
            const iStxtActivity = await dashboardPage.checkHeadingDisplay(dashboardPage.xpathActivity);
            expect(iStxtDashBoard && iStxtGlance && iStxtActivity).toBeTruthy();
        });
    })
})