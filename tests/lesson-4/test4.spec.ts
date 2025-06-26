import { test } from '@playwright/test';

test('Test 1: Register', async ({ page }) => {
    //Truy cập trang https://material.playwrightvn.com/
    await test.step('Step 1: Go to link', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Step 2: Click note page', async () => {
        await page.locator(`//a[contains(text(),'Bài học 4: Personal notes')]`).click();
    })

    async function addNode() {
        let objNews = { title: '', content: '' }
        let arrNews = [objNews];
        await page.goto("https://material.playwrightvn.com/");
        for (let i = 1; i <= 10; i++) {
            const titleNews = await page.locator(`(//article[@class="item-news item-news-common thumb-left"])[${i}]/h4[@class="title-news"]/a`).getAttribute('title') ?? '';
            const contentNews = await page.locator(`(//article[@class="item-news item-news-common thumb-left"])[${i}]/h4[@class="title-news"]/a`).getAttribute('title') ?? '';

            objNews.title = titleNews;
            objNews.content = contentNews;
            arrNews.push(objNews);
        }
        return arrNews;
    }


    await test.step('Step 3: Input note', async () => {


        //button[@id="add-note"]
    })
    await test.step('Step 4: Search note', async () => {
        //add 10 notes
        const arrNews = await addNode(); // ✅ nhớ await vì addNode là async

        await page.goto("https://material.playwrightvn.com/ghi-chu");

        for (let j = 0; j < arrNews.length; j++) {
            await page.locator('#note-title').fill(arrNews[j].title);
            await page.locator('#note-content').fill(arrNews[j].content);
            await page.locator('#add-note').click();
        }

        // await page.locator(`//input[@id="note-title"]`).fill(titleNews);
        // await page.locator(`//textarea[@id="note-content"]`).fill(contentNews);
        // await page.locator(`//button[@id="add-note"]`).click();





        await page.locator(`//input[@id="search"]`).fill("");

    })

});



