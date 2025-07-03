import { test, expect, Page } from '@playwright/test';

test.describe('AUTH-Authentication', () => {
    async function login(page: Page, userName: string, pass: string) {
        await page.locator("#user_login").fill(userName);
        await page.locator("#user_pass").fill(pass);
    }

    test('@AUTH_001-Login fail', async ({ page }) => {
        let inputtedUserName = "";

        await test.step('Step: Go to login page', async () => {
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
        })

        await test.step('Step: Input invalid credentials and login', async () => {
            login(page, "phuoc", "phuoc");
            inputtedUserName = await page.inputValue("#user_login");
        })

        await test.step('Step: Click button Login', async () => {
            await page.locator("#wp-submit").click();
        })

        await test.step('Step: Verify error message', async () => {
            let displayText = (await page.locator("#login_error>p").allInnerTexts())[0];
            let expectedText = `Error: The username ${inputtedUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`;
            expect(displayText).toBe(expectedText);
        })
    })

    test('@AUTH_002-Login success', async ({ page }) => {
        await test.step('Step: Go to login page', async () => {
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
        })

        await test.step('Step: Input valid credentials and login', async () => {
            login(page, "p103-phuoc", "$9ICWlOVhHW2nNZUtkLPq)%e");
        })

        await test.step('Step: Click button Login', async () => {
            await page.locator("#wp-submit").click();
        })

        await test.step('Step: check redirect URL', async () => {
            await expect(page).toHaveURL('https://pw-practice-dev.playwrightvn.com/wp-admin/', { timeout: 5000 });
        })

        await test.step('Step: Check element H1 is displayed', async () => {
            const innerTextH1 = await page.locator('.wrap>h1').innerText();
            const expectedH1Text = "Dashboard";
            expect(innerTextH1).toBe(expectedH1Text);
        })

        await test.step('Step: Check elements H2 is displayed and their text ', async () => {
            const h2Locators = page.locator('.postbox-header>h2');
            const textFirst = await h2Locators.nth(0).innerText();
            const textSecond = await h2Locators.nth(1).innerText();
            expect(textFirst).toBe('At a Glance');
            expect(textSecond).toBe('Activity');
        })
    })
})