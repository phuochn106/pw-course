import { Page } from "@playwright/test";
import { MaterialBasePage } from "./material";

export class PersonalNotePage extends MaterialBasePage {
    xpathNotePage: string = "//a[contains(text(),'Personal notes')]";
    inputTitle: string = '//input[@id="note-title"]';
    inputBody: string = '//textarea[@id="note-content"]';
    btnAdd: string = '//button[@id="add-note"]';
    inputSearch: string = '//input[@id="search"])';
    listNotes: string = '//ul[@id="notes-list"]';

    constructor(page: Page) {
        super(page)
    }

    async gotoPage(pageName: string): Promise<void> {
        await this.page.locator(this.xpathNotePage).click();
    }

    async addNote(title: string, body: string): Promise<void> {
        await this.page.locator(this.inputTitle).fill(title);
        await this.page.locator(this.inputBody).fill(body);
        await this.page.locator(this.btnAdd).click();
    }

    async search(keyword: string): Promise<void> {
        await this.page.locator(this.inputSearch).fill(keyword);
    }

    async getSearchResultTexts(): Promise<string[]> {
        return await this.page.locator(this.listNotes).allInnerTexts();
    }

}