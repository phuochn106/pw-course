import { test, expect, Page, chromium } from '@playwright/test';

let page: Page;
let browser;
test.describe('POST-post', () => {
    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator("#user_login").fill("p103-phuoc");
        await page.locator("#user_pass").fill("$9ICWlOVhHW2nNZUtkLPq)%e");
        await page.locator("#wp-submit").click();
    })

    test.afterEach(async () => {
        await browser.close();
    });

    test('@POST_TAG_001-Tag - add tag failed', async () => {
        await test.step('Step: Check validation when click add tag w/o input data', async () => {
            await page.locator("//div[contains(text(), 'Posts')]").click();
            await page.locator("//a[contains(text(), 'Tags')]").click();
            await page.locator("#submit").click();

            //Check error message
            const expectedText = "A name is required for this term.";
            const atualText = await page.locator('//div[@role="alert"]/p').innerText();
            expect(atualText).toBe(expectedText);
        })

        await test.step('Step: Input tag name and add tag', async () => {
            await page.locator("#tag-name").fill("lesson tag");
            await page.locator("#submit").click();

            //Check error message
            const expectedText1 = "A term with the name provided already exists in this taxonomy.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText1)
        })
    })

    test('@POST_TAG_002 - Tag - add tag success', async () => {
        await test.step('Step: Input data tag name = $name', async () => {
            //Go to 'Tags' menu
            await page.locator("//div[contains(text(), 'Posts')]").click();
            await page.locator("//a[contains(text(), 'Tags')]").click();

            //Add new tag = $name
            await page.locator("#tag-name").fill("tag Phuoc");
            await page.locator("#submit").click();
        })

        await test.step('Step: Check message tag added', async () => {
            const expectedText2 = "Tag added.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText2);
        })

        await test.step('Step: Fill tag name + slug', async () => {
            //Add new tag = tag-$name-02, slug: tag-${name}-02"
            await page.locator("#tag-name").fill("tag Phuoc 02");
            await page.locator("#tag-slug").fill("tag-Phuoc-02");
            await page.locator("#submit").click();
        })

        await test.step('Step: Check message tag/slug added', async () => {
            const expectedText3 = "Tag added.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText3);
        })

        await test.step('Step: Delete tag', async () => {
            const row = page.locator('tr', {
                has: page.locator('a.row-title', { hasText: 'tag Phuoc 02' })
            });
            await row.locator('th.check-column input[type="checkbox"]').check();
            await page.locator('//select[@id ="bulk-action-selector-top"]').click();
            await page.locator('//select[@id ="bulk-action-selector-top"]').selectOption('delete');
            await page.locator('#doaction').click();
        })
    })

    test('@POST_TAG_003 - Tag - add tag with special character', async () => {
        await test.step('Step: Input data tag name = $name', async () => {
            //Go to 'Tags' menu
            await page.locator("//div[contains(text(), 'Posts')]").click();
            await page.locator("//a[contains(text(), 'Tags')]").click();

            //Add new tag = $name
            await page.locator("#tag-name").fill("tag Phuoc 03");
            await page.locator("#submit").click();
        })

        await test.step('Step: Check message tag added', async () => {
            const expectedText2 = "Tag added.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText2);
        })

        await test.step('Step: Fill tag name + slug', async () => {
            //Add new tag = tag-$name-02, slug: tag-${name}-03"
            await page.locator("#tag-name").fill("tag Phuoc 03");
            await page.locator("#tag-slug").fill("Đây là tag đặc biệt @1221 $2112");
            await page.locator("#submit").click();
        })

        await test.step('Step: Check message added', async () => {
            const expectedText3 = "Tag added.";
            const locatorP = page.locator('//div[@role="alert"]/p');
            await expect(locatorP).toHaveText(expectedText3);
        })

        await test.step('Step: Check slug is added and display ', async () => {
            const expectedText3 = "day-la-tag-dac-biet-1221-2112";
            const row = page.locator('tr', {
                has: page.locator('td[data-colname="Slug"]', { hasText: 'day-la-tag-dac-biet-1221-2112' })
            });
        })

        await test.step('Step: Delete tag', async () => {
            const row = page.locator('tr', {
                has: page.locator('a.row-title', { hasText: 'tag Phuoc 03' })
            });
            await row.locator('th.check-column input[type="checkbox"]').check();
            await page.locator('//select[@id ="bulk-action-selector-top"]').click();
            await page.locator('//select[@id ="bulk-action-selector-top"]').selectOption('delete');
            await page.locator('#doaction').click();
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
            const row = page.locator('tr', {
                has: page.locator('td[data-colname="Slug"]', { hasText: 'day-la-category-dac-biet-1221-2112' })
            });
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