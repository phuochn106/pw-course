import { expect, test } from '@playwright/test';
import { ProductPage } from '../../pages/lesson-06/product';
import { PomManager } from '../students-submission/phuoc/lesson-08:/pages/POM-manager';

test('Add product - Check qty and Total price', async ({ page }) => {
    const pomManager = new PomManager(page);
    const productPage = pomManager.getProductPage();

    await test.step('Step: Open material page and goto product page', async () => {
        await productPage.openMaterialPage();
        await productPage.gotoPage('Product page');
    })

    await test.step('Step: Add product to cart', async () => {
        await productPage.addProductToCart(1, 2);
        await productPage.addProductToCart(2, 3);
        await productPage.addProductToCart(3, 1);
    })

    await test.step('Step: Check product qty', async () => {
        const qty1IsCorrected = await productPage.checkProductQuantity(1, 2);
        const qty2IsCorrected = await productPage.checkProductQuantity(2, 3);
        const qty3IsCorrected = await productPage.checkProductQuantity(3, 1);
        expect(qty1IsCorrected && qty2IsCorrected && qty3IsCorrected).toBeTruthy();
    })

    await test.step('Step: Check Total', async () => {
        const isTotalCorrect = await productPage.checkToTalPrice(3);
        expect(isTotalCorrect).toBeTruthy();
    })
})