import { Page } from "@playwright/test";
import { MaterialBasePage } from "./01-pom";

export class ProductPage extends MaterialBasePage {
    constructor(page: Page) {
        super(page);
    }

    async addProductToCart(index: number, productQty: number): Promise<void> {
        await this.page.locator(`//button[@data-product-id="${index}"]`).click({ clickCount: productQty });
    }

    async checkProductQuantity(index: number, productQty: number) {
        const isRightAdded = await this.page.locator(`(//td[contains(text(),"Product ${index}")]/following-sibling::td)[${productQty}]`).isVisible();
        return isRightAdded;
    }

    async checkToTalPrice(totalItem: number) {
        let sum = 0;
        for (let i = 1; i <= totalItem; i++) {
            let itemPriceText = await this.page.locator(`(//td[contains(text(),"Product ${i}")]/following-sibling::td)[3]`).innerText();
            let itemPrice = parseFloat(itemPriceText.replace(/[^0-9.]/g, ''));
            sum += itemPrice;
        }
        let lblTotal = await this.page.locator(`(//td[@class="total"]/following-sibling::td)[1]`).innerText();
        let priceInTotal = parseFloat(lblTotal.replace(/[^0-9.]/g, ''));
        return sum === priceInTotal;
    }
}