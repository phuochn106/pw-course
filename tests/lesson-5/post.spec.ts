import { test, expect, Page, chromium } from '@playwright/test';
import { PostPage, UtilPage } from '../../pages/lesson-5-pom';

let page: Page;
let browser;
test.describe('POST-post', () => {
    let page: Page;
    let browser;
    const userName = "p103-phuoc";
    const wUserName = "p103";
    const password = "$9ICWlOVhHW2nNZUtkLPq)%e";
    let postPage: PostPage;
    const expectedErrorText1 = "A name is required for this term."
    const expectedErrorText2 = "A term with the name provided already exists in this taxonomy.";
    const existingTag = "lesson tag";
    const tagUserName = "Phuoc";
    const msgAdded = "Tag added.";
    const specialSlug = "Đây là tag đặc biệt @1221 $2112";
    const expectedSlug = "day-la-category-dac-biet-1221-2112";


    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        postPage = new PostPage(page);
        postPage.xpathUsername = "#user_login";
        postPage.xpathPassword = "#user_pass";
        postPage.xpathLoginButton = "#wp-submit";
        postPage.xpathAddTag = "#wp-submit";
        postPage.xpathErrorMessage = '//div[@role="alert"]/p';
        postPage.xpathTagName = "#tag-name";
        postPage.xpathSlug = "#tag-slug";
        postPage.xpathRowTitle = "a.row-title";
        postPage.xpathCheckColumn = 'th.check-column input[type="checkbox"]';
        postPage.xpathBulkAction = '//select[@id ="bulk-action-selector-top"]';
        postPage.xpathBtnDelete = '//select[@id ="bulk-action-selector-top"]';
        postPage.xpathDoAction = '#doaction';
        postPage.xpathSlugCol = 'td[data-colname="Slug"]';
    })

    test.afterEach(async () => {
        await browser.close();
    });

    test('@POST_TAG_001-Tag - add tag failed', async () => {
        await test.step('Step: Check validation when click add tag w/o input data', async () => {
            await postPage.addTag("", "", "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(postPage.xpathErrorMessage, expectedErrorText1);
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Input tag with existing name', async () => {
            await postPage.addTag(existingTag, "", "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(postPage.xpathErrorMessage, expectedErrorText2);
            expect(isTrue).toBeTruthy();
        })
    })

    test('@POST_TAG_002 - Tag - add tag success', async () => {
        await test.step('Step: Input tag name and check success', async () => {
            await postPage.addTag(`tag ${tagUserName}`, "", "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(postPage.xpathErrorMessage, msgAdded)
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Fill tag name + slug', async () => {
            await test.step('Step: Input tag name and check success', async () => {
                await postPage.addTag(`tag ${tagUserName} 02`, `slug ${tagUserName} 02`, "Posts", "Tags");
                const isTrue = postPage.checkExpectedTextDisplay(postPage.xpathErrorMessage, msgAdded)
                expect(isTrue).toBeTruthy();
            })
        })

        await test.step('Step: Delete tag', async () => {
            await postPage.deleteTag(tagUserName);
            const rowVisible = await postPage.checkTagNameAndSlug(`tag ${tagUserName} 02`);
            expect(!rowVisible).toBeTruthy();
        })
    })

    test('@POST_TAG_003 - Tag - add tag with special character', async () => {
        await test.step('Step: Input data tag name = $name', async () => {
            postPage.addTag(`tag ${tagUserName} 03`, "", "Posts", "Tags");
            //check add success
            const isTrue = postPage.checkExpectedTextDisplay(postPage.xpathErrorMessage, msgAdded)
            expect(isTrue).toBeFalsy();
        })

        await test.step('Step: Fill tag name + slug', async () => {
            postPage.addTag(`tag ${tagUserName} 03`, specialSlug, "Posts", "Tags");
            //Check add success
            const isTrue = postPage.checkExpectedTextDisplay(postPage.xpathErrorMessage, msgAdded)
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Check special slug is added and display ', async () => {
            const row = postPage.checkTagNameAndSlug(expectedSlug);
            expect(row).toBeTruthy();
        })

        await test.step('Step: Delete tag', async () => {
            await postPage.deleteTag(`tag ${tagUserName} 03`);
            const rowVisible = await postPage.checkTagNameAndSlug(expectedSlug)
            expect(!rowVisible).toBeTruthy();
        })
    })

    test('@POST_CATEGORY_001-Category - create category success', async () => {
        await test.step('Step: Add category success', async () => {
            //Go to 'Category' menu
            await page.locator("//div[contains(text(), 'Posts')]").click();
            await page.locator("//a[contains(text(), 'Categories')]").click();

            //Add new tag = $name
            await page.locator("#tag-name").fill("category Phuoc 03");
            await page.locator("#tag-slug").fill("Đây là category đặc biệt @1221 $2112");
            await page.locator("#submit").click();
        })

        await test.step('Step: Check message category added', async () => {
            const expectedText = "Category added.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText);
        })

        await test.step('Step: Check slug is added and display ', async () => {
            await page.locator("#tag-name").fill("category Phuoc 04");
            await page.locator(".postform").selectOption('k11 class');
            await page.locator("#submit").click();
        })

        await test.step('Step: Check message category added', async () => {
            const expectedText = "Category added.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText);
        })

        await test.step('Step: Check new catetory is added and display ', async () => {
            const row = page.locator('tr', {
                has: page.locator('a.row-title', { hasText: 'category Phuoc 04' })
            });
        })

        await test.step('Step: Delete category', async () => {
            const row = page.locator('tr', {
                has: page.locator('a.row-title', { hasText: 'category Phuoc 04' })
            });
            await row.locator('th.check-column input[type="checkbox"]').check();
            await page.locator('//select[@id ="bulk-action-selector-top"]').click();
            await page.locator('//select[@id ="bulk-action-selector-top"]').selectOption('delete');
            await page.locator('#doaction').click();
        })
    })
})