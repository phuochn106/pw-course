import { APIResponse, expect } from '@playwright/test';
import { UtilPage } from '../../pages/lesson-07-api/util';
import { Article } from '../../pages/lesson-07-api/article';
import { Comments } from '../../pages/lesson-07-api/comment';
import { test } from "../../fixtures/myapi";

test.describe('API testing', async () => {
    let utilPage: UtilPage;
    let responseData: APIResponse;
    let token = "";
    let articleSlug = "";
    let listCommentId: number[] = [];
    let responseBody: any;

    const accountInfo = {
        "email": "test08072025@yopmail.com",
        "userName": "test08072025",
        "password": "test08072025"
    };

    test('Test1: Register Account', async ({ request }) => {
        utilPage = new UtilPage(request);
        await test.step('Register', async () => {
            const responseData = await utilPage.registerAccount(accountInfo.email, accountInfo.userName, accountInfo.password);
            expect(responseData.status()).toEqual(201);
        })
    });

    test('Test2: Login and create article', async ({ request, myApi }) => {
        await test.step('Add new article', async () => {
            const artile = new Article(request);
            const responseData = await artile.addNewArticle(myApi);
            responseBody = await responseData.json();
            articleSlug = responseBody.article.slug;
            expect(responseData.status()).toEqual(201);
        });
    });

    test('Test 3: Add 5 comments', async ({ request, myApi }) => {
        const comment = new Comments(request);
        let isCreateSuccess = true;

        await test.step('Add 5 comments', async () => {
            for (let i = 1; i <= 5; i++) {
                const responseData = await comment.addComment(myApi, articleSlug, i);
                responseBody = await responseData.json()
                if (i === 2 || i === 5) {
                    listCommentId.push(responseBody.comment.id);
                }
                if (responseData.status() !== 200) {
                    isCreateSuccess = false;
                    break;
                }
            }
            expect(isCreateSuccess).toBeTruthy();
        });
    });

    test('Test 4: Delete comment 2 & 5', async ({ request, myApi }) => {
        const comment = new Comments(request);
        await test.step('Delete comment', async () => {
            const resDelItem2 = await comment.deleteComment(myApi, articleSlug, listCommentId[0]);
            const resDelItem5 = await comment.deleteComment(myApi, articleSlug, listCommentId[1]);
            expect(resDelItem2.status() && resDelItem5.status()).toEqual(200);
        });
    });

    test('Test 5: Delete article', async ({ request, myApi }) => {
        const article = new Article(request);
        await test.step('Delete article', async () => {
            responseData = await article.deleteArticle(myApi, articleSlug);
            expect(responseData.status()).toEqual(204);
        });
    });
})


