import { test, expect, Page, chromium } from '@playwright/test';
import { PostPage } from '../tests/students-submission/phuoc/lesson-08:/post-page';
import { RegisterPage } from '../../pages/register-page';
import { Category } from '../tests/students-submission/phuoc/lesson-08:/category-page';

let page: Page;
let browser;
test.describe('POST-post', () => {
    let page: Page;
    let browser;
    let postPage: PostPage;
    const expectedErrorText1 = "A name is required for this term."
    const expectedErrorText2 = "A term with the name provided already exists in this taxonomy.";
    const existingTag = "lesson tag";
    const tagUserName = "Phuoc";
    const msgAdded = "Tag added.";
    const specialSlug = "Đây là tag đặc biệt @1221 $2112";
    const expectedSlug = "day-la-category-dac-biet-1221-2112";
    const xpathErrorMessage = '//div[@role="alert"]/p';
    const xpathAddTag = "#wp-submit";
    const xpathPostForm = '.postform';
    const xpathTagName = "#tag-name";
    const xpathSlug = "#tag-slug";
    const xpathRowTitle = "a.row-title";
    const xpathCheckColumn = 'th.check-column input[type="checkbox"]';
    const xpathBulkAction = '//select[@id ="bulk-action-selector-top"]';
    const xpathDoAction = '#doaction';
    const xpathCatePage = "//a[contains(text(), 'Categories')]";

    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        postPage = new PostPage(page);
    })

    test.afterEach(async () => {
        await browser.close();
    });

    test('@POST_TAG_001-Tag - add tag failed', async () => {
        await test.step('Step: Check validation ', async () => {
            await postPage.addTag("", "", "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(xpathErrorMessage, expectedErrorText1);
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Input tag with existing name', async () => {
            await postPage.addTag(existingTag, "", "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(xpathErrorMessage, expectedErrorText2);
            expect(isTrue).toBeTruthy();
        })
    })

    test('@POST_TAG_002 - Tag - add tag success', async () => {
        await test.step('Step: Input tag name and check success', async () => {
            await postPage.addTag(`tag ${tagUserName}`, "", "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(xpathErrorMessage, msgAdded)
            expect(isTrue).toBeTruthy();
        })

        await test.step('Step: Fill tag name + slug', async () => {
            await test.step('Step: Input tag name and check success', async () => {
                await postPage.addTag(`tag ${tagUserName} 02`, `slug ${tagUserName} 02`, "Posts", "Tags");
                const isTrue = postPage.checkExpectedTextDisplay(xpathErrorMessage, msgAdded)
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
            const isTrue = postPage.checkExpectedTextDisplay(xpathErrorMessage, msgAdded)
            expect(isTrue).toBeFalsy();
        })

        await test.step('Step: Fill tag name + slug', async () => {
            postPage.addTag(`tag ${tagUserName} 03`, specialSlug, "Posts", "Tags");
            const isTrue = postPage.checkExpectedTextDisplay(xpathErrorMessage, msgAdded)
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
        const category = new Category(page);
        await test.step('Step: Add category success', async () => {

            //Go to 'Category' menu
            await category.gotoPage('Posts');

            await page.locator(xpathCatePage).click();

            //Add new tag = $name
            await page.locator(xpathTagName).fill("category Phuoc 03");
            await page.locator(xpathSlug).fill("Đây là category đặc biệt @1221 $2112");
            await page.locator(xpathAddTag).click();
        })

        await test.step('Step: Check message category added', async () => {
            const expectedText = "Category added.";
            const locatorP = page.locator(xpathErrorMessage);
            await expect(locatorP).toHaveText(expectedText);
        })

        await test.step('Step: Check slug is added and display ', async () => {
            await page.locator(xpathTagName).fill("category Phuoc 04");
            await page.locator(xpathPostForm).selectOption('k11 class');
            await page.locator(xpathAddTag).click();
        })

        await test.step('Step: Check message category added', async () => {
            const expectedText = "Category added.";
            const locatorP = page.locator(xpathErrorMessage);
            await expect(locatorP).toHaveText(expectedText);
        })

        await test.step('Step: Check new catetory is added and display ', async () => {
            const row = page.locator('tr', {
                has: page.locator(xpathRowTitle, { hasText: 'category Phuoc 04' })
            });
        })

        await test.step('Step: Delete category', async () => {
            const row = page.locator('tr', {
                has: page.locator(xpathRowTitle, { hasText: 'category Phuoc 04' })
            });
            await row.locator(xpathCheckColumn).check();
            await page.locator(xpathBulkAction).click();
            await page.locator(xpathBulkAction).selectOption('delete');
            await page.locator(xpathDoAction).click();
        })
    })
})