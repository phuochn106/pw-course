import { expect, Page } from "@playwright/test";
import { RegisterPage } from "./lesson-08:/register-page";
import { ProductPage } from "./lesson-08:/product-page";
import { TodoPage } from "./lesson-08:/todo-page";
import { PersonalNotePage } from "./lesson-08:/personal-note";

export class POMmanager {
    page: Page;
    constructor(page: Page) {
        this.page = page
    };

    getRegisterPage() {
        return new RegisterPage(this.page);
    }

    getProductPage() {
        return new ProductPage(this.page);
    }

    getTodoPage() {
        return new TodoPage(this.page);
    }

    getPersonalNote() {
        return new PersonalNotePage(this.page);
    }
}