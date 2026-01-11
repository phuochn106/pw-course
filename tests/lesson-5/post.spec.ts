import { test, expect, Page, chromium } from '@playwright/test';
import { PostPage } from '../../pages/lesson-05/post';
import { LoginPage } from '../../pages/lesson-05/login';
import { DashboardPage } from '../../pages/lesson-05/dashboard';


let page: Page;
let browser;
test.describe('POST-post', () => {
    let page: Page;
    let browser;
    const userName = "p103-phuoc";
    const password = "$9ICWlOVhHW2nNZUtkLPq)%e";
    const expectRequireText = "A name is required for this term."
    const expectDuplicateText = "A term with the name provided already exists in this taxonomy.";
    const existingTag = "lesson tag";
    const tagUserName = "Phuoc2025";
    const tagSlug = "2025";
    const msgTagAdded = "Tag added.";
    const msgCateAdded = "Category added.";
    const specialTagSlug = "Đây là tag đặc biệt @1221 $2112";
    const specialCateSlug = "Đây là category đặc biệt @1221 $2112";
    const expectedTagSlug = "day-la-tag-dac-biet-1221-2112";
    const expectedCateSlug = "day-la-category-dac-biet-1221-2112";
    let postPage: PostPage;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;


    test.beforeEach(async ({ }) => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = await loginPage.doLoginToAdminPage(userName, password);
        postPage = await dashboardPage.navigateToPost();
    })

    test.afterEach(async () => {
        await browser.close();
    });

    test('@POST_TAG_001-Tag - add tag failed', async () => {
        await test.step('Step: Check validation ', async () => {
            //go to post > tags
            await postPage.goToPage('Tags');
            await postPage.addNewTag('', '', '');
            const isAddFail = await postPage.checkShowExpectedMessage(expectRequireText);
            expect(isAddFail).toBeTruthy();
        })

        await test.step('Step: Input tag with existing name', async () => {
            await postPage.addNewTag(existingTag, '', '');
            const isAddFail = await postPage.checkShowExpectedMessage(expectDuplicateText);
            expect(isAddFail).toBeTruthy();
        })
    })

    test('@POST_TAG_002 - Tag - add tag success', async () => {
        await test.step('Step: Input tag name and check success', async () => {
            //go to post > tags
            await postPage.goToPage('Tags');
            await postPage.addNewTag(existingTag, '', '');
            const isAddFail = await postPage.checkShowExpectedMessage(expectRequireText);
            expect(isAddFail).toBeTruthy();
        })

        await test.step('Step: Fill tag name + slug', async () => {
            //add tag
            await postPage.addNewTag(tagUserName, tagSlug, '');
            const isAddPass = await postPage.checkShowExpectedMessage(msgTagAdded);

            //check add success
            expect(isAddPass).toBeTruthy();

            //check nam and slug display in table
            const addedTagRow = await postPage.checkTagNameAndSlug(tagUserName, tagSlug);
            expect(addedTagRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Delete tag', async () => {
            //del tag
            await postPage.deleteAddedTag(tagUserName, tagSlug);

            //check name and slug not display in table
            const addedTagRow = await postPage.checkTagNameAndSlug(tagUserName, tagSlug);
            expect(addedTagRow.count()).toEqual(0);
        })
    })

    test('@POST_TAG_003 - Tag - add tag with special character', async () => {
        await test.step('Step: Input data tag name = $name', async () => {
            //go to post > tags
            await postPage.goToPage('Tags');
            await postPage.addNewTag(`tag ${tagUserName} 30`, specialTagSlug, '');

            //check add success
            const isAddPass = await postPage.checkShowExpectedMessage(msgTagAdded);
            expect(isAddPass).toBeTruthy();
        })

        await test.step('Step: Check special slug is added and display ', async () => {
            const addedTagRow = await postPage.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedTagSlug);
            expect(addedTagRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Delete tag', async () => {
            await postPage.deleteAddedTag(`tag ${tagUserName} 30`, expectedTagSlug);

            //check nam and slug not display in table
            const addedTagRow = await postPage.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedTagSlug);
            expect(addedTagRow.count()).toEqual(0);
        })
    })

    test('@POST_CATEGORY_001-Category - create category success', async () => {
        await test.step('Step: Add category success', async () => {
            //Go to 'Category' menu
            await postPage.goToPage('Categories');

            //Add new tag = $name
            await postPage.addNewTag(`tag ${tagUserName} 30`, specialCateSlug, '')

        })

        await test.step('Step: Check message category added', async () => {
            const isAddPass = await postPage.checkShowExpectedMessage(msgCateAdded);
            expect(isAddPass).toBeTruthy();
        })

        await test.step('Step: Check slug is added and display ', async () => {
            const addedTagRow = await postPage.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedCateSlug);
            expect(addedTagRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Check message category added', async () => {
            const isAddPass = await postPage.checkShowExpectedMessage(msgCateAdded);
            expect(isAddPass).toBeTruthy();
        })

        await test.step('Step: Check new catetory is added and display ', async () => {
            const addedCateRow = await postPage.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedCateSlug);
            expect(addedCateRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Delete category', async () => {
            await postPage.deleteAddedTag(`tag ${tagUserName} 30`, expectedCateSlug);

            //check nam and slug not display in table
            const addedTagRow = await postPage.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedCateSlug);
            expect(addedTagRow.count()).toEqual(0);
        })
    })
})