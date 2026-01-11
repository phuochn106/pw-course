import { Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./material";

export class ProductPage extends MaterialBasePage {
    xpathButtonAddProduct: string = '//button[@data-product-id='
    xpathTotalPrice = '(//td[@class="total"]/following-sibling::td)[1]';

    constructor(page: Page) {
        super(page);
    }

    async genXpathProductRow(productIndex: number, productQty: number): Promise<string> {
        const xpathProductRow = `//td[contains(text(),"Product ${productIndex}")]/following-sibling::td)[${productQty}]`;
        return xpathProductRow;
    }

    async addProductToCart(index: number, productQty: number): Promise<void> {
        await this.page.locator(`${this.xpathButtonAddProduct}"${index}"]`).click({ clickCount: productQty });
    }

    async checkProductQuantity(productIndex: number, productQty: number): Promise<boolean> {
        const isRightAdded = this.page.locator(await this.genXpathProductRow(productIndex, productQty)).isVisible();
        return isRightAdded;
    }

    async checkToTalPrice(totalItem: number) {
        let sum = 0;
        for (let i = 1; i <= totalItem; i++) {
            let itemPriceText = await this.page.locator(await this.genXpathProductRow(i, 3)).innerText();
            let itemPrice = parseFloat(itemPriceText.replace(/[^0-9.]/g, ''));
            sum += itemPrice;
        }
        let lblTotal = await this.page.locator(this.xpathTotalPrice).innerText();
        let priceInTotal = parseFloat(lblTotal.replace(/[^0-9.]/g, ''));
        return sum === priceInTotal;
    }
}