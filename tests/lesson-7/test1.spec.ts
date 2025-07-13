import { APIResponse, expect, test } from '@playwright/test';
import { UtilPage } from '../../pages/lesson-07-api/util';
import { Article } from '../../pages/lesson-07-api/article';
import { Comments } from '../../pages/lesson-07-api/comment';

test.describe('API testing', async () => {
    let utilPage: UtilPage;
    let responseData: APIResponse;
    let token = "";
    let articleSlug = "";
    let listCommentId: number[] = [];
    let responseBody: any;

    const accountInfo = {
        "email": "test07072025@yopmail.com",
        "userName": "test07072025",
        "password": "test07072025"
    };

    test('Test1: Register Account', async ({ request }) => {
        utilPage = new UtilPage(request);
        await test.step('Register', async () => {
            const responseData = await utilPage.registerAccount(accountInfo.email, accountInfo.userName, accountInfo.password);
            expect(responseData.status()).toEqual(201);
        })
    });

    test('Test2: Login and create article', async ({ request }) => {
        utilPage = new UtilPage(request);
        await test.step('Login', async () => {
            const responseData = await utilPage.login(accountInfo.email, accountInfo.password);
            responseBody = await responseData.json();
            token = "Token " + await responseBody.user.token;
            expect(responseData.status()).toEqual(200);
        });

        await test.step('Add new article', async () => {
            const artile = new Article(request);
            const responseData = await artile.addNewArticle(token);
            responseBody = await responseData.json();
            articleSlug = responseBody.article.slug;
            console.log(responseBody);
            expect(responseData.status()).toEqual(201);
        });
    });

    test('Test 3: Add 5 comments', async ({ request }) => {
        const comment = new Comments(request);
        let isCreateSuccess = true;

        await test.step('Add 5 comments', async () => {
            for (let i = 1; i <= 5; i++) {
                const responseData = await comment.addComment(token, articleSlug, i);
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

    test('Test 4: Delete comment 2 & 5', async ({ request }) => {
        const comment = new Comments(request);
        await test.step('Delete comment', async () => {
            const resDelItem2 = await comment.deleteComment(token, articleSlug, listCommentId[0]);
            const resDelItem5 = await comment.deleteComment(token, articleSlug, listCommentId[1]);
            expect(resDelItem2.status() && resDelItem5.status()).toEqual(200);
        });
    });

    test('Test 5: Delete article', async ({ request }) => {
        const article = new Article(request);
        await test.step('Delete article', async () => {
            responseData = await article.deleteArticle(token, articleSlug);
            expect(responseData.status()).toEqual(204);
        });
    });
})


