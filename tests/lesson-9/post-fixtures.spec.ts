import { test } from "../../fixtures/mytag";
import { expect, Page, chromium } from '@playwright/test';

test.describe('POST-post', () => {
    const expectRequireText = "A name is required for this term."
    const expectDuplicateText = "A term with the name provided already exists in this taxonomy.";
    const existingTag = "lesson tag";
    const tagUserName = "Phuoc2025";
    const tagSlug = "2025";
    const cateParent = 'k11 class';
    const msgTagAdded = "Tag added.";
    const msgCateAdded = "Category added.";
    const specialTagSlug = "Đây là tag đặc biệt @1221 $2112";
    const specialCateSlug = "Đây là category đặc biệt @1221 $2112";
    const expectedTagSlug = "day-la-tag-dac-biet-1221-2112";
    const expectedCateSlug = "day-la-category-dac-biet-1221-2112";

    test('@POST_TAG_001-Tag - add tag failed', async ({ myTag }) => {
        await test.step('Step: Check validation ', async () => {
            await myTag.addNewTag('', '', '');
            const isAddFail = await myTag.checkShowExpectedMessage(expectRequireText);
            expect(isAddFail).toBeTruthy();
        })

        await test.step('Step: Input tag with existing name', async () => {
            await myTag.addNewTag(existingTag, '', '');
            const isAddFail = await myTag.checkShowExpectedMessage(expectDuplicateText);
            expect(isAddFail).toBeTruthy();
        })
    })

    test('@POST_TAG_002 - Tag - add tag success', async ({ myTag }) => {
        await test.step('Step: Input tag name and check success', async () => {
            await myTag.addNewTag(existingTag, '', '');
            const isAddFail = await myTag.checkShowExpectedMessage(expectRequireText);
            expect(isAddFail).toBeTruthy();
        })

        await test.step('Step: Fill tag name + slug', async () => {
            await myTag.addNewTag(tagUserName, tagSlug, '');
            const isAddPass = await myTag.checkShowExpectedMessage(msgTagAdded);
            expect(isAddPass).toBeTruthy();

            const addedTagRow = await myTag.checkTagNameAndSlug(tagUserName, tagSlug);
            expect(addedTagRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Delete tag', async () => {
            //del tag
            await myTag.deleteAddedTag(tagUserName, tagSlug);

            //check name and slug not display in table
            const addedTagRow = await myTag.checkTagNameAndSlug(tagUserName, tagSlug);
            expect(addedTagRow.count()).toEqual(0);
        })
    })

    test('@POST_TAG_003 - Tag - add tag with special character', async ({ myTag }) => {
        await test.step('Step: Input data tag name = $name', async () => {
            await myTag.addNewTag(`tag ${tagUserName} 30`, specialTagSlug, '');

            //check add success
            const isAddPass = await myTag.checkShowExpectedMessage(msgTagAdded);
            expect(isAddPass).toBeTruthy();
        })

        await test.step('Step: Check special slug is added and display ', async () => {
            const addedTagRow = await myTag.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedTagSlug);
            expect(addedTagRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Delete tag', async () => {
            await myTag.deleteAddedTag(`tag ${tagUserName} 30`, expectedTagSlug);

            //check nam and slug not display in table
            const addedTagRow = await myTag.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedTagSlug);
            expect(addedTagRow.count()).toEqual(0);
        })
    })

    test('@POST_CATEGORY_001-Category - create category success', async ({ myTag }) => {
        await test.step('Step: Add category success', async () => {
            //Go to 'Category' menu
            await myTag.goToPage('Posts', 'Categories');

            //Add new tag = $name
            await myTag.addNewTag(`tag ${tagUserName} 30`, specialCateSlug, cateParent)
        })

        await test.step('Step: Check message category added', async () => {
            const isAddPass = await myTag.checkShowExpectedMessage(msgCateAdded);
            expect(isAddPass).toBeTruthy();
        })

        await test.step('Step: Check slug is added and display ', async () => {
            const addedTagRow = await myTag.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedCateSlug);
            expect(addedTagRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Check message category added', async () => {
            const isAddPass = await myTag.checkShowExpectedMessage(msgCateAdded);
            expect(isAddPass).toBeTruthy();
        })

        await test.step('Step: Check new catetory is added and display ', async () => {
            const addedCateRow = await myTag.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedCateSlug);
            expect(addedCateRow.count()).toBeGreaterThan(0);
        })

        await test.step('Step: Delete category', async () => {
            await myTag.deleteAddedTag(`tag ${tagUserName} 30`, expectedCateSlug);

            //check nam and slug not display in table
            const addedTagRow = await myTag.checkTagNameAndSlug(`tag ${tagUserName} 30`, expectedCateSlug);
            expect(addedTagRow.count()).toEqual(0);
        })
    })
})