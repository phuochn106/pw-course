import { Locator, Page } from "@playwright/test";
import { MaterialBasePage } from "./01-pom";

export class PersonalNotePage extends MaterialBasePage {
    inputTitle: Locator;
    inputBody: Locator;
    btnAdd: Locator;
    inputSearch: Locator
    listNotes: Locator;
    xpathNotePage: string;

    constructor(page: Page) {
        super(page);
    }

    async gotoPage(pageName: string): Promise<void> {
        await this.page.locator(this.xpathNotePage).click();
    }

    async addNote(title: string, body: string) {
        await this.inputTitle.fill(title);
        await this.inputBody.fill(body);
        await this.btnAdd.click();
    }

    async search(keyword: string) {
        await this.inputSearch.fill(keyword);
        await this.inputSearch.click();
    }

    async getSearchResultTexts(): Promise<string[]> {
        return await this.listNotes.allInnerTexts();
    }
}
