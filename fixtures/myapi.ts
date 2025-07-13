import { APIRequestContext } from "@playwright/test";
import { test as base } from '@playwright/test';
import { UtilPage } from "../pages/lesson-07-api/util";
import { Article } from "../pages/lesson-07-api/article";

const test = base.extend<{ myApi: string }>({
    myApi: async ({ request }, use) => {
        const articles = [{
            "title": "a1",
            "description": "a1",
            "body": "a1",
            "tagList": ["a1"]
        }, {
            "title": "a2",
            "description": "a2",
            "body": "a2",
            "tagList": ["a2"]
        }]

        const utilPage = new UtilPage(request);
        const articlePage = new Article(request);

        const loginResponse = await utilPage.login('test07072025@yopmail.com', 'test07072025');
        const responseBody = await loginResponse.json();
        const token = "Token " + await responseBody.user.token;

        //Add 2 article
        const responseAddFirst = await articlePage.addArticleWithOtherInfo(token, articles[0]);
        const responseBodyFirst = await responseAddFirst.json()
        const responseAddSecond = await articlePage.addArticleWithOtherInfo(token, articles[1]);
        const responseBodySecond = await responseAddSecond.json()

        //use token
        await use(token);

        // Cleanup 
        await articlePage.deleteArticle(token, responseBodyFirst.article.slug);
        await articlePage.deleteArticle(token, responseBodySecond.article.slug);
    }
});

export { test };