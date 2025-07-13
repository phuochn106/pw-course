import { Page } from "@playwright/test";
import { AdminBasePage } from "./base-page";
import { PostPage } from "./post";
import { MediaPage } from "./media";

export class DashboardPage extends AdminBasePage {
    xpathDashBoard: string = '.wrap>h1';
    xpathGlance: string = '//div[@class="postbox-header"]/h2[text()="At a Glance"]';
    xpathActivity: string = '//div[@class="postbox-header"]/h2[text()="Activity"]';
    xpathDashboard: string = '//h1[text()="Dashboard"]';

    constructor(page: Page) {
        super(page);
    }

    // Navigation methods that return specific page objects
    async navigateToPost(): Promise<PostPage> {
        await this.goToPage('Posts', 'Tags');
        return new PostPage(this.page);
    }

    async navigateToMedia(): Promise<MediaPage> {
        await this.goToPage('Media', 'Library');
        return new MediaPage(this.page);
    }

    async checkHeadingDisplay(elemantXpath: string): Promise<boolean> {
        const elementDisplay = await this.page.locator(elemantXpath).isVisible();
        return elementDisplay;
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}