import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/lesson-05/login";
import { DashboardPage } from "../../pages/lesson-05/dashboard";
import { PostPage } from "../../pages/lesson-05/post";

test('lesson 10 - bai 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let dashboardPage: DashboardPage;
    let postPage: PostPage;
    let userName = "p103-phuoc";
    let password = "$9ICWlOVhHW2nNZUtkLPq)%e";

    await test.step("Login practice page", async ({ }) => {
        dashboardPage = await loginPage.doLoginToAdminPage('dev', userName, password);
    })

    await test.step("So sanh anh chup", async ({ }) => {
        await expect(page).toHaveScreenshot("home.png");
        await expect(page).toHaveScreenshot('dashboard-masked.png', {
            mask: [
                page.locator('//div[@class="postbox-header"]/h2[text()="Activity"]'),
                page.locator('//div[@class="postbox-header"]/h2[text()="At a Glance"]'),
            ],
            maskColor: '#7134eb',
        });

    })

    await test.step("Di toi trang tag va chup anh", async ({ }) => {
        postPage = await dashboardPage.navigateToPost();

        const tableLocator = page.locator("//caption[@class='screen-reader-text']/parent::table");
        await expect(tableLocator).toBeVisible();

        // chup scr va mask
        await expect(page).toHaveScreenshot('tag-page-masked.png', {
            fullPage: true,
            mask: [tableLocator],
            maskColor: '#7134eb',
        });
    })
})