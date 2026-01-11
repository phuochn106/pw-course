import { Page } from "@playwright/test";
import { RegisterPage } from "../../pages/lesson-06/register";
import { ProductPage } from "../../pages/lesson-06/product";
import { TodoPage } from "../../pages/lesson-06/todo";
import { PersonalNotePage } from "../../pages/lesson-06/personal-note";

export class PomManager {
    page: Page;
    //homePage: HomePage;
    registerPage: RegisterPage;
    productPage: ProductPage;
    toDoPage: TodoPage;
    personalNotePage: PersonalNotePage;

    constructor(page: Page) {
        this.page = page;
    }

    getRegisterPage() {
        return new RegisterPage(this.page);
    }

    getProductPage() {
        return new ProductPage(this.page);
    }

    getToDoPage() {
        return new TodoPage(this.page);
    }

    getPersonalNotePage() {
        return new PersonalNotePage(this.page);
    }
} 