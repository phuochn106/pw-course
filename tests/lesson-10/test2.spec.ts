import { test, expect, Locator } from '@playwright/test';

test('Puzzle drag and drop game', async ({ page }) => {
    const pisLocator = '//div[@class="puzzle-container"]/div';
    const pisTargetLocator = '//div[@class="dropzones-container"]/div';
    await page.goto('https://material.playwrightvn.com/');
    await page.getByText('Bài học 5: Puzzle drag and drop game').click();


    for (let i = 0; i < 4; i++) {
        await page.locator(pisLocator).nth(0).dragTo(page.locator(pisTargetLocator).nth(i));
    }

    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Congratulations! You completed the puzzle.');
        await dialog.accept();
    });
});