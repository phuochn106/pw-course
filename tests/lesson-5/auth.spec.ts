import { test, expect, Page, chromium } from '@playwright/test';
import { UtilPage } from '../../pages/lesson-5-pom';

test.describe('AUTH-Authentication', () => {
    let page: Page;
    let browser;
    let inputtedUserName = "";
    let userName = "p103-phuoc";
    let wUserName = "p103";
    let password = "$9ICWlOVhHW2nNZUtkLPq)%e";
    let utilPage: UtilPage;

    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        utilPage = new UtilPage(page);
        utilPage.xpathUsername = "#user_login";
        utilPage.xpathPassword = "#user_pass";
        utilPage.xpathLoginButton = "#wp-submit";
        utilPage.xpathErrorLabel = "#login_error>p";
        utilPage.redirectLink = "https://pw-practice-dev.playwrightvn.com/wp-admin/";


        utilPage.openLoginPage();
    })

    test('@AUTH_001-Login fail', async ({ page }) => {
        await test.step('Step: Login with wrong user name ', async () => {
            await utilPage.doLogin(wUserName, password);
        })

        await test.step('Step: Verify error message', async () => {
            const isFailed = await utilPage.checkLoginNotSuccess(wUserName);
            expect(isFailed).toBeTruthy();
        })
    })

    test('@AUTH_002-Login success', async ({ page }) => {
        await test.step('Step: Login with correct UN, PWD', async () => {
            await utilPage.doLogin(userName, password);
        })

        await test.step('Step: check to correct redirect URL', async () => {
            const isTrue = await utilPage.isCorrectRedirected(utilPage.redirectLink);
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Check text Dashboard, At a Grance,Activity are displayed', async () => {
            utilPage.xpathDashBoard = '.wrap>h1';
            utilPage.xpathGlance = '(//div[@class="postbox-header"])[1]/h2';
            utilPage.xpathActivity = '(//div[@class="postbox-header"])[2]/h2';
            const iStxtDashBoard = await utilPage.checkExpectedTextDisplay(utilPage.xpathDashBoard, 'Dash Board');
            const iStxtGlance = await utilPage.checkExpectedTextDisplay(utilPage.xpathGlance, 'At a Glance');
            const iStxtActivity = await utilPage.checkExpectedTextDisplay(utilPage.xpathActivity, 'Activity');
            expect(iStxtDashBoard && iStxtGlance && iStxtActivity).toBeTruthy();
        });
    })
})