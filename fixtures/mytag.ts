import { test as base, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { PostPage } from '../pages/lesson-05/post';
import { LoginPage } from '../pages/lesson-05/login';

const test = base.extend<{ myTag: PostPage }>({
    myTag: async ({ }, use) => {
        //setup
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Open browser => Login
        const loginPage = new LoginPage(page);
        await loginPage.openAdminPage('dev');
        const dashboardPage = await loginPage.doLoginToAdminPage('p103-phuoc', '$9ICWlOVhHW2nNZUtkLPq)%e');
        const postPage = await dashboardPage.navigateToPost();

        // // Tạo 2 tag
        await postPage.addNewTag('phuoct1', 'phuoct1', '');
        await postPage.addNewTag('phuoct2', 'phuoct2', '');

        //use postpage
        await use(postPage);

        // Cleanup 
        await postPage.deleteAddedTag('phuoct1', 'phuoct1');
        await postPage.deleteAddedTag('phuoct2', 'phuoct2');
    }
});

export { test };